import React from 'react'
import './Header.css'

const Header = ({title, timestamp}) => {

  return (
    <div className='header'>
        <h3 className='page-title'>{title}</h3>
        {timestamp?
            <p className='timestamp'>{timestamp}</p> : 
            <></>
        }

    </div>
  )
}

export default Header