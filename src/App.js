import React, { Component } from 'react';
import { getPatients } from './services';
import Table from './components/Table';

class App extends Component {
  state = {
    patients: [],
  };

  componentDidMount() {
    getPatients().then(res => {
      console.log(res);
      this.setState({ patients: res.data.entry });
    });
  }

  render() {
    return <Table patients={this.state.patients} />;
  }
}

export default App;
