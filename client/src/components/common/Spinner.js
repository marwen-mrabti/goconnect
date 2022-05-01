import React from 'react';
import { RingLoader } from 'react-spinners';

function Spinner() {
  return (
    <div className="spinner">
      <RingLoader color="orange" loading={true} size={200} />
    </div>
  );
}

export default Spinner;
