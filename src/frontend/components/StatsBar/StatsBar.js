import React from 'react'
import './StatsBar.css'

const StatsBar = ({ data }) => {
    console.log(data)
      //regex function to add commas to numbers
  const addCommas = number => {
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

  return (
    <>
        <div className='container stats-bar'>
            <div className='row px-5 mx-5'>
            <div className='col px-2 stat'>
                <p className='stat-label'>Active</p>
                <p className='stat-figure'>{addCommas(data.cases.active)}</p>

            </div>
            <div className='col px-2 stat'>
                <p className='stat-label'>Critical</p>
                <p className='stat-figure'>{addCommas(data.cases.critical)}</p>
            </div>
            <div className='col px-2 stat'>
                <p className='stat-label'>Recovered</p>
                <p className='stat-figure'>{addCommas(data.cases.recovered)}</p>
            </div>
            <div className='col px-2 stat'>
                <p className='stat-label'>Total Cases</p>
                <p className='stat-figure'>{addCommas(data.cases.total)}</p>
            </div>
            <div className='col px-2 stat'>
                <p className='stat-label'>Total Deaths</p>
                <p className='stat-figure'>{addCommas(data.deaths.total)}</p>
            </div>
            </div>
        </div>
    </>
  )
}

export default StatsBar