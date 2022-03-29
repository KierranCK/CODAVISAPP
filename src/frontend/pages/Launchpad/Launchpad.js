import React from 'react'
import Button from '../../components/Button/Button'
import visualise from '../../images/visualise-full-cropped-min.jpg'
import './Launchpad.css'

const Launchpad = () => {
  return (
      <div className='launchpad'>

      <div className='launchpad-title-pane'>
        <h1>CODVID DATA <br /> VISUALISATION</h1>
        <p>A powerful tool for the analysis and visualisation of COVID-19</p>
        <Button 
        location="/dashboard"
        label="Launch"
        colour="orange"
        />
        </div>

        <div className='visualise-image'>
            <img src={visualise} />
        </div>

    </div>
  )
}

export default Launchpad