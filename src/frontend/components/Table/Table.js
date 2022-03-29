import React from 'react'
import './Table.css'

const Table = ({headers, data, totals, nullValue}) => {

  //regex function to add commas to numbers
  const addCommas = number => {
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

  return (
  <>
<table className='table table-dark table-striped'>
        <thead>
          <tr>{headers.map((header, i) => <th key={i}>{header}</th>)}</tr>
        </thead>
        <tbody>
{data.map((datapoint, i) => {
  return (
    <tr key={i}>
     <td>{i + 1}</td>
     <td>{datapoint.country}</td>
     <td>{datapoint.cases.active ? addCommas(datapoint.cases.active) : nullValue}</td>
    <td>{datapoint.cases.critical ? addCommas(datapoint.cases.critical) : nullValue}</td>
    <td>{datapoint.cases.new ? addCommas(datapoint.cases.new) : nullValue}</td>
    <td>{datapoint.cases.recovered ? addCommas(datapoint.cases.recovered) : nullValue}</td>
   <td>{datapoint.cases.total ? addCommas(datapoint.cases.total) : nullValue}</td>
    </tr>
  );
})}
</tbody> 
      </table>

  </>



        // <table className='table'>
        //     <thead>
        //         <tr>
        //             {headders.map(headding => {
        //                 <th scope="col">{headding}</th>
        //             })}
        //         </tr>
        //     </thead>

        //     <tbody>
        //         {data.map(() => {
        //           <tr>
        //             <th></th>
        //           </tr>
        //         })}
        //     </tbody>

        //     <tfoot>
        //         {totals.map(() => {

        //         })}
        //     </tfoot>

        // </table>

  )
}


// https://getbootstrap.com/docs/5.1/content/tables/
export default Table