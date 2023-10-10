import React, { useEffect } from 'react'; 
import {Pagination, PaginationItem} from '@mui/material';
import {Link} from 'react-router-dom';
import './Styles.css';
import { getPosts } from '../actions/posts';
import { useDispatch, useSelector } from 'react-redux';

const Paginate = ({page}) => {
  const {noOfPages} = useSelector((state)=>state.posts)
  const dispatch = useDispatch()
  useEffect(()=>{
    if(page) dispatch(getPosts(page))
  },[dispatch, page])
  return (
      <Pagination 
        className="ul"
        count={noOfPages}
        page={Number(page)||1}
        variant='outlined'
        color='primary'
        renderItem={(item)=>(
          <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
        )}
      />
  )
};

export default Paginate;
