import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav/Nav'
import './Dashboard.css'
import Layout from '../../components/Layout/Layout'
import Table from '../../components/Table/Table'
import StatsBar from '../../components/StatsBar/StatsBar'
import Loading from '../../components/Loading/Loading'
import axios from 'axios'
import config from '../../config.js'

const Dashboard = () => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const headers = ["#", "Country", "Active", "Critical", "New", "Recovered", "Total"];
    const nullValue = "0";
    const currentTime = new Date();


    //retrieve data for api
    useEffect(() => {
        const options = {
            method: 'GET',
            url: config.URL + "/statistics",
            headers: {
                'X-RapidAPI-Host': config.HOST,
                'X-RapidAPI-Key': config.API_KEY
            }
        }
    
        axios.request(options).then(res => {
            console.log(res.data);
            let countryData = res.data.response;
            countryData.sort((a, b) => {
                return b.cases.active - a.cases.active;
            })

            setData(countryData);
        }).catch(err => {
            console.error(err);
        });
    }, [])


  return (
      <Layout>
          <div>
          <h2 className='page-title'>Dashboard</h2>
          <p>{currentTime.getDate}</p>
          </div>

        <div className='centre'>
            {
            !data ?
            <Loading /> :
            <>
            <StatsBar />
            <Table 
            headers={headers}
            data={data}
            nullValue={nullValue}
            />     

            </>

        }

        </div>

      </Layout>


  )
}

export default Dashboard