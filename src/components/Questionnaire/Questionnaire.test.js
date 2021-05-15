import React from 'react';
import { render, screen } from '@testing-library/react';
import Questionnaire from './Questionnaire';
import validateForm from './validateForm';
import generateResponse from './generateResponse';

test('renders the container and form', () => {
  render(<Questionnaire />);

  const container = screen.getByTestId('questionnaire-container');
  const form = screen.getByTestId('questionnaire-form');
  expect(container).toBeInTheDocument();
  expect(form).toBeInTheDocument();
});

test('validates form values', () => {
  const state = {
    dob: '',
    allergies: '',
    gender: '',
    country: '',
    maritalStatus: '',
    smoker: '',
    alcohol: '',
  };

  expect(validateForm(state)).toEqual({
    dob: 'Enter your date of birth.',
    allergies: 'Select one.',
    gender: 'Enter your gender.',
    country: 'Enter your country of birth.',
    maritalStatus: 'Enter your marital status.',
    smoker: 'Select one.',
    alcohol: 'Select one.',
  });
});

test('returns proper response', () => {
  const state = {
    dob: '2000/01/01',
    allergies: 'true',
    gender: 'male',
    country: 'Canada',
    maritalStatus: 'married',
    smoker: 'false',
    alcohol: 'true',
  };

  const realDate = Date;
  const spy = jest.spyOn(global, 'Date');
  const response = generateResponse(state);
  const authored = spy.mock.instances[0];
  global.Date = realDate;

  expect(response).toEqual({
    resourceType: 'QuestionnaireResponse',
    identifier: 'hf1',
    basedOn: [
      {
        ServiceRequest: {
          identifier: 'req1',
          status: 'completed',
          valueCodeableConcept: {
            text: 'uncoded free text result (bit of a guess)',
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
            text: 'uncoded free text result (bit of a guess)',
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
    authored: authored,
    author: 'practitioner-x',
    source: 'patient-x',
    item: [
      {
        linkId: '1',
        definition: 'unknown',
        text: 'Do you have allergies?',
        answer: [{ valueBoolean: true }],
      },
      {
        linkId: '2',
        text: 'General Questions',
        type: 'group',
        item: [
          {
            linkId: '2.1',
            text: 'What is your gender?',
            answer: [{ valueString: 'male' }],
          },
          {
            linkId: '2.2',
            text: 'What is your date of birth?',
            answer: [{ valueDate: '2000/01/01' }],
          },
          {
            linkId: '2.3',
            text: 'What is your country of birth?',
            answer: [{ valueString: 'Canada' }],
          },
          {
            linkId: '2.4',
            text: 'What is your marital status?',
            answer: [{ valueString: 'married' }],
          },
        ],
      },
      {
        linkId: '3',
        text: 'Intoxications',
        type: 'group',
        item: [
          {
            linkId: '3.1',
            text: 'Do you smoke?',
            answer: [{ valueBoolean: false }],
          },
          {
            linkId: '3.2',
            text: 'Do you drink alchohol?',
            answer: [{ valueBoolean: true }],
          },
        ],
      },
    ],
  });
});

test('calls handleSubmit when Submit button is clicked', () => {
  const spySubmit = jest.spyOn(Questionnaire.prototype, 'handleSubmit');
  render(<Questionnaire />);

  expect(spySubmit).not.toHaveBeenCalled();

  const form = screen.getByTestId('questionnaire-form');
  form.dispatchEvent(new Event('submit'));

  expect(spySubmit).toHaveBeenCalled();
});
