import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Missing from './Missing';

const PostPage = ({posts,handleDelete}) => {
  const {id} =useParams();
  const post = posts.find(post => (post.id).toString() === id)
  console.log(posts);
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