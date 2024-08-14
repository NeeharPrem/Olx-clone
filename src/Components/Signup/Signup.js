import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../Context/Context';
import { Link,useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    let user; // Define user variable

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        user = userCredential.user;
        return updateProfile(user, {
          displayName: username,
        });
      })
      .then(() => {
        const db = getFirestore(firebase);
        return addDoc(collection(db, 'users'), { uid: user.uid, username, phone });
      })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        // Handle any errors that occur during sign-up
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            name="name"
            defaultValue="John"
            required

          />
          <br />
          <span style={{ color: "red" }}>
            {username &&
              !/^[a-zA-Z]{3,}$/.test(username) &&
              "Must have at least 3 letters"}
          </span>
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            defaultValue="John"
            required
          />
          <br />
          <span style={{ color: "red" }}>
            {email &&
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
              "Enter a valid email"}
          </span>
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
            defaultValue="Doe"
            required
          />
          <br />
          <span style={{ color: "red" }}>
            {phone &&
              !/^[0-9]{10}$/.test(phone) &&
              "Enter a valid mobile number (10 digits)"}
          </span>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"
            required
          />
          <br />
          <span style={{ color: "red" }}>
            {password &&
              !/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password) &&
              "Need at least 6 characters and contain at least one number"}
          </span>
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
}
