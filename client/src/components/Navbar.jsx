import React from 'react'
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Upload from './Upload';
import { logout } from '../redux/userSlice';

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  z-index: 101;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Input = styled.input`
  border: none;
  width : 90%;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const SearchIcon = styled.span`
  color: ${({ theme }) => theme.text}
`

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const Navbar = () => {
  const {currentUser} = useSelector(state => state.user); //check store.js for better understanding
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const [q,setQ] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    navigate("/");
    dispatch(logout());
  }
  return (
    <>
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search..." value={input} onChange={e => {
            setInput(e.target.value);
            setQ(e.target.value)
            }}/>
          <SearchIcon>
            <SearchOutlinedIcon onClick={() => {
              setInput("")
              navigate(`/search?q=${q}`)
              }}/>
          </SearchIcon>
        </Search>

        {/* FETCHING DATA FROM REDUX STORE */}
        {currentUser ?  
        (<User>
            <VideoCallOutlinedIcon  onClick={() => setOpen(true)}/>
            <Avatar src={currentUser.img} />
            {currentUser.name}
            <Button style={{color:"red"}} onClick={handleSignOut}>
              <ExitToAppIcon />
              SIGN OUT
            </Button>
        </User> )
        : (<Link to="signin" style={{ textDecoration: "none" }}>
            <Button>
              <AccountCircleOutlinedIcon />
              SIGN IN
            </Button>
          </Link>)} 
        
      </Wrapper>
      
    </Container>
    {open && <Upload setOpen={setOpen} />}
    </>
    
  )
}

export default Navbar
