import React from 'react';
import formJSON from '../../assets/questionnaire.json';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import generateResponse from './generateResponse';
import validateForm from './validateForm';

class Questionnaire extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dob: '',
      allergies: '',
      gender: '',
      country: '',
      maritalStatus: '',
      smoker: '',
      alcohol: '',
      errors: {
        dob: '',
        allergies: '',
        gender: '',
        country: '',
        maritalStatus: '',
        smoker: '',
        alcohol: '',
      },
      response: '',
    };

    /* binding this here as opposed to an arrow function to allow for easier testing */
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(ev) {
    ev.preventDefault();

    this.setState({ errors: validateForm(this.state) }, this.renderResponse);
  }

  renderResponse() {
    if (!Object.keys(this.state.errors).length) {
      const response = generateResponse(this.state);

      this.setState({
        response: JSON.stringify(response, null, 2),
      });
    }
  }

  renderForm() {
    const { errors } = this.state;
    const allergies = formJSON.item[0];
    const generalQuestions = formJSON.item[1];
    const intoxicants = formJSON.item[2];

    return (
      <form onSubmit={this.handleSubmit} data-testid='questionnaire-form'>
        <div className='form-group radios'>
          <p>{allergies.text}</p>
          <input
            type='radio'
            name='allergies'
            id='allergies-yes'
            value={true}
            onChange={ev => {
              ev.persist();
              this.setState(prevState => ({
                allergies: ev.target.value,
                errors: {
                  ...prevState.errors,
                  allergies: '',
                },
              }));
            }}
          />
          <label htmlFor='allergies-yes'>yes</label>
          <input
            type='radio'
            name='allergies'
            id='allergies-no'
            value={false}
            onChange={ev => {
              ev.persist();
              this.setState(prevState => ({
                allergies: ev.target.value,
                errors: {
                  ...prevState.errors,
                  allergies: '',
                },
              }));
            }}
          />
          <label htmlFor='allergies-no'>no</label>
          {errors.allergies && (
            <small className='error'>{errors.allergies}</small>
          )}
        </div>

        <h4>{generalQuestions.text}</h4>

        <div className='form-group'>
          <label htmlFor='gender'>{generalQuestions.item[0].text}</label>
          <input
            type='text'
            name='gender'
            id='gender'
            onChange={ev => {
              this.setState(prevState => ({
                errors: {
                  ...prevState.errors,
                  gender: '',
                },
              }));
              this.setState({ gender: ev.target.value });
            }}
          />
          {errors.gender && <small className='error'>{errors.gender}</small>}
        </div>

        <div className='form-group'>
          <label htmlFor='qDatePicker'>
            {generalQuestions.item[1].text} <small>(MM/DD/YYYY)</small>
          </label>
          <DatePicker
            id='qDatePicker'
            selected={this.state.dob}
            onChange={date =>
              this.setState(prevState => ({
                dob: date,
                errors: {
                  ...prevState.errors,
                  dob: '',
                },
              }))
            }
          />
          {errors.dob && <small className='error'>{errors.dob}</small>}
        </div>

        <div className='form-group'>
          <label htmlFor='country'>{generalQuestions.item[2].text}</label>
          <input
            type='text'
            name='country'
            id='country'
            onChange={ev => {
              this.setState(prevState => ({
                errors: {
                  ...prevState.errors,
                  country: '',
                },
              }));
              this.setState({ country: ev.target.value });
            }}
          />
          {errors.country && <small className='error'>{errors.country}</small>}
        </div>

        <div className='form-group'>
          <label htmlFor='maritalStatus'>{generalQuestions.item[3].text}</label>
          <input
            type='text'
            name='maritalStatus'
            id='maritalStatus'
            onChange={ev => {
              this.setState(prevState => ({
                errors: {
                  ...prevState.errors,
                  maritalStatus: '',
                },
              }));
              this.setState({ maritalStatus: ev.target.value });
            }}
          />
          {errors.maritalStatus && (
            <small className='error'>{errors.maritalStatus}</small>
          )}
        </div>

        <div className='form-group radios'>
          <p>{intoxicants.item[0].text}</p>
          <input
            type='radio'
            name='smoker'
            id='smoker-yes'
            value={true}
            onChange={ev => {
              ev.persist();
              this.setState(prevState => ({
                smoker: ev.target.value,
                errors: {
                  ...prevState.errors,
                  smoker: '',
                },
              }));
            }}
          />
          <label htmlFor='smoker-yes'>yes</label>
          <input
            type='radio'
            name='smoker'
            id='smoker-no'
            value={false}
            onChange={ev => {
              ev.persist();
              this.setState(prevState => ({
                smoker: ev.target.value,
                errors: {
                  ...prevState.errors,
                  smoker: '',
                },
              }));
            }}
          />
          <label htmlFor='smoker-no'>no</label>
          {errors.smoker && <small className='error'>{errors.smoker}</small>}
        </div>

        <div className='for-group radios'>
          <p>{intoxicants.item[1].text}</p>
          <input
            type='radio'
            name='alcohol'
            id='alcohol-yes'
            value={true}
            onChange={ev => {
              ev.persist();
              this.setState(prevState => ({
                alcohol: ev.target.value,
                errors: {
                  ...prevState.errors,
                  alcohol: '',
                },
              }));
            }}
          />
          <label htmlFor='alcohol-yes'>yes</label>
          <input
            type='radio'
            name='alcohol'
            id='alcohol-no'
            value={false}
            onChange={ev => {
              ev.persist();
              this.setState(prevState => ({
                alcohol: ev.target.value,
                errors: {
                  ...prevState.errors,
                  alcohol: '',
                },
              }));
            }}
          />
          <label htmlFor='alcohol-no'>no</label>
          {errors.alcohol && <small className='error'>{errors.alcohol}</small>}
        </div>

        <div className='form-btns'>
          <button type='submit' className='submit-btn' id='submit-btn'>
            Submit
          </button>

          <button
            type='reset'
            onClick={() => this.setState({ response: '', dob: '' })}
          >
            Clear
          </button>
        </div>
      </form>
    );
  }

  render() {
    if (!formJSON) return <div>Loading...</div>;

    return (
      <div
        className='questionnaire-container'
        data-testid='questionnaire-container'
      >
        <div className='questionnaire'>{this.renderForm()}</div>
        <div className='response'>
          <pre>{this.state.response}</pre>
        </div>
      </div>
    );
  }
}

export default Questionnaire;
