import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cat } from "@/helper/product";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Image from "next/image";

function ProductFilter() {
  const [produts, setProduts] = useState([""]);
  const search = useSelector((state) => state.search);
  // const [searches, setSearches] = useState([search.searches]);
  const router = useRouter();

  useEffect(() => {
    setProduts(
      Cat.filter((data) => {
        return (
          data.name
            .toLowerCase()
            .includes(search.searches.toString().toLowerCase()) ||
          data.catname
            .toLowerCase()
            .includes(search.searches.toString().toLowerCase())
        );
      })
    );
  }, [search]);

  return (
    <div className="w-[80vw] m-auto mt-20">
      {produts.length > 0 ? (
        <div
          className={`${
            search.length === 0 ? "hidden" : "block"
          } grid grid-cols-5 gap-3 w-[80vw] m-auto`}
        >
          {produts.map((data) => {
            return (
              <div
                className="card w-[13vw] h-[35vh] bg-base-100 shadow-xl pt-10"
                id={styles.shadow3}
                onClick={() => {
                  router.push({ pathname: `product/${data.id}`, query: data });
                }}
                key={data.id}
              >
                <figure className="h-[18vh]">
                  <Image
                    src={data.image}
                    alt="Shoes"
                    className="w-[8vw] h-[100%] m-auto"
                    width={300}
                    height={300}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{data.name}</h2>
                  <p>{data.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-[70vw] flex  flex-col-reverse pt-10 relative ">
          <Image
            src="/assets/searchempty2.gif"
            className="text-center m-auto w-[25vw] animate-pulse absolute top-[2vh] left-[22vw]"
            alt="not found"
            width={300}
            height={300}
          ></Image>
          <p className="text-xl text-slate-400 top-[3vh]  absolute left-[26vw]">
            No products matches your search
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductFilter;
