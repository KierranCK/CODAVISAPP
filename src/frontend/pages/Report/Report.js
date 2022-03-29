import React, { useState, useEffect, useCallback, component } from "react";
import Nav from '../../components/Nav/Nav'
import './Report.css'
import Layout from '../../components/Layout/Layout'
import Table from '../../components/Table/Table'
import StatsBar from '../../components/StatsBar/StatsBar'
import Button from "../../components/Button/Button";

const Dashboard = () => {
  const [country, setCountry] = useState("Select");

  const handleChange = e => {
    setCountry(e.target.value)
  }

  return (
      <Layout>
        <h2 className='page-title'>Report</h2>
        <div className='centre'>
              <h3 className='section-title'>Available Countries</h3>
                <select onChange={handleChange} value={country}>
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>

                <div className="select-button-section">
            </div>
        </div>

      </Layout>


  )
}

export default Dashboard