import React from 'react';

function SelectListGroup({
  name,
  placeholder,
  value,
  error,
  info,
  type,
  options,
  onChange,
}) {
  //
  const selectOptions = options.map((option) => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className="form-group mb-3">
      <select
        type={type}
        className={`form-control form-control-lg mb-1 ${error && 'is-invalid'}`}
        placeholder={placeholder}
        name={name}
        value={value}
        autoComplete="true"
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default SelectListGroup;
