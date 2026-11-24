import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isLoginForm, setIsLoginForm] = useState(true)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId: emailId,
          password: password,
        },
        { withCredentials: true },
      );

      dispatch(addUser(response.data.user));
      navigate("/");
    } catch (error) {
      setError(error.response?.data || "An error occurred during login.");
      console.error("Error occurred while logging in:", error);
    }
  };

   const handleSignup = async () => {
    try {
       await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName,
          lastName,
          emailId: emailId,
          password: password,
        },
        { withCredentials: true },
      );
      setIsLoginForm(true)
    } catch (error) {
      setError(error.response?.data || "An error occurred during login.");
      console.error("Error occurred while logging in:", error);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">{isLoginForm ? "Login": "Sign Up"}</legend>
        {!isLoginForm &&
        (<>
         <label className="label">First Name</label>
        <input
          type="firstname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="input"
          placeholder="First name"
        />
         <label className="label">Last Name</label>
        <input
          type="lastname"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="input"
          placeholder="Last name"
        />
        </>)}
        <label className="label">Email</label>
        <input
          type="email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          className="input"
          placeholder="Email"
        />

        <label className="label">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          placeholder="Password"
        />
        {error && <p className="text-error mt-2">{error}</p>}
        <button className="btn btn-neutral mt-4" onClick={isLoginForm ? handleLogin: handleSignup}>
          {isLoginForm ? "Login": "Sign Up"}
        </button>
        <div>{isLoginForm ? "Don't have an account? " : "Already have an account? "}<button className="btn btn-link" onClick={() => setIsLoginForm(!isLoginForm)}> {isLoginForm ? "Sign Up" : "Login"}</button></div>
      </fieldset>
    </div>
  );
};

export default Login;
