import _axios from 'axios';

const axios = _axios.create({
  baseURL: 'http://hapi.fhir.org/baseR4',
});

export const getPatients = (name = '', dob = '') => {
  if (name && dob) return axios.get(`/Patient?birthdate=${dob}&name=${name}`);

  return axios.get('/Patient');
};

export const getPractitioners = () => {
  return axios.get('/Practitioner');
};
