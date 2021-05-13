import React, { Component } from 'react';
import { getPatients } from './services';
import Table from './components/Table';

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
        <h2>HAPI FHIR Playground</h2>

        <h3>Patient Search</h3>
        <Table patients={this.state.patients} />

        <h3>Questionnaire</h3>
      </React.Fragment>
    );
  }
}

export default App;
