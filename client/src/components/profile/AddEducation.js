import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

//actions
import { AddUserEducation } from '../../redux/actions/profileActions';

//components
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

function AddEducation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //education inputs
  const [school, setSchool] = useState('');
  const [degree, setDegree] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [current, setCurrent] = useState(false);
  const [description, setDescription] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({});

  //handlers
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const newEdc = {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
    };
    dispatch(AddUserEducation(newEdc, navigate));
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
    <div className="add-education">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="text-warning">
              <i className="fas fa-arrow-left text-info mr-2" />
              go back
            </Link>
            <h1 className="display-4 text-center text-success">Add Education</h1>
            <small className="d-block pb-3">* : required field</small>
            <p className="lead text-center">👩🏻‍🎓add any school that you have attended👨🏻‍🎓</p>
            <form onSubmit={handleOnSubmit}>
              <TextFieldGroup
                placeholder="* school"
                name="school"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                error={errors.school}
              />
              <TextFieldGroup
                placeholder="* degree or certification"
                name="degree"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                error={errors.degree}
              />
              <TextFieldGroup
                placeholder="* fieldOfStudy"
                name="fieldOfStudy"
                value={fieldOfStudy}
                onChange={(e) => setFieldOfStudy(e.target.value)}
                error={errors.fieldOfStudy}
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
                info="tell us a little about this"
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

export default AddEducation;
