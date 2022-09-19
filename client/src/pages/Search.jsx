
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'
import Card from '../components/Card';

const Container = styled.div`
    display:flex;
    justify-content: space-evenly;
    flex-wrap:wrap;
    margin-top:15px;
    overflow-y: overlay;
`;

const Search = () => {
    const [videos,setVideo] = useState([]);
    const query = useLocation().search;

    useEffect(() => {
        const fetchData = async() => {
            const res = await axios.get(`/videos/search${query}`);
            setVideo(res.data);
        };
        fetchData();
    },[query]);
  return (
    <Container>
       {videos.map(video => (
        <Card key={video._id} video = {video} />
       ))}
    </Container>
  )
}

export default Search
