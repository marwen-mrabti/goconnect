import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//actions
import { CreateUserProfile } from '../../redux/actions/profileActions';

//components
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';

function CreateProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //status options
  const options = [
    { label: '* select Professional status', value: 0 },
    { label: 'Developer', value: 'Developer' },
    { label: 'junior Developer', value: 'junior Developer' },
    { label: 'senior Developer', value: 'senior Developer' },
    { label: 'manager', value: 'manager' },
    { label: 'Instructor', value: 'Instructor' },
    { label: 'Intern', value: 'Intern' },
    { label: 'Other', value: 'Other' },
  ];

  //profile inputs
  const [handle, setHandle] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [skills, setSkills] = useState('');
  const [githubUsername, setGithubUsername] = useState('');
  const [bio, setBio] = useState('');
  const [displaySocialInputs, setDisplaySocialInputs] = useState(false);
  const [twitter, setTwitter] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [youtube, setYoutube] = useState('');
  const [errors, setErrors] = useState({});

  //handlers
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const newProfile = {
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubUsername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
    };
    dispatch(CreateUserProfile(newProfile, navigate));
    dispatch({ type: 'CLEAR_ERRORS', payload: {} });
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    setDisplaySocialInputs((prevState) => !prevState);
  };

  //errors handling
  const { errs } = useSelector((state) => state.errors);
  useEffect(() => {
    setErrors(errs);
  }, [errs]);

  //social inputs
  const socialInputs = (
    <div>
      <InputGroup
        placeholder="twitter profile URL"
        name="twitter"
        value={twitter}
        icon="fab fa-twitter"
        onChange={(e) => setTwitter(e.target.value)}
        error={errors.twitter}
      />
      <InputGroup
        placeholder="facebook profile URL"
        name="facebook"
        value={facebook}
        icon="fab fa-facebook"
        onChange={(e) => setFacebook(e.target.value)}
        error={errors.facebook}
      />
      <InputGroup
        placeholder="linkedin profile URL"
        name="linkedin"
        value={linkedin}
        icon="fab fa-linkedin"
        onChange={(e) => setLinkedin(e.target.value)}
        error={errors.linkedin}
      />
      <InputGroup
        placeholder="youtube profile URL"
        name="youtube"
        value={youtube}
        icon="fab fa-youtube"
        onChange={(e) => setYoutube(e.target.value)}
        error={errors.youtube}
      />
    </div>
  );

  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Create your profile</h1>
            <p className="lead text-center">
              📑 Let's get some information to make your profile stand out 📑
            </p>
            <small className="d-block pb-3">* : required field</small>
            <form onSubmit={handleOnSubmit}>
              <TextFieldGroup
                placeholder="* profile handle"
                name="handle"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                info="a unique handle for your profile (eg: your full name)"
                error={errors.handle}
              />
              <SelectListGroup
                placeholder="* status"
                name="status"
                value={status}
                options={options}
                onChange={(e) => setStatus(e.target.value)}
                info="give us an idea where you are at you career"
                error={errors.status}
              />
              <TextFieldGroup
                placeholder="company"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                info=""
                error={errors.company}
              />
              <TextFieldGroup
                placeholder="website"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                info=""
                error={errors.website}
              />
              <TextFieldGroup
                placeholder="location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                info=""
                error={errors.location}
              />
              <TextFieldGroup
                placeholder="* skills"
                name="skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                info="please use comma separated values (eg: html,css,react)"
                error={errors.skills}
              />
              <TextFieldGroup
                placeholder="github username"
                name="githubUsername"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
                info="if you want your latest repo and github link, add your github username"
                error={errors.githubUsername}
              />
              <TextAreaFieldGroup
                placeholder="bio"
                name="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                info="tell us a little about yourself"
                error={errors.bio}
              />
              <div className="mb-3">
                <button type="button" className="btn btn-dark" onClick={handleOnClick}>
                  Add social media links
                </button>
                <span className="text-muted">Optional</span>
              </div>
              {displaySocialInputs && socialInputs}

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

export default CreateProfile;
