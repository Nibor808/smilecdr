import _axios from 'axios';

const axios = _axios.create({
  baseURL: 'http://hapi.fhir.org/baseR4',
});

export const getPatients = (name = '', dob = '') => {
  return axios.get('/Patient');
};

export const getPractitioners = () => {
  return axios.get('/Practitioner');
};
