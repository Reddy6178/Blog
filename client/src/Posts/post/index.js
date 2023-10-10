import { Button, ButtonBase, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import moment from 'moment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { deletePost,getPost} from '../../actions/posts';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Styles.css';

const Post = ({post,setCurrentId}) => {
    const navigate = useNavigate()
    const openPost =()=>{
      dispatch(getPost(post._id))
      navigate(`/posts/id/${post._id}`)
    }
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = (event, reason) => {
      if (reason === 'escapeKeyDown' || reason === 'backdropClick') {
        // User clicked outside the dialog or pressed the escape key
        return;
      }
      setOpen(false);
      setAnchorEl(null);

    };

    const handleDelete = () => {
      window.location.reload();
      dispatch(deletePost(post._id))
      handleClose();
      setAnchorEl(null);
    };

    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const words = post.message.split(" ");
    const excerpt = words.slice(0, 25).join(" ");

    const handleEdit = () => {
      setCurrentId(post._id)
      handleMenuClose();
    };

  return (
    <Card className="card">
      <CardMedia className="medias" image={post.selectedFile} title={post.title} />
      <div className="overlay">
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className="overlay2">
          <Button
            style={{ color: 'white' }}
            size="small" 
            onClick={handleMenuOpen}>
            <MoreHorizIcon fontSize="medium" />
          </Button>
      </div>
      <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEdit}>
            <Button
              size="small" 
              color="secondary" 
            >
              <EditIcon className='editIcon' fontSize="small" /> Edit
            </Button>
          </MenuItem>
          <MenuItem onClick={handleClickOpen}>
            <Button
              size="small" 
              color="secondary" 
            >
              <DeleteIcon className='editIcon' fontSize="small" /> Delete
            </Button>
          </MenuItem>
      </Menu>
      <Dialog open={open} onClose={handleClose} disableEscapeKeyDown>
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>Are you sure you want to delete this post?</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ButtonBase component="span" name="test" onClick={openPost} className="cardAction">
        <div className="details">
          <Typography
            variant="body2" 
            color="textSecondary" 
            component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography 
          className="title" 
          gutterBottom 
          variant="h5" 
          component="h2">
          {post.title}
        </Typography>
        <CardContent className="message">
          {post.message.length > 200 ? (
            <div>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {excerpt}
                {<button 
                  type="button" 
                  onClick={openPost} 
                  className="link-button">
                   Continue reading
                </button>}
              </Typography>
            </div>
          ) : (
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {post.message}
            </Typography>
          )}
        </CardContent>
      </ButtonBase>
  </Card>
  );
};

export default Post;
