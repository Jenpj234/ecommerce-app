import { useState } from "react";
import './LoginForm.css';

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  function revealPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <>
      <div>
        <input placeholder="Email" className="login-input" />
      </div>
      <div>
        <input
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          className="login-input"
        />
        <button onClick={revealPassword}>Show</button>
      </div>
      <button className="login-button">Login</button>
      <button className="login-button">Sign up</button>
    </>
  );
}

export default LoginForm;