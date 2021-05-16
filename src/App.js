import React, { Component } from 'react';
import Table from './components/Table';
import Questionnaire from './components/Questionnaire/Questionnaire';
import Practitioner from './components/Practitioner';
import ErrorBoundry from './components/ErrorBoundry';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className='patient-container'>
          <h1>HAPI FHIR Playground</h1>

          <h2>Patient Search</h2>
          <Table />
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
