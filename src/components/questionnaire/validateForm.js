const validateForm = state => {
  const {
    dob,
    allergies,
    gender,
    country,
    maritalStatus,
    smoker,
    alcohol,
  } = state;
  const errors = {};

  if (!allergies) errors.allergies = 'Select one.';

  if (!gender) errors.gender = 'Enter your gender.';

  if (!dob) errors.dob = 'Enter your date of birth.';

  if (!country) errors.country = 'Enter your country of birth.';

  if (!maritalStatus) errors.maritalStatus = 'Enter your marital status.';

  if (!smoker) errors.smoker = 'Select one.';

  if (!alcohol) errors.alcohol = 'Select one.';

  return errors;
};

export default validateForm;
