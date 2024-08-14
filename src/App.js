import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./Context/Context";
import Post from './Context/PostsContext'
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Create from "./Pages/Create";
import View from './Pages/ViewPost'
import './App.css';
import Home from './Pages/Home';

function App() {
  const { setUser } = useContext(AuthContext);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUser(user);
        const uid = user.uid;
      } else {
        // User is signed out
      }
    });
  });
  
  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sell" element={<Create />} />
            <Route path="/view" element={<View />} />
          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;
