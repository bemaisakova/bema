import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/postPage.css";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import DeleteIcon from "../Images/delete.png";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PostPage() {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [open, setOpen] = useState(false);

  const getPosts = async () => {
    try {
      const response = await axios.get("http://localhost:4444/posts");
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:4444/posts/${postId}`);
      getPosts();
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleClickOpen = (postId) => {
    setSelectedPostId(postId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    if (selectedPostId) {
      deletePost(selectedPostId);
    }
  };

  const cardClasses = [
    "bg-green-box",
    "bg-white-box",
    "bg-yellow-box",
    "bg-blue-box",
  ];

  return (
    <div className="maincont">
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Уверены, что хотите удалить?"}</DialogTitle>

        <DialogActions>
          <Button onClick={handleDelete}>Удалить</Button>
          <Button onClick={handleClose}>Отмена</Button>
        </DialogActions>
      </Dialog>

      <div className="container">
        <p className="container-title">Winners</p>

        <div className="gradient-cards">
          <div className="gradient-cards">
            {posts.map((post, index) => (
              <div className={`card card-${index}`} key={post._id}>
                <div
                  className={`container-card ${
                    cardClasses[index % cardClasses.length]
                  }`}
                >
                  <p className="card-title">{post.name}</p>
                  <p className="card-title">{post.password}</p>
                  <p className="card-description">
                    {" "}
                    {post.createdAt.slice(8, 10)}.{post.createdAt.slice(5, 7)}.
                    {post.createdAt.slice(0, 4)}г.
                  </p>
                  <img
                    src={DeleteIcon}
                    className="deleteBtn"
                    onClick={() => {
                      handleClickOpen(post._id);
                    }}
                    alt="error"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
