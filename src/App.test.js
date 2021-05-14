import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const title = getByText(/HAPI FHIR Playground/i);
  expect(title).toBeInTheDocument();
});

test('calls componentDiMount', () => {
  const spy = jest.spyOn(App.prototype, 'componentDidMount');
  render(<App />);

  expect(spy).toHaveBeenCalled();
});
