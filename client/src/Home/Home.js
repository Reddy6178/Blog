import React, { useState } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import './Styles.css';
import Paginate from '../pages/Paginate';
import { getPostsBySearch } from '../actions/posts';
import Posts from '../Posts/Posts.js';
import Form from '../Form/Form'; 

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  


  const searchPost = () => {
    if (search.trim() === '') {
      setError(true);
      setErrorMessage('Please enter a search term');
    } else {
      setCurrentId(0);
      setSearch("");
      dispatch(getPostsBySearch( {search}));
      navigate(`/posts/search?searchQuery=${search|| 'none'}`);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    setError(false);
    setErrorMessage('');
  };


  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className="gridContainer">
          <Grid item xs={12} sm={9} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={3} md={3}>
            <AppBar className="appBarSearch" position="static" color="inherit">
              <TextField 
                onKeyDown={handleKeyPress} 
                name="search" 
                variant="outlined" 
                label="Search For Title or Message" 
                fullWidth 
                value={search}
                className="textField" 
                error={error}
                helperText={errorMessage}
                onChange={handleChange}
              />

              <Button 
                onClick={searchPost} 
                className="searchButton" 
                variant="contained" 
                color="primary">
                Search
              </Button>

            </AppBar>

            <Form currentId={currentId} setCurrentId={setCurrentId} />

            {(!searchQuery) && (
              <Paper className="pagination" elevation={6}>
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;