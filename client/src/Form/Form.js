import { Button, Divider, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost, updatePost } from '../actions/posts';
import  './Styles.css';

const Form = ({currentId,setCurrentId}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const root1='root'
    const form1='form'
    const post = useSelector((state)=>(currentId? state.posts.posts.find((post) =>post._id===currentId):null) )

    const [postData,setPostData] = useState({title:"",message:"",tags:"",selectedFile:null})
    const [formErrors, setFormErrors] = useState({});

    useEffect(()=>{
        if(post) setPostData(post)
    },[dispatch,post])


    const validateForm = () => {
        let errors = {};
    
        if (!postData.title.trim()) {
          errors.title = 'Title is required';
        }
    
        if (!postData.message.trim()) {
          errors.message = 'Message is required';
        }
    
        const tags = Array.isArray(postData.tags) ? postData.tags.join(',') : postData.tags;
        if (!tags.trim()) {
            errors.tags = 'Tags are required';
        }
    
        if (!postData.selectedFile) {
          errors.selectedFile = 'A file must be selected';
        }
    
        return errors;
    };
    const setTitle = (e) =>{
        const titleValue = e.target.value;
        setPostData({...postData,title:titleValue})
        if (!titleValue) {
            setFormErrors({...formErrors, title: "Title is required"})
        } else {
            const {[e.target.name]: removedError, ...rest} = formErrors;
            setFormErrors(rest);
        }
    }

    const setMessage = (e) =>{
        const messageValue = e.target.value;
        setPostData({...postData, message:messageValue})
        if (!messageValue) {
            setFormErrors({...formErrors, message: "Message is required"})
        } else {
            const {[e.target.name]: removedError, ...rest} = formErrors;
            setFormErrors(rest);
        }
    }

    const setTags = (e) =>{
        const tags = e.target.value.split(',');
        setPostData({ ...postData, tags });
        if (!e.target.value) {
            setFormErrors({ ...formErrors, tags: "Tags are required" });
        } else {
            setFormErrors({ ...formErrors, tags: "" });
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        const errors = validateForm();
        console.log(errors);
        if (Object.keys(errors).length === 0) {
            if(!currentId){
                dispatch(createPost({...postData},navigate))
                setPostData({
                    title:"",message:"",tags:"",selectedFile:null 
                 })
            }
            else
            {
                setPostData(post);
                dispatch(updatePost(currentId,postData))
                setPostData({
                    title:"",message:"",tags:"",selectedFile:null
                })
                setCurrentId(0);
            }
        } else {
            setFormErrors(errors);
        }
    }
    
    const clear = ()=>{
        setPostData({
           title:"",message:"",tags:"",selectedFile:null 
        })
        setCurrentId(0);
        setFormErrors({});
    }

  return (
      <Paper className="paper" elevation={6}>
          <Typography variant='h6' color='primary' align='center'>{currentId? "Editing ":"Creating"} a Post</Typography>
          <form autoComplete='off'  onSubmit={handleSubmit} className={`${root1} ${form1}`}>
            <TextField 
                name="title" 
                variant="outlined"
                label="Title" 
                fullWidth value={postData.title}
                onChange={setTitle}
                error={Boolean(formErrors.title)}
                helperText={formErrors.title}
            />
            <TextField 
                name="message"
                variant="outlined"
                label="Description" 
                fullWidth
                value={postData.message} 
                onChange={setMessage} 
                error={Boolean(formErrors.message)}
                helperText={formErrors.message}
            />
            
            <TextField
                name="tags"
                variant="outlined" 
                label="Tags" 
                fullWidth 
                value={postData.tags} 
                onChange={setTags} 
                error={Boolean(formErrors.tags)}
                helperText={formErrors.tags}
            />

            <div className="fileInput">
                <FileBase
                    type="file" 
                    multiple={false} 
                    accept=".jpg,.png,.jpeg"
                    onDone={({base64})=>{
                        setPostData({...postData,selectedFile:base64})
                        if(base64){
                            setFormErrors({...formErrors, selectedFile: ""})
                        }
                        else {
                            setFormErrors({ ...formErrors, selectedFile: 'File is required' });
                        }
                        validateForm();
                    }}
                />
                {formErrors.selectedFile && (
                    <Typography variant='caption' color='error'>
                    {formErrors.selectedFile}
                    </Typography>
                )}
            </div>
            <Button variant='contained' color="primary" type='submit' fullWidth className="buttonSubmit">Submit</Button>
            <Divider style={{ margin: '4px' }} />
            <Button variant='contained' color="secondary"  fullWidth onClick={clear}>Reset</Button>
          </form>
      </Paper>
  );
};

export default Form;
