import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import DataContext from './context/DataContext'

const Nav = () => {
  const {search,setSearch} = useContext(DataContext)
  return (
    <nav>
      <form className="searchForm" onSubmit={(e)=>(e.preventDefault())}>
        <label htmlFor='search'>Search Post</label>
        <input
          id="search"
          placeholder='Search Posts'
          type='text'
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        ></input>
      </form>
      
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/post">Post</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      
    </nav>
  )
}

export default Nav