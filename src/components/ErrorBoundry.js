import React from 'react';

class ErrorBoundry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo)
      return (
        <React.Fragment>
          <h2 className='error'>Opps something went wrong!</h2>

          <details>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </React.Fragment>
      );
    return this.props.children;
  }
}

export default ErrorBoundry;
