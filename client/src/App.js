import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CreatPost from "./pages/CreatePost";
import Post from './pages/Post';

function App() {
  return (
    <div className="App">
      <Router>
        <nav className="navigation-menu">
          <h1>fullstackApp</h1>
          <Link to="/createpost">Create a post</Link>
          <Link to="/">Homepage</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="createpost" element={<CreatPost />} />
          <Route path="post/:id" element={<Post />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
