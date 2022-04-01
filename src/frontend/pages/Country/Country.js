import React from "react";
import "./Country.css";
import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";
import { Row, Col, Container, Stack } from "react-bootstrap";
import StatsBar from "../../components/StatsBar/StatsBar";
import PieChart from "../../components/PieChart/PieChart";
import BarChart from "../../components/BarChart/BarChart";

const Country = () => {
  return (
    <Layout>
      <Header title="" timestamp={"Last Updated: 12:45 01-02-2022"} />

      <Container>
        <Row>
          <Col>
            <div className="p-3 rounded bg-dark">
              <Row className="country-header">
                <Col md="auto">
                  <h2>{"United Kingdom".toUpperCase()}</h2>
                </Col>
                <Col className="px-0">
                  <p className="data-label">{"Continent: " + "Europe"}</p>
                  <p className="data-label">{"Population: " + "67,279,712"}</p>
                </Col>
              </Row>
              <Row className="py-0 my-0">
                <p>As of 12:45 01-02-2022</p>
              </Row>
              <Row>
                <Col className="px-0 py-3">
                  <StatsBar
                    data={{
                      cases: {
                        critical: 8728732,
                        recovered: 7927322,
                        active: 97722,
                        total: 2322922,
                      },
                      deaths: {
                        total: 97286322,
                      },
                    }}
                    horizontal={false}
                  />
                </Col>

                <Col className="px-0 py-4">
                  <Row>
                    <Col>
                      <PieChart cutout={55} />
                    </Col>
                  </Row>

                  <Row>
                    <Col className="py-3 px-3">
                      <BarChart />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>

          <Col>
            <div className="p-3 rounded bg-dark">
              <Row className="country-header">
                <Col md="auto">
                  <h2>{"United States".toUpperCase()}</h2>
                </Col>
                <Col className="px-0">
                  <p className="data-label">{"Continent: " + "Europe"}</p>
                  <p className="data-label">{"Population: " + "332,279,712"}</p>
                </Col>
              </Row>
              <Row className="py-0 my-0">
                <p>As of 12:45 01-02-2022</p>
              </Row>
              <Row>
                <Col className="px-0 py-3">
                  <StatsBar
                    data={{
                      cases: {
                        critical: 8728732,
                        recovered: 7927322,
                        active: 97722,
                        total: 2322922,
                      },
                      deaths: {
                        total: 97286322,
                      },
                    }}
                    horizontal={false}
                  />
                </Col>

                <Col className="px-0 py-4">
                  <Row>
                    <Col>
                      <PieChart cutout={55} />
                    </Col>
                  </Row>

                  <Row>
                    <Col className="py-3 px-3">
                      <BarChart />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Country;
