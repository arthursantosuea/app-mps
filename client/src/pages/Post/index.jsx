import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import "./styles.css";

const Post = () => {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });
    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  });
  return <div className="postPage">
    <div className="post">
      <div className="title">{postObject.title}</div>
      <div className="description">{postObject.postText}</div>
      <div className="username">{postObject.username}</div>
    </div>
    <div className="comments">
      <div className="addCommentContainer">
        <input type="text" placeholder="comment..." autoComplete="off"/>
        <button>Send</button>
      </div>
      <div className="listOfComments">
        {comments.map((comment, key) => {
          return <div key={key} className="comment">{comment.commentBody}</div>
        })}
      </div>
    </div>
  </div>;
};

export default Post;
