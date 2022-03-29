import React from 'react';
import "./Loading.css";

const Loading = () => {
  return (
    <div class="spinner">
        <svg class="spinning-loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340">
            <circle cx="170" cy="170" r="20" stroke="#FFFFFF"/>
            <circle cx="170" cy="170" r="15" stroke="#FFFFFF"/>
            <circle cx="170" cy="170" r="10" stroke="#FFFFFF"/>
            <circle cx="170" cy="170" r="5" stroke="#FFFFFF"/>
        </svg>
    </div>
  )
}

export default Loading;


