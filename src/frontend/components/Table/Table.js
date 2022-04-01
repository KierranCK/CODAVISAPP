import React from 'react'
import './Table.css'

const Table = ({headers, data, nullValue}) => {

  //regex function to add commas to numbers
  const addCommas = number => {
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

  return (
  <div className='table-div'>
<table className='table table-dark table-striped'>

        <thead>
          <tr className='head-row'>{headers.map((header, i) => <th key={i}>{header}</th>)}</tr>
        </thead>
        <tbody>

{data.map((datapoint, i) => {
  return (
    <tr key={i}>
     <td>{i + 1}</td>
     <td>{datapoint.country}</td>
     <td>{datapoint.cases.active ? addCommas(datapoint.cases.active) : nullValue}</td>
    <td>{datapoint.cases.critical ? addCommas(datapoint.cases.critical) : nullValue}</td>
    <td className={datapoint.cases.new === null || datapoint.cases.new === 0 ? "green" : "red"}>{datapoint.cases.new ? addCommas(datapoint.cases.new) : nullValue}</td>
    <td>{datapoint.cases.recovered ? addCommas(datapoint.cases.recovered) : nullValue}</td>
    <td className={datapoint.deaths.new === null || datapoint.deaths.new === 0 ? "green" : "red"}>{datapoint.deaths.new ? addCommas(datapoint.deaths.new) : nullValue}</td>
   <td>{datapoint.cases.total ? addCommas(datapoint.cases.total) : nullValue}</td>
   <td>{datapoint.deaths.total ? addCommas(datapoint.deaths.total) : nullValue}</td>
    </tr>
  );
})}
</tbody> 
      </table>

  </div>

  )
}


// https://getbootstrap.com/docs/5.1/content/tables/
export default Table