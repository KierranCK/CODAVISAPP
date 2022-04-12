import React from "react";
import "./StatsBar.css";
import { Col, Row } from "react-bootstrap";
import { addCommas } from "../../common/common";

const StatsBar = ({ data, horizontal = true, comparison = false }) => {
  console.log(data);
  //regex function to add commas to numbers

  return (
    <>
      {horizontal ? (
        <div className="container stats-bar stats-bar-horizontal">
          <div className="row px-5 mx-5">
            <div className="col px-2 stat">
              <p className="stat-label">New Cases</p>
              <p className="stat-figure">
                {addCommas(parseInt(data.cases.new))}
              </p>
            </div>
            <div className="col px-2 stat">
              <p className="stat-label">Active</p>
              <p className="stat-figure">{addCommas(data.cases.active)}</p>
            </div>
            <div className="col px-2 stat">
              <p className="stat-label">Critical</p>
              <p className="stat-figure">{addCommas(data.cases.critical)}</p>
            </div>
            <div className="col px-2 stat">
              <p className="stat-label">Recovered</p>
              <p className="stat-figure">{addCommas(data.cases.recovered)}</p>
            </div>
            <div className="col px-2 stat">
              <p className="stat-label">Total Cases</p>
              <p className="stat-figure">{addCommas(data.cases.total)}</p>
            </div>
            <div className="col px-2 stat">
              <p className="stat-label">New Deaths</p>
              <p className="stat-figure">
                {addCommas(parseInt(data.deaths.new))}
              </p>
            </div>
            <div className="col px-2 stat">
              <p className="stat-label">Total Deaths</p>
              <p className="stat-figure">{addCommas(data.deaths.total)}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="container stats-bar">
          <Col>
            <Row className="row px-0 py-2 stat" px={0} py={2}>
              <p className="stat-label">New Cases</p>
              <p className="stat-figure">
                {data.cases.new === null
                  ? "0"
                  : addCommas(parseInt(data.cases.new.substring(1)))}
              </p>
              {comparison && (
                <p
                  className={`stat-label ${
                    data.comparison.newCases > 0 ? `red` : `green`
                  }`}
                >
                  {`(${
                    data.comparison.newCases > 0
                      ? `+` + addCommas(data.comparison.newCases)
                      : addCommas(data.comparison.newCases)
                  })`}
                </p>
              )}
            </Row>
            <Row className="row px-0 py-2 stat" px={0} py={2}>
              <p className="stat-label">Active</p>
              <p className="stat-figure">
                {addCommas(data.cases.active)}
                <span>{`(${
                  Math.round(
                    (data.cases.active / data.population + Number.EPSILON) * 100
                  ) / 100
                }%)`}</span>
              </p>
              {comparison && (
                <p
                  className={`stat-label ${
                    data.comparison.active > 0 ? `red` : `green`
                  }`}
                >
                  {`(${
                    data.comparison.active > 0
                      ? `+` + addCommas(data.comparison.active)
                      : addCommas(data.comparison.active)
                  })`}
                </p>
              )}
            </Row>
            <div className="row px-0 py-2 stat">
              <p className="stat-label">Critical</p>
              <p className="stat-figure">
                {addCommas(data.cases.critical)}
                <span>{`(${
                  Math.round(
                    (data.cases.critical / data.population + Number.EPSILON) *
                      100
                  ) / 100
                }%)`}</span>
              </p>
              {comparison && (
                <p
                  className={`stat-label ${
                    data.comparison.critical > 0 ? `red` : `green`
                  }`}
                >
                  {`(${
                    data.comparison.critical > 0
                      ? `+` + addCommas(data.comparison.critical)
                      : addCommas(data.comparison.critical)
                  })`}
                </p>
              )}
            </div>
            <div className="row px-0 py-2 stat">
              <p className="stat-label">Recovered</p>
              <p className="stat-figure">{addCommas(data.cases.recovered)}</p>
              {comparison && (
                <p
                  className={`stat-label ${
                    data.comparison.recovered < 0 ? `red` : `green`
                  }`}
                >
                  {`(${
                    data.comparison.recovered > 0
                      ? `+` + addCommas(data.comparison.recovered)
                      : addCommas(data.comparison.recovered)
                  })`}
                </p>
              )}
            </div>
            <div className="row px-0 py-2 stat">
              <p className="stat-label">Total Cases</p>
              <p className="stat-figure">{addCommas(data.cases.total)}</p>
              {comparison && (
                <p
                  className={`stat-label ${
                    data.comparison.totalCases > 0 ? `red` : `green`
                  }`}
                >
                  {`(${
                    data.comparison.totalCases > 0
                      ? `+` + addCommas(data.comparison.totalCases)
                      : addCommas(data.comparison.totalCases)
                  })`}
                </p>
              )}
            </div>
            <Row className="row px-0 py-2 stat" px={0} py={2}>
              <p className="stat-label">New Deaths</p>
              <p className="stat-figure">
                {data.deaths.new === null
                  ? "0"
                  : addCommas(parseInt(data.deaths.new.substring(1)))}
              </p>
              {comparison && (
                <p
                  className={`stat-label ${
                    data.comparison.newDeaths > 0 ? `red` : `green`
                  }`}
                >
                  {`(${
                    data.comparison.newDeaths > 0
                      ? `+` + addCommas(data.comparison.newDeaths)
                      : addCommas(data.comparison.newDeaths)
                  })`}
                </p>
              )}
            </Row>
            <div className="row px-0 py-2 stat">
              <p className="stat-label">Total Deaths</p>
              <p className="stat-figure">
                {addCommas(data.deaths.total)}
                <span>{`(${
                  Math.round(
                    (data.deaths.total / data.population + Number.EPSILON) * 100
                  ) / 100
                }%)`}</span>
              </p>
              {comparison && (
                <p
                  className={`stat-label ${
                    data.comparison.totalDeaths > 0 ? `red` : `green`
                  }`}
                >
                  {`(${
                    data.comparison.totalDeaths > 0
                      ? `+` + addCommas(data.comparison.totalDeaths)
                      : addCommas(data.comparison.totalDeaths)
                  })`}
                </p>
              )}
            </div>
          </Col>
        </div>
      )}
    </>
  );
};

export default StatsBar;
