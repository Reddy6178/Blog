import { AppBar, Typography } from '@mui/material';
import {Link} from 'react-router-dom'
import React from 'react';
import './Styles.css';

const Navbar = () => {
  return (
    <AppBar position='static' align="center" className="appBar" xs={12} >
        <div className="brandContainer">
            <Typography 
              component={Link} 
              to="/posts" 
              className="heading" 
              variant='h4' 
              color='inherit' 
              underline="none">
              My Stories
            </Typography>
        </div>
    </AppBar>
  )
};

export default Navbar;