import React from 'react';
import Container from '@mui/material/Container';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './NavBar/Navbar';
import Home from './Home/Home';
import PostDetails from './PostDetails/PostDetails';

const App = () => {
  return (
    <BrowserRouter>
        <Container maxWidth="lg">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>} exact />
            <Route path="/posts" element={<Home/>} exact />
            <Route path="/posts/search" element={<Home />} exact />
            <Route path="/posts/id/:id" element={<PostDetails />} exact />
          </Routes>
        </Container>
       
      </BrowserRouter>
  );
}

export default App;
