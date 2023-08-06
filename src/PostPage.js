import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import Missing from './Missing';
import DataContext from './context/DataContext';

const PostPage = () => {
  const {posts,handleDelete} = useContext(DataContext)
  const {id} =useParams();
  const post = posts.find(post => (post.id).toString() === id)
  return (
    <main className='PostPage'>
      <article className='post'>
        {
          post && 
          <div>
            <h2>{post.title}</h2>
            <p className='postTime'>{post.time}</p>
            <p className='postBody'>{post.body}</p>
            <Link to={`/edit/${post.id}`}><button style={{backgroundColor:"gray",marginRight:"0.25rem"}}>Edit</button></Link>
            <button onClick={()=>handleDelete(post.id)}>Delete Post</button>
          </div>
        }
        {
          !post && <Missing/>
        }
      </article>
    </main>
    
    
  )
}

export default PostPage