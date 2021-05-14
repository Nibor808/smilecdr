import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getPatients } from '../services';

class Table extends React.Component {
  state = {
    date: new Date(),
    name: '',
    searchResult: [],
    isSearch: false,
    nameError: '',
    dateError: '',
    searchError: '',
    searchDate: '',
  };

  searchForPatient = () => {
    const { name, date } = this.state;

    if (!name.trim()) {
      return this.setState({ nameError: 'Enter a first or last name.' });
    } else if (name.trim().search(/[^a-zA-z]/i) !== -1) {
      return this.setState({
        nameError:
          'Name must only contain letters. Enter a first or last name.',
      });
    }

    let day = new Date(date).getDate();
    if (day < 10) day = `0${day}`;
    let month = new Date(date).getMonth() + 1;
    if (month < 10) month = `0${month}`;
    const year = new Date(date).getFullYear();

    const searchDate = `${year}-${month}-${day}`;
    this.setState({ isSearch: true });

    getPatients(name, searchDate).then(res => {
      if (res.data.entry)
        this.setState({
          searchResult: res.data.entry,
          searchDate: res.data.meta.lastUpdated,
        });
      else this.setState({ searchError: 'no results' });
    });
  };

  sortPatients(patients) {
    let lastA;
    let lastB;

    return patients.sort((a, b) => {
      if (a.resource.birthDate && b.resource.birthDate) {
        lastA = a;
        lastB = b;
        return (
          Date.parse(b.resource.birthDate) - Date.parse(a.resource.birthDate)
        );
      }

      if (!a.resource.birthDate && lastA) a = lastA;
      else if (!b.resource.birthDate && lastB) b = lastB;

      if (a && b) {
        return (
          Date.parse(b.resource.birthDate) - Date.parse(a.resource.birthDate)
        );
      }

      return null;
    });
  }

  renderPatients() {
    const { patients } = this.props;
    const { isSearch, searchResult } = this.state;

    const sorted = this.sortPatients(patients);

    const resultSet = isSearch && searchResult.length ? searchResult : sorted;

    return resultSet.map(patient => {
      return (
        <tr key={patient.resource.id} className='patient'>
          <td>{patient.resource.id}</td>
          {patient.resource.name &&
          patient.resource.name[0].family &&
          patient.resource.name[0].given ? (
            <td>
              {patient.resource.name[0].family},{' '}
              {patient.resource.name[0].given[0]}
            </td>
          ) : (
            <td>none</td>
          )}
          <td>{patient.resource.gender}</td>
          <td>{patient.resource.birthDate}</td>
        </tr>
      );
    });
  }

  clearSearch = () => {
    this.setState({
      isSearch: false,
      name: '',
      searchError: '',
      date: new Date(),
      searchDate: '',
      searchResult: [],
    });
    this.renderPatients();
  };

  renderSearchDate() {
    const { searchDate } = this.state;

    const searchDateString = new Date(searchDate).toString();
    const searchDateFormatted = searchDateString.substring(
      0,
      searchDateString.indexOf('GMT')
    );
    const searchDateStart = searchDateFormatted.substring(
      0,
      searchDateFormatted.indexOf(`${new Date().getFullYear()}`) + 4
    );
    const time = searchDateFormatted.substring(searchDateStart.length);

    return `Results as of ${searchDateStart} at ${time}`;
  }

  render() {
    const { patients } = this.props;
    const { name, nameError, searchError, searchDate } = this.state;

    if (!patients) return <div>Loading...</div>;

    return (
      <React.Fragment>
        <div className='search'>
          <div className='search-inputs'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={name}
              onChange={ev =>
                this.setState({
                  name: ev.target.value,
                  nameError: '',
                  searchError: '',
                })
              }
            />
            {nameError && <small className='error'>{nameError}</small>}

            <label htmlFor='tDatePicker'>
              D.O.B. <small>(MM/DD/YYYY)</small>
            </label>
            <DatePicker
              id='tDatePicker'
              selected={this.state.date}
              onChange={date => this.setState({ date })}
            />
          </div>

          <div className='search-buttons'>
            <button onClick={this.searchForPatient}>Search</button>
            <button onClick={this.clearSearch}>Clear Search</button>
          </div>
        </div>

        {searchDate && <p className='success'>{this.renderSearchDate()}</p>}
        {searchError && <p className='error'>{searchError}</p>}

        <div className='patient-table'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
              </tr>
            </thead>
            <tbody>{this.renderPatients()}</tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default Table;
