import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';

const INITIAL_FORM_DATA = {
  username: '',
  password: '',
};

/** Form for logging in new user.
 *
 * Props:
 * - login: function to call in parent.
 *
 * State:
 * - formData
 *
 * RoutesList -> LoginForm ->
 */

function LoginForm({ login, loginGoogle }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [formError, setformError] = useState([]);

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  }

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formData);
      navigate('/companies');
    }
    catch (err) {
      console.log(err);
      setformError([err]);
    }
  }

  // const onSuccess = (res) => {
  //   console.log(res.profileObj);
  //   //check if email is in db
  //   //if yes,
  //   //login without password
  //   const user = {
  //     username: res.profileObj.email,
  //     password: res.profileObj.googleId,
  //     firstName: res.profileObj.givenName,
  //     lastName: res.profileObj.familyName,
  //     email: res.profileObj.email
  //   };

  //   loginGoogle(user);
  // };

  const onFailure = (err) => {
    console.log('failed', err);
  };

  async function onSignIn(googleUser) {
    let googleToken = googleUser.getAuthResponse().id_token;
    loginGoogle({ token: googleToken });
  }

  return (
    <>
      <form className="LoginForm" onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            className="form-control"
            onChange={handleChange}
            value={formData.username}
            aria-label="username"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            onChange={handleChange}
            value={formData.password}
            aria-label="password"
            required
          />
        </div>

        {formError.length !== 0 &&
          <div className='alert alert-danger'>
            <p>{formError[0]}</p>
          </div>
        }
        <div className="mb-3">
          <button className="btn-primary btn LoginForm-addBtn">
            Submit
          </button>
        </div>

      </form>

      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Log in with Google"
        onSuccess={onSignIn}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
      />
    </>
  );
}

export default LoginForm;
