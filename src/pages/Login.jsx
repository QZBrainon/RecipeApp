import React from 'react';

function Login() {
  return (
    <main>
      <label htmlFor="email">
        E-mail:
        <input type="text" id="email" data-testid="email-input" />
      </label>
      <label htmlFor="password">
        Password:
        <input type="password" id="password" data-testid="password-input" />
      </label>
      <button type="button" data-testid="login-submit-btn">Enter</button>
    </main>
  );
}

export default Login;
