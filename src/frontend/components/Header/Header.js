import React from 'react'
import './Header.css'

const Header = ({title, timestamp}) => {

  return (
    <div className='header'>
        <h2 className='page-title'>{title}</h2>
        {timestamp?
            <p className='timestamp'>{timestamp}</p> : 
            <></>
        }

    </div>
  )
}

export default Header