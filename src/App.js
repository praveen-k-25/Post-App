import {Route, Routes, useNavigate} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import NewPost from "./NewPost";
import Nav from "./Nav";
import PostPage from "./PostPage";
import Missing from "./Missing";
import About from "./About";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import {format} from "date-fns";
import api from "./api/posts";
import EditPosts from "./EditPosts";
import dataBase from "./db.json"
import React from 'react';
import useWindowSize from "./hooks/useWindowSize";

function App() {
  const [posts,setPosts] = useState([]);
  const [search,setSearch] = useState('');
  const [searchResults,setSearchResults] = useState([]);
  const [postTitle,setPostTitle]= useState('');
  const [postBody,setPostBody] = useState('');
  const [editPostTitle,setEditPostTitle] = useState('');
  const [editPostBody,setEditPostBody] = useState('');
  const Navigate = useNavigate();
  const {width} = useWindowSize();

  useEffect(()=>{
    const fetchPost = async ()=>{
      try{
        /* const response = await axios.get('http://localhost:3500/posts') */
        const response = await api.get('/posts');
        setPosts(await response.data);
      } catch(err){
        alert("YOU ARE Offline")
        console.log(dataBase.posts);
        setPosts(dataBase.posts)
      }
    }
    fetchPost();
  },[])

  useEffect(()=>{
    const filteredResult = posts.filter((post)=>
    ((post.body).toLowerCase()).includes(search.toLowerCase()) ||
    ((post.title).toLowerCase()).includes(search.toLowerCase())
    )
    setSearchResults(filteredResult.reverse())
  },[posts,search])

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id +1 : 1;
    const date = format(new Date(),'MMMM dd, yyyy pp')
    const newPost = {id:id,title:postTitle,time:date,body:postBody} 
    const allPost = [...posts , newPost]
    setPosts(allPost)
    await api.post('/posts',newPost)
    setPostBody('')
    setPostTitle('')
    Navigate('/')
  }

  const handleDelete = async(id)=>{
    try{
      await api.delete(`/posts/${id}`)
      const filteredResult = posts.filter(post => post.id !== id)
      setPosts(filteredResult);
      Navigate('/')} catch(err){

      }
  }

  const handleEdit = async(id)=>{
    const date = format(new Date(),'MMMM dd, yyyy pp')
    const newPost = {id,title:editPostTitle,time:date,body:editPostBody}
    try{
      const response = await api.put(`/posts/${id}`,newPost)
      const data =  response.data;
      /* the ...data indicates that the changes made in response is updated in the post value */
      setPosts(posts.map(post => post.id === id ? {...data}:post))
      setEditPostBody('')
      setEditPostTitle('')
      Navigate('/')
    }catch(err){
      console.log(err.message);
    }
  }
  
  return (
    <div className="App"> 
        <Header title="Dhuddu Social Media" width={width}/>
        <Nav
          search = {search}
          setSearch = {setSearch}
        />
        <Routes>
          <Route index element={ <Home posts={searchResults}/> }/>
          <Route path="post">
            <Route index element={
            <NewPost
              postTitle = {postTitle}
              setPostTitle ={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
              handleSubmit = {handleSubmit}
            /> }/>
            <Route path=":id" element={ <PostPage
              posts={posts}
              handleDelete={handleDelete}
            /> }/>
          </Route>  
          <Route path="edit/:id" element={ <EditPosts
              posts ={searchResults}
              handleEdit = {handleEdit}
              editPostTitle={editPostTitle}
              editPostBody = {editPostBody}
              setEditPostBody={setEditPostBody}
              setEditPostTitle={setEditPostTitle}
            />
            }/>
          <Route path="about" element={ <About/> }/>
          <Route path="*" element={ <Missing/> }/>
        </Routes>   
        <Footer/>   
        
    </div>
    
  );
}

export default App;
