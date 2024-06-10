import React from "react";
import { RotatingLines } from "react-loader-spinner";
import ClipLoader from "react-spinners/ClipLoader";
import "../../styles/home.css";

export function Loader() {
  console.log('this function was called in the Loader check this out')
  return (
    <div className="catalog_div">

<h1 className="mx-auto">We're loading</h1>

    </div>
  )
}