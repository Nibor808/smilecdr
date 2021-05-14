import React, { Component } from 'react';
import { getPatients } from './services';
import Table from './components/Table';
import Questionnaire from './components/questionnaire/Questionnaire';
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
        <h1>HAPI FHIR Playground</h1>

        <h2>Patient Search</h2>
        <Table patients={this.state.patients} />

        <br />

        <h2>Questionnaire</h2>
        <Questionnaire />

        <br />

        <h2>Practitioner</h2>
        <ErrorBoundry>
          <Practitioner />
        </ErrorBoundry>
      </React.Fragment>
    );
  }
}

export default App;
