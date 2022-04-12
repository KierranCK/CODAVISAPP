import React, { useState } from "react";
import "./Table.css";
import { addCommas } from "../../common/common";

const Table = ({ headers, data, nullValue, handleTableSort, ascending }) => {
  //regex function to add commas to numbers

  const [activeHeader, setActiveHeader] = useState(null);
  const [decsending, setDescending] = useState(true);
  // const [tableData, setTableData] = useState(data);
  // console.log(ascending);

  const sortBy = (value) => {
    let localData = data;
    switch (value) {
      case "Region":
        data.sort((a, b) => {
          return b.country - a.country;
        });
        break;
      case "Population":
        if (decsending) {
          data.sort((a, b) => {
            return b.population - a.population;
          });
          setDescending(!decsending);
        } else {
          data.sort((a, b) => {
            return a.population - b.population;
          });
          setDescending(!decsending);
        }
        break;
      case "Active":
        if (decsending) {
          data.sort((a, b) => {
            return b.cases.active - a.cases.active;
          });
          setDescending(!decsending);
        } else {
          data.sort((a, b) => {
            return a.cases.active - b.cases.active;
          });
          setDescending(!decsending);
        }
        break;
      case "Critical":
        if (decsending) {
          data.sort((a, b) => {
            return b.cases.critical - a.cases.critical;
          });
          setDescending(!decsending);
        } else {
          data.sort((a, b) => {
            return a.cases.critical - b.cases.critical;
          });
          setDescending(!decsending);
        }
        break;
      case "New Cases":
        data.sort((a, b) => {
          return b.cases.new.toString() - a.cases.new;
        });
        break;
      case "Recovered":
        if (decsending) {
          data.sort((a, b) => {
            return b.cases.recovered - a.cases.recovered;
          });
          setDescending(!decsending);
        } else {
          data.sort((a, b) => {
            return a.cases.recovered - b.cases.recovered;
          });
          setDescending(!decsending);
        }
        break;
      case "Total Cases":
        if (decsending) {
          data.sort((a, b) => {
            return b.cases.total - a.cases.total;
          });
          setDescending(!decsending);
        } else {
          data.sort((a, b) => {
            return a.cases.total - b.cases.total;
          });
          setDescending(!decsending);
        }
        break;
      case "Total Deaths":
        if (decsending) {
          data.sort((a, b) => {
            return b.deaths.total - a.deaths.total;
          });
          setDescending(!decsending);
        } else {
          data.sort((a, b) => {
            return a.deaths.total - b.deaths.total;
          });
          setDescending(!decsending);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="table-div">
      <table className="table table-dark table-striped">
        <thead>
          <tr className="head-row">
            {headers.map((header, i) => (
              <th
                key={i}
                onClick={() => {
                  sortBy(header);
                  setActiveHeader(header);
                }}
                className={activeHeader === header && "active"}
              >
                {header}

                {activeHeader === header && !decsending && (
                  <span class="material-icons-outlined down-arrow">
                    arrow_drop_down
                  </span>
                )}
                {activeHeader === header && decsending && (
                  <span class="material-icons-outlined up-arrow">
                    arrow_drop_up
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((datapoint, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{datapoint.country}</td>
                <td>
                  {datapoint.population
                    ? addCommas(datapoint.population)
                    : "No data available"}
                </td>
                <td>
                  {datapoint.cases.active
                    ? addCommas(datapoint.cases.active)
                    : nullValue}
                </td>
                <td>
                  {datapoint.cases.critical
                    ? addCommas(datapoint.cases.critical)
                    : nullValue}
                </td>
                <td
                  className={
                    datapoint.cases.new === null || datapoint.cases.new === 0
                      ? "green"
                      : "red"
                  }
                >
                  {datapoint.cases.new
                    ? addCommas(datapoint.cases.new)
                    : nullValue}
                </td>
                <td>
                  {datapoint.cases.recovered
                    ? addCommas(datapoint.cases.recovered)
                    : nullValue}
                </td>
                <td
                  className={
                    datapoint.deaths.new === null || datapoint.deaths.new === 0
                      ? "green"
                      : "red"
                  }
                >
                  {datapoint.deaths.new
                    ? addCommas(datapoint.deaths.new)
                    : nullValue}
                </td>
                <td>
                  {datapoint.cases.total
                    ? addCommas(datapoint.cases.total)
                    : nullValue}
                </td>
                <td>
                  {datapoint.deaths.total
                    ? addCommas(datapoint.deaths.total)
                    : nullValue}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// https://getbootstrap.com/docs/5.1/content/tables/
export default Table;
