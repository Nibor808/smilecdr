import React, { useEffect, useState } from 'react';
import { getPractitioners } from '../services';
import PractitionerCard from './PractitionerCard';

const Practitioner = () => {
  const [practitioners, setPractitioners] = useState([]);

  useEffect(() => {
    getPractitioners().then(res => {
      setPractitioners(flattenPractitionerObj(res));
    });
  }, []);

  const flattenPractitionerObj = response => {
    return (response.data.entry || []).map(item => {
      const name = item.resource.name || [];
      return {
        id: item.resource.id,
        name: `${((name[0] || {}).given || []).join(' ')} ${
          (name[0] || {}).family
        }`,
        gender: item.resource.gender,
        dob: item.resource.birthDate,
        photo:
          'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
      };
    });
  };

  const deletePractitioner = id => {
    const newList = practitioners.filter(
      practitioner => practitioner.id !== id
    );
    setPractitioners(newList);
  };

  if (!practitioners.length) return <div>Loading...</div>;

  return (
    <div className='practitioners'>
      {practitioners.map(practitioner => {
        return (
          <PractitionerCard
            practitioner={practitioner}
            key={practitioner.id}
            deletePractitioner={deletePractitioner}
          />
        );
      })}
    </div>
  );
};

export default Practitioner;
