import React from 'react';

function TextAreaFieldGroup({ name, placeholder, value, error, info, type, onChange }) {
  return (
    <div className="form-group mb-3">
      <textarea
        type={type}
        className={`form-control form-control-lg mb-1 ${error && 'is-invalid'}`}
        placeholder={placeholder}
        name={name}
        value={value}
        autoComplete="true"
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default TextAreaFieldGroup;
