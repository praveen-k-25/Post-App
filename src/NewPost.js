import React from 'react'

const NewPost = ({postTitle,setPostTitle,postBody,setPostBody,handleSubmit}) => {
  return (
    <div className='newPost'>
      <h2>New Post</h2>
      <form className='newPostForm' onSubmit={handleSubmit}>
        <label htmlFor='postTitle'>Title:</label>
        <input
          id='postTitle'
          type='text'
          required
          placeholder='New Post'
          value={postTitle}
          onChange={e=>setPostTitle(e.target.value)}
        ></input>
        <label htmlFor='setPostTitle'>Post:</label>
        <textarea
          id='setPostTitle'
          type='text'
          required
          value={postBody}
          onChange={e=>setPostBody(e.target.value)}
        ></textarea>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default NewPost