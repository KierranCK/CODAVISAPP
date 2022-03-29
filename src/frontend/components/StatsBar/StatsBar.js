import React from 'react'
import './StatsBar.css'

const StatsBar = () => {
  return (
    <>
        <div className='stats-bar'>
            <div className='stat'>
                <p className='stat-label'>Active</p>
                <p className='stat-figure'>5,361,549</p>
            </div>
            <div className='stat'>
                <p className='stat-label'>Confirmed</p>
                <p className='stat-figure'>5,361,549</p>
            </div>
            <div className='stat'>
                <p className='stat-label'>Critical</p>
                <p className='stat-figure'>5,361,549</p>
            </div>
            <div className='stat'>
                <p className='stat-label'>Deaths</p>
                <p className='stat-figure'>5,361,549</p>
            </div>
        </div>
    </>
  )
}

export default StatsBar