import React from 'react';

function TextFieldGroup({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
}) {
  return (
    <div className="form-group mb-3">
      <input
        type={type}
        className={`form-control form-control-lg mb-1 ${error && 'is-invalid'}`}
        placeholder={placeholder}
        name={name}
        value={value}
        autoComplete="true"
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default TextFieldGroup;
