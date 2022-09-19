
import { current } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { format } from "timeago.js";
import { allComments } from "../redux/videoSlice";
import Comment from "./Comment";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 50%;
`;

const AddComment = styled.button`
  height:40px;
  width:130px;
  border-radius:5px;
  background-color:transparent;
  color: ${({ theme }) => theme.text};
`

const Comments = ({videoId}) => {
  const {currentUser} = useSelector(state => state.user);
  const {currentVideo} = useSelector(state => state.video);
  const dispatch = useDispatch();
 

  const [comments,setComments] = useState([]);
  const [addCmt,setAddCmt] = useState("");


  useEffect(()=> {
    const fetchData = async() => {
      const _allComments = await axios.get(`/comments/${videoId}`);
      // dispatch(allComments(_allComments.data));
      setComments(_allComments.data);
    };

    fetchData();
  },[videoId]);

  const addComment = async() => {
    await axios.post('/comments',{desc: addCmt,videoId,userId:currentUser._id,});
    
    // dispatch(allComments(newComment.data));
    setComments([addCmt,...comments]);
   
      
  }
  
  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img} />
        <Input placeholder="Add a comment..." onChange={(e) => setAddCmt(e.target.value) }/>
        <AddComment onClick={addComment}>Add Comment</AddComment>
      </NewComment>
      {comments?.map((comment) => {
           return <Comment key={comment?._id} comment={comment} />
      })}
     
    </Container>
  );
};

export default Comments;