import React from 'react';
import formJSON from '../assets/questionnaire.json';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class Questionnaire extends React.Component {
  state = {
    dob: '',
    allergies: '',
    gender: '',
    country: '',
    maritalStatus: '',
    smoker: '',
    alcohol: '',
    hasError: false,
    errors: {
      dob: '',
      allergies: '',
      gender: '',
      country: '',
      maritalStatus: '',
      smoker: '',
      alcohol: '',
    },
  };

  generateResponse() {
    const {
      dob,
      allergies,
      gender,
      country,
      maritalStatus,
      smoker,
      alcohol,
    } = this.state;

    return {
      resourceType: 'QuestionnaireResponse',
      identifier: 'hf1',
      basedOn: [
        {
          ServiceRequest: {
            identifier: 'req1',
            status: 'completed',
            valueCodeableConcept: {
              text: 'uncoded free text result',
            },
          },
        },
      ],
      partOf: [
        {
          Observation: {
            identifier: 'ob1',
            status: 'final',
            valueCodeableConcept: {
              text: 'uncoded free text result',
            },
          },
        },
      ],
      questionnaire: 'http://hl7.org/fhir/Questionnaire/f201',
      status: 'completed',
      subject: 'patient-x',
      encounter: {
        resourceType: 'Encounter',
        identifier: 'enc1',
        status: 'finished',
      },
      authored: new Date(),
      author: 'practitioner-x',
      source: 'patient-x',
      item: [
        {
          linkId: '1',
          definition: 'unknown',
          text: 'Do you have allergies?',
          answer: [
            {
              valueBoolean: allergies,
            },
          ],
        },
      ],
    };
  }

  validateForm = ev => {
    const {
      dob,
      allergies,
      gender,
      country,
      maritalStatus,
      smoker,
      alcohol,
      hasError,
    } = this.state;
    ev.preventDefault();

    if (!allergies)
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          allergies: 'Select one.',
        },
      }));

    if (!gender)
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          gender: 'Enter your gender.',
        },
      }));

    if (!dob)
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          dob: 'Enter your date of birth.',
        },
      }));

    if (!country)
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          country: 'Enter your country of birth.',
        },
      }));

    if (!maritalStatus)
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          maritalStatus: 'Enter your marital status.',
        },
      }));

    if (!smoker)
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          smoker: 'Select one',
        },
      }));

    if (!alcohol)
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          alcohol: 'Select one',
        },
      }));

    if (
      !allergies ||
      !gender ||
      !dob ||
      !country ||
      !maritalStatus ||
      !smoker ||
      !alcohol
    ) {
      this.setState({ hasError: true });
    }

    if (!hasError) this.generateResponse();
  };

  renderForm() {
    const { errors } = this.state;

    console.log('====================');
    console.log('STATE', this.state);
    console.log('====================');

    const allergies = formJSON.item[0];
    const generalQuestions = formJSON.item[1];
    const intoxicants = formJSON.item[2];

    return (
      <form onSubmit={this.validateForm}>
        <div className='form-group radios'>
          <p>{allergies.text}</p>
          <input
            type='radio'
            name='allergies'
            id='allergies-yes'
            value={true}
            onChange={() =>
              this.setState(prevState => ({
                allergies: true,
                errors: {
                  ...prevState.errors,
                  allergies: '',
                },
              }))
            }
          />
          <label htmlFor='allergies-yes'>yes</label>
          <input
            type='radio'
            name='allergies'
            id='allergies-no'
            value={false}
            onChange={() =>
              this.setState(prevState => ({
                allergies: false,
                errors: {
                  ...prevState.errors,
                  allergies: '',
                },
              }))
            }
          />
          <label htmlFor='allergies-no'>no</label>
          {errors.allergies && (
            <small className='error'>{errors.allergies}</small>
          )}
        </div>

        <p>{generalQuestions.text}</p>

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

        <br />

        <div className='form-group'>
          <label htmlFor='datePicker'>
            {generalQuestions.item[1].text} <small>(MM/DD/YYYY)</small>
          </label>
          <DatePicker
            id='datePicker'
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

        <br />

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

        <br />

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

        <br />

        <div className='form-group radios'>
          <p>{intoxicants.item[0].text}</p>
          <input
            type='radio'
            name='smoker'
            id='smoker-yes'
            value={true}
            onChange={() =>
              this.setState(prevState => ({
                smoker: true,
                errors: {
                  ...prevState.errors,
                  smoker: '',
                },
              }))
            }
          />
          <label htmlFor='smoker-yes'>yes</label>
          <input
            type='radio'
            name='smoker'
            id='smoker-no'
            value={false}
            onChange={() =>
              this.setState(prevState => ({
                smoker: false,
                errors: {
                  ...prevState.errors,
                  smoker: '',
                },
              }))
            }
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
            onChange={() =>
              this.setState(prevState => ({
                alcohol: true,
                errors: {
                  ...prevState.errors,
                  alcohol: '',
                },
              }))
            }
          />
          <label htmlFor='alcohol-yes'>yes</label>
          <input
            type='radio'
            name='alcohol'
            id='alcohol-no'
            value={false}
            onChange={() =>
              this.setState(prevState => ({
                alcohol: false,
                errors: {
                  ...prevState.errors,
                  alcohol: '',
                },
              }))
            }
          />
          <label htmlFor='alcohol-no'>no</label>
          {errors.alcohol && <small className='error'>{errors.alcohol}</small>}
        </div>

        <button type='submit' className='submit-btn'>
          Submit
        </button>
      </form>
    );
  }

  render() {
    if (!formJSON) return <div>Loading...</div>;

    return <div className='questionnaire'>{this.renderForm()}</div>;
  }
}

export default Questionnaire;
