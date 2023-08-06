import React, { useContext } from 'react'
import {FaMobileAlt,FaLaptop,FaTabletAlt} from 'react-icons/fa'
import DataContext from './context/DataContext'

const Header = ({title}) => {
  const {width} = useContext(DataContext)
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