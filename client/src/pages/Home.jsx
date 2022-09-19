import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components'
import Card from '../components/Card'
import axios from 'axios'

const Container = styled.div`
    display:flex;
    justify-content: space-evenly;
    flex-wrap:wrap;
    margin-top:15px;
    overflow-y: overlay;
`;

const Home = ({type}) => {
  const [videos,setVideos] = useState([]);

  useEffect(()=> {
    const fetchVideos = async() => {
      const res = await axios.get(`/videos/${type}`);
      setVideos(res.data);
    }
    fetchVideos();
  },[type]);
  return (
    <Container>
      {videos.map((video,id) => {
        return <Card key={video._id} video={video}/>
      })}


    </Container>
  )
}

export default Home
