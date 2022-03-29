import React from 'react'
import Nav from '../Nav/Nav'
import './Layout.css'

const Layout = ({ children }) => {
  return (
    <div className='layout'>
        <Nav />
        <main className='main'>
            { children }
        </main>
    </div>
  )
}

export default Layout