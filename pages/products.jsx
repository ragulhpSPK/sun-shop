import React from "react";
import { Category } from "../helper/categories";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import { getAllCatagory } from "../helper/utilities/apiHelper"
import {get} from "lodash"
import { useState } from "react";
import { useEffect } from "react";

function AllProducts() {
  const router = useRouter();
  const [category,setCategory]=useState([])

  const fetchData = async () => {
    try {
    const result = await getAllCatagory()
    setCategory(get(result,"data.data",[]))
    } catch (err) {
      console.log(err)
    }
 
  }

  
  useEffect(() => {
    fetchData()
  },[])

  return (
    <div className="min-h-screen">
      <div className="h-[100%] grid w-screen xsm:pl-10 lg:pl-40 xsm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-5  pt-10">
        {category.map((data) => {
          return (
            <div
              className="card w-[250px] h-[280px]  p-5 mt-12 bg-[#fff]"
              key={data.id}
              id={styles.shadow3}
              onClick={() => {
                    router.push({ pathname: "/allCat", query: {cat_id:data._id} });
                  }}
            >
              <figure>
                <Image
                  width={100}
                  height={100}
                  alt="logo"
                  src={data.image}
                  className="h-[150px] !w-[150px] m-auto"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title m-auto w-fit">{data.name}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllProducts;
