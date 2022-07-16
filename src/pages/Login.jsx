import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const INITIAL_USER_DATA = {
  email: '',
  password: '',
};
function Login() {
  const [userData, setUserData] = useState(INITIAL_USER_DATA);
  const history = useHistory();
  const { email, password } = userData;

  const handleChange = ({ target: { name, value } }) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleClick = () => {
    const userEmail = JSON.stringify({ email });
    localStorage.setItem('user', userEmail);
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    history.push('/foods');
  };

  const verifyConditions = () => {
    const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/; // O Regex é cortesia de: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const testEmail = emailRegex.test(email);
    const minLength = 6;
    const testPwd = password.length > minLength;
    return !(testEmail && testPwd);
  };

  return (
    <form className="loginItens">
      <label htmlFor="email">
        E-mail:
        {' '}
        <input
          type="text"
          id="email"
          name="email"
          data-testid="email-input"
          onChange={ handleChange }
          value={ email }
        />
      </label>
      <label htmlFor="password">
        Password:
        {' '}
        <input
          type="password"
          id="password"
          name="password"
          data-testid="password-input"
          autoComplete="off"
          onChange={ handleChange }
          value={ password }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ verifyConditions() }
        onClick={ handleClick }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
