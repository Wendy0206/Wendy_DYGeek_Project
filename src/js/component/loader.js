import React from "react";
import { RotatingLines } from "react-loader-spinner";

export function Loader() {
  console.log('this function was called in the Loader')
  return (

    <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}
    />
  
  )
}