import React from 'react'
import {FaMobileAlt,FaLaptop,FaTabletAlt} from 'react-icons/fa'

const Header = ({title,width}) => {
  return (
    <header className='header'>
      <h1>{title}</h1>
      { width < 768 ? <FaMobileAlt className='hook'/>
        : width <992 ? <FaTabletAlt className='hook'/>
        :<FaLaptop className='hook'/>
        }
    </header>
  )
}

export default Header