import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const EditPosts = ({posts,handleEdit,editPostTitle,editPostBody,setEditPostBody,setEditPostTitle}) => {
    const {id} = useParams();
    const edit = posts.find(post => (post.id).toString() === id);
    useEffect(()=>{
        if(edit){
            setEditPostTitle(edit.title)
            setEditPostBody(edit.body)
        }
    },[edit,setEditPostBody,setEditPostTitle])
  return (
    <div className='editPost newPost'>
        <h2>Edit Post</h2>
      <form className='newPostForm' onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor='postTitle'>Title:</label>
        <input
          id='postTitle'
          type='text'
          required
          placeholder='New Post'
          value={editPostTitle}
          onChange={e=>setEditPostTitle(e.target.value)}
        ></input>
        <label htmlFor='setPostTitle'>Post:</label>
        <textarea
          id='setPostTitle'
          type='text'
          required
          value={editPostBody}
          onChange={e=>setEditPostBody(e.target.value)}
        ></textarea>
        <button type='submit' onClick={()=>handleEdit(id)}>Submit</button>
      </form>
    </div>
  )
}

export default EditPosts