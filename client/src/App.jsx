import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CreatPost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessTokenx"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      });
  }, []);
  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <nav className="navigation-menu">
            <h1>fullstackApp</h1>
            <Link to="/createpost">Create a post</Link>
            <Link to="/">Homepage</Link>

            {!authState && (
              <>
                <Link to="/login">Sing In</Link>
                <Link to="/registration">Sing Up</Link>
              </>
            )}
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="createpost" element={<CreatPost />} />
            <Route path="post/:id" element={<Post />} />
            <Route path="registration" element={<Registration />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
