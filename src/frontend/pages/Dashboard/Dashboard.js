import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav/Nav'
import './Dashboard.css'
import Layout from '../../components/Layout/Layout'
import Table from '../../components/Table/Table'
import StatsBar from '../../components/StatsBar/StatsBar'
import Loading from '../../components/Loading/Loading'
import axios from 'axios'
import config from '../../config.js'
import Header from '../../components/Header/Header'
import PieChart from '../../components/PieChart/PieChart'
import BarChart from '../../components/BarChart/BarChart'

const Dashboard = () => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [highestCases, setHighestCases] = useState(null);
    const [topFiveCases, setTopFiveCases] = useState(null);
    const [topFiveDeaths, setTopFiveDeaths] = useState(null);
    const [highestDeaths, setHighestDeaths] = useState(null);
    const headers = ["#", "Region", "Active", "Critical", "New Cases", "Recovered", "New Deaths", "Total Cases", "Total Deaths"];
    const nullValue = "0";

    // retrieve data for api
    
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

            //sort data in decsending active case order
            countryData.sort((a, b) => {
                return b.cases.active - a.cases.active;
            })
            setData(countryData);
            setHighestCases(countryData);

            countryData.sort((a, b) => {
                return b.deaths.total - a.deaths.total;
            })
            setHighestDeaths(countryData);


            //setDate for 'last updated' value
            const date = new Date();
            const dateString = 
            ("0" + date.getDate()).slice(-2) 
            + "/" + ("0"+(date.getMonth()+1)).slice(-2) 
            + "/" + date.getFullYear() 
            + " " 
            + ("0" + date.getHours()).slice(-2) 
            + ":" + ("0" + date.getMinutes()).slice(-2) 
            + ":" + ("0" + date.getSeconds()).slice(-2);

            setLastUpdated("Last updated: " + dateString)
        
        }).catch(err => {
            console.error(err);
        });
    }, [])

    //function to return object containing lists of values and categories for top 5 regions for death rate
    const topFive = (data, type)=> {
        let regions = [];
        let values = [];
        let five = data.slice(1, 6);
        console.log(five);
        if (type === "deaths") {
            five.map(datapoint => {
                regions.push(datapoint.country)
                values.push(datapoint.deaths.total);
            })
        } else if (type === "cases") {
            five.map(datapoint => {
                regions.push(datapoint.country)
                values.push(datapoint.cases.active);
            })
        }
        return { regions: regions, values: values }
    }


  return (
      <Layout>
          <Header 
          title="Dashboard"
          timestamp={lastUpdated}
          />

{!data? 
 <div className='centre'>
 <Loading />
</div>:
<div class="container overflow-hidden">
  <div class="row">

    <div class="col">
     <div class="p-3 rounded bg-dark">
         <p>Global Stats</p>
         <div className='text-center'>
         <StatsBar data={data[0]}/>    
         </div>
    </div>
    </div>

  </div>
    

  <div class="row">
    <div class="col gy-4">
    <div class="p-3 rounded bg-dark">
        <p>Global Stats By Region</p>
            <Table 
            headers={headers}
            data={data}
            nullValue={nullValue}
            />     
    </div>
    </div>
    <div class="col gy-4">
    <div class="p-3 rounded bg-dark">
        
        <p>Global Chart</p>
        <div className='d-flex justify-content-center'>
        <PieChart 
        labels={[]}
        data={[]}
        colors={[]}
        />
        </div>

    </div>
    </div>
  </div>

  <div class="row">
    
    <div class="col gy-4">
    <div class="p-3 rounded bg-dark">
        
        <p>Cases</p>
        <div className='d-flex justify-content-center'>
        <BarChart
        label={"Top Five Regions for deaths"}
        categories={topFive(highestCases, "cases").regions}
        values={topFive(highestCases, "cases").values}
        />
        </div>

    </div>
    </div>

    <div class="col gy-4">
    <div class="p-3 rounded bg-dark">
        
        <p>Deaths</p>
        <div className='d-flex justify-content-center'>
        <BarChart
        label={"Top Five Regions for deaths"}
        categories={topFive(highestDeaths, "deaths").regions}
        values={topFive(highestDeaths, "deaths").values}
        />
        </div>

    </div>
    </div>

  </div>


</div>
}


      </Layout>


  )
}

export default Dashboard