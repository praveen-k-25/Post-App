import { format } from 'date-fns';
import {createContext,useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom/dist';
import useWindowSize from '../hooks/useWindowSize';
import api from "../api/posts";

const DataContext = createContext({});

export const DataProvider = ({children})=>{
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
        console.log(err.message);
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
      const updatedPost = posts.map(post => (post.id).toString() === id ? {...data}:post);
      setPosts(updatedPost)
      setEditPostBody('')
      setEditPostTitle('')
      Navigate('/')
      console.log(posts);
    }catch(err){
      console.log(err.message);
    }
  }
    return(
        <DataContext.Provider value={{
            width,search,setSearch,searchResults,postTitle,setPostTitle,postBody,setPostBody,handleSubmit,posts,handleDelete,handleEdit,editPostTitle,editPostBody,setEditPostBody,setEditPostTitle,setPosts
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext