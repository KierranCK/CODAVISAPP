import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Layout from "../../components/Layout/Layout";
import Table from "../../components/Table/Table";
import StatsBar from "../../components/StatsBar/StatsBar";
import Loading from "../../components/Loading/Loading";
import axios from "axios";
import config from "../../config.js";
import Header from "../../components/Header/Header";
import PieChart from "../../components/PieChart/PieChart";
import BarChart from "../../components/BarChart/BarChart";
import { Button, Row, Col, Dropdown } from "react-bootstrap";
import { formatDateTime } from "../../common/common";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [highestCases, setHighestCases] = useState([]);
  const [topFiveCases, setTopFiveCases] = useState({});
  const [topFiveDeaths, setTopFiveDeaths] = useState({});
  const [highestDeaths, setHighestDeaths] = useState([]);
  const [sortTable, setSortTable] = useState(null);
  const headers = [
    "#",
    "Region",
    "Active",
    "Critical",
    "New Cases",
    "Recovered",
    "New Deaths",
    "Total Cases",
    "Total Deaths",
  ];
  const nullValue = "0";

  const handleTableSort = (sortBy) => {
    setSortTable(sortBy);
  };

  useEffect(() => {
    console.log(sortTable);
    switch (sortTable) {
      case "Region":
        break;

      default:
        break;
    }
  }, [sortTable]);

  // retrieve data for api
  useEffect(() => {
    axios
      .request({
        method: "GET",
        url: config.BACKEND + "/statistics",
      })
      .then((res) => {
        let countryData1 = res.data;
        let countryData2 = res.data;
        let countryData3 = res.data;

        //sort data in decsending active case order
        const sortedByCases = countryData2.sort((a, b) => {
          return b.cases.active - a.cases.active;
        });
        setData(countryData1);
        setHighestCases(sortedByCases);

        const sortedByDeaths = countryData3.sort((a, b) => {
          return b.deaths.total - a.deaths.total;
        });
        setHighestDeaths(sortedByDeaths);

        //setDate for 'last updated' value
        setLastUpdated("Last updated: " + formatDateTime(new Date()));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const topFive = highestCases.splice(1, 5);
    let regions = [];
    let values = [];
    topFive.map((datapoint) => {
      regions.push(datapoint.country);
      values.push(datapoint.cases.active);
    });

    setTopFiveCases({ categories: regions, values: values });
    console.log(topFiveCases);
  }, [highestCases]);

  useEffect(() => {
    const topFive = highestDeaths.splice(1, 5);
    let regions = [];
    let values = [];
    topFive.map((datapoint) => {
      regions.push(datapoint.country);
      values.push(datapoint.deaths.total);
    });

    setTopFiveDeaths({ categories: regions, values: values });
  }, [highestDeaths]);

  useEffect(() => {
    console.log("data: " + data);
  }, [data]);

  return (
    <Layout>
      <Header title="Dashboard" timestamp={lastUpdated} />

      {data &&
        data.map((datapoint, i) => {
          <p key={i}>{datapoint}</p>;
        })}

      {!data ? (
        <div className="centre">
          <Loading />
        </div>
      ) : (
        <div className="container overflow-hidden">
          <Row>
            <Col>
              <div className="p-3 rounded bg-dark">
                <p>Global Stats</p>
                <div className="text-center">
                  <StatsBar data={data[0]} />
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col className="gy-4">
              <div className="p-3 rounded bg-dark">
                <p>Global Stats By Region</p>
                <Row>
                  <Col className="gy-1">
                    {/* <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Dropdown Button
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown> */}
                  </Col>
                </Row>

                <Table
                  headers={headers}
                  data={data}
                  nullValue={nullValue}
                  handleTableSort={handleTableSort}
                />
              </div>
            </Col>
            <Col className="gy-4">
              <div className="p-3 rounded bg-dark">
                <p>Global Chart</p>
                <div className="d-flex justify-content-center">
                  <PieChart
                    labels={[
                      "Active",
                      "Critical",
                      "Recovered",
                      "Total Cases",
                      "Total Deaths",
                    ]}
                    data={data[0]}
                  />
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col className="gy-4">
              <div className="p-3 rounded bg-dark">
                <p>Cases</p>
                <div className="d-flex justify-content-center">
                  <BarChart
                    label={"Cases"}
                    categories={topFiveCases.categories}
                    values={topFiveCases.values}
                  />
                </div>
              </div>
            </Col>

            <Col className="gy-4">
              <div className="p-3 rounded bg-dark">
                <p>Deaths</p>
                <div className="d-flex justify-content-center">
                  <BarChart
                    label={"Deaths"}
                    categories={topFiveDeaths.categories}
                    values={topFiveDeaths.values}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
