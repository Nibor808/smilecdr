import React from 'react';
import PropTypes from 'prop-types';

const PractitionerCard = ({ practitioner, deletePractitioner }) => {
  const renderAlert = practitioner => {
    if (
      window.confirm(
        'Are you sure you want to delete ' + practitioner.name ||
          practitioner.id
      )
    )
      deletePractitioner(practitioner.id);
  };

  return (
    <div className='card'>
      <div className='card-head'>
        <img
          src={practitioner.photo}
          alt='Avatar'
          style={{ height: 50, width: 50, borderRadius: '50%' }}
        />
        <p>
          {!practitioner.name || practitioner.name.includes('undefined')
            ? 'N/A'
            : practitioner.name}
        </p>
      </div>

      <p>Gender: {practitioner.gender || 'N/A'}</p>
      <p>D.O.B: {practitioner.dob || 'N/A'}</p>

      <button onClick={() => renderAlert(practitioner)}>Delete</button>
    </div>
  );
};

PractitionerCard.propTypes = {
  practitioner: PropTypes.object,
  deletePractitioner: PropTypes.func,
};

export default PractitionerCard;
