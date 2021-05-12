import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class Table extends React.Component {
  state = {
    startDate: new Date(),
    name: '',
  };

  sortPatients(patients) {
    return patients.sort((a, b) => {
      if (a.resource.birthDate && b.resource.birthDate) {
        return (
          Date.parse(b.resource.birthDate) - Date.parse(a.resource.birthDate)
        );
      } else return b;
    });
  }

  renderPatients() {
    const { patients } = this.props;

    const sorted = this.sortPatients(patients);

    return sorted.map(patient => {
      // console.log('====================');
      // console.log('PAT', patient.resource);
      // console.log('====================');
      return (
        <tr key={patient.resource.id} className={'patient'}>
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

  render() {
    const { patients } = this.props;
    console.log('====================');
    console.log('DATE', Date.parse(this.state.startDate));
    console.log('====================');

    if (!patients) return <div>Loading...</div>;

    return (
      <div>
        <table className={'patient-table'}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Birth Date</th>
            </tr>
          </thead>
          <tbody>{this.renderPatients()}</tbody>
        </table>

        <div className='search-inputs'>
          <label htmlFor={'name'}>Name</label>
          <input
            type='text'
            id={'name'}
            name={'name'}
            onChange={ev => this.setState({ name: ev.target.value })}
          />

          <label htmlFor={'datePicker'}>DOB</label>
          <DatePicker
            id={'datePicker'}
            selected={this.state.startDate}
            onChange={date => this.setState({ startDate: date })}
          />
        </div>
      </div>
    );
  }
}

export default Table;
