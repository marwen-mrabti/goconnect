import React from 'react';

function InputGroup({ name, placeholder, value, error, icon, type, onChange }) {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        type={type}
        className={`form-control form-control-lg mb-1 ${error && 'is-invalid'}`}
        placeholder={placeholder}
        name={name}
        value={value}
        autoComplete="true"
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default InputGroup;
