import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);
  return (
    <div className="container">
      {listOfPosts.map((value, key) => {
        return (
          <div
            key={key}
            className="post"
            onClick={() => {
              navigate(`post/${value.id}`);
            }}
          >
            <div className="title"> {value.title} </div>
            <div className="description">{value.postText}</div>
            <div className="username">{value.username}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
