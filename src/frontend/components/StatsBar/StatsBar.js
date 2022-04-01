import React from 'react'
import './StatsBar.css'
import { Col, Row } from 'react-bootstrap'

const StatsBar = ({ data, horizontal = true }) => {
    console.log(data)
      //regex function to add commas to numbers
  const addCommas = number => {
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

  return (
    <>
    
{horizontal ?        <div className='container stats-bar'>
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
        :
        <div className='container stats-bar'>
            <Col>
            <Row className='row px-0 py-2 stat'px={0} py={2}>
                <p className='stat-label'>Active</p>
                <p className='stat-figure'>{addCommas(data.cases.active)}</p>
                <p className='stat-label'>{"(+27,000)"}</p>
            </Row>
            <div className='row px-0 py-2  stat'>
                <p className='stat-label'>Critical</p>
                <p className='stat-figure'>{addCommas(data.cases.critical)}</p>
                <p className='stat-label'>{"(+27,000)"}</p>
            </div>
            <div className='row px-0 py-2 stat'>
                <p className='stat-label'>Recovered</p>
                <p className='stat-figure'>{addCommas(data.cases.recovered)}</p>
                <p className='stat-label'>{"(+27,000)"}</p>
            </div>
            <div className='row px-0 py-2 stat'>
                <p className='stat-label'>Total Cases</p>
                <p className='stat-figure'>{addCommas(data.cases.total)}</p>
                <p className='stat-label'>{"(+27,000)"}</p>
            </div>
            <div className='row px-0 py-2 stat'>
                <p className='stat-label'>Total Deaths</p>
                <p className='stat-figure'>{addCommas(data.deaths.total)}</p>
                <p className='stat-label'>{"(+27,000)"}</p>
            </div>
            </Col>
        </div>
    
    }

    </>
  )
}

export default StatsBar