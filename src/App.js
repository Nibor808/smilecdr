import React, { Component } from 'react';
import { getPatients } from './services';
import Table from './components/Table';
import Questionnaire from './components/Questionnaire/Questionnaire';
import Practitioner from './components/Practitioner';
import ErrorBoundry from './components/ErrorBoundry';

class App extends Component {
  state = {
    patients: [],
  };

  componentDidMount() {
    getPatients().then(res => {
      this.setState({ patients: res.data.entry });
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className='patient-container'>
          <h1>HAPI FHIR Playground</h1>

          <h2>Patient Search</h2>
          <Table patients={this.state.patients} />
        </div>

        <div className='question-container'>
          <h2>Questionnaire</h2>
          <Questionnaire />
        </div>

        <div className='practitioner-container'>
          <h2>Practitioner</h2>
          <ErrorBoundry>
            <Practitioner />
          </ErrorBoundry>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
