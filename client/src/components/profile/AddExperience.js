import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { Link, useNavigate } from 'react-router-dom';
import { AddUserExperience } from '../../redux/actions/profileActions';

function AddExperience() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //experience inputs
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [current, setCurrent] = useState(false);
  const [description, setDescription] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({});

  //handlers
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const newExp = {
      company,
      title,
      location,
      from,
      to,
      current,
      description,
    };
    dispatch(AddUserExperience(newExp, navigate));
  };

  const handleOnCheck = () => {
    setCurrent((prev) => !prev);
    setDisabled((prev) => !prev);
  };

  //errors handling
  const { errs } = useSelector((state) => state.errors);
  useEffect(() => {
    setErrors(errs);
  }, [errs]);

  return (
    <div className="add-experience">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="text-warning">
              <i className="fas fa-arrow-left text-info mr-2" />
              go back
            </Link>
            <h1 className="display-4 text-center text-success">Add Experience</h1>
            <small className="d-block pb-3">* : required field</small>
            <p className="lead text-center">👨🏻‍🔧add any job or position you have had👩🏻‍🏫</p>
            <form onSubmit={handleOnSubmit}>
              <TextFieldGroup
                placeholder="* company"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                error={errors.company}
              />
              <TextFieldGroup
                placeholder="* job title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={errors.title}
              />
              <TextFieldGroup
                placeholder="* location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                error={errors.location}
              />
              <h6 className="text-warning">From Date</h6>
              <TextFieldGroup
                placeholder="* from date"
                name="from"
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                error={errors.from}
              />
              <h6 className="text-warning">To Date</h6>
              <TextFieldGroup
                placeholder="* to date"
                name="to"
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                error={errors.to}
                disabled={disabled && 'disabled'}
              />
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="current"
                  value={current}
                  checked={current}
                  onChange={handleOnCheck}
                />
                <label htmlFor="current" className="form-check-label">
                  Current job
                </label>
              </div>
              <TextAreaFieldGroup
                placeholder="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                info="tell us a little about this experience"
                error={errors.description}
              />

              <input
                type="submit"
                className="btn btn-info btn-block mt-2 mb-5"
                onSubmit={handleOnSubmit}
              />
              <br />
              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddExperience;
