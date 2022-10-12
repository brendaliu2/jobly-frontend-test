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

  const handleLogin = async googleData => {
    const res = await fetch("/api/v1/auth/google", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    // store returned user somehow
    console.log('data', data);
    // loginGoogle()
  };

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
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={'single_host_origin'}
      />
    </>
  );
}

export default LoginForm;
