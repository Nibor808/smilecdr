const generateResponse = state => {
  const {
    dob,
    allergies,
    gender,
    country,
    maritalStatus,
    smoker,
    alcohol,
  } = state;

  return {
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
    authored: new Date(),
    author: 'practitioner-x',
    source: 'patient-x',
    item: [
      {
        linkId: '1',
        definition: 'unknown',
        text: 'Do you have allergies?',
        answer: [{ valueBoolean: allergies === 'true' }],
      },
      {
        linkId: '2',
        text: 'General Questions',
        type: 'group',
        item: [
          {
            linkId: '2.1',
            text: 'What is your gender?',
            answer: [{ valueString: gender }],
          },
          {
            linkId: '2.2',
            text: 'What is your date of birth?',
            answer: [{ valueDate: dob }],
          },
          {
            linkId: '2.3',
            text: 'What is your country of birth?',
            answer: [{ valueString: country }],
          },
          {
            linkId: '2.4',
            text: 'What is your marital status?',
            answer: [{ valueString: maritalStatus }],
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
            answer: [{ valueBoolean: smoker === 'true' }],
          },
          {
            linkId: '3.2',
            text: 'Do you drink alchohol?',
            answer: [{ valueBoolean: alcohol === 'true' }],
          },
        ],
      },
    ],
  };
};

export default generateResponse;
