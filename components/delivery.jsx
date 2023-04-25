import React from "react";
import { delivery } from "@/helper/delivery";
import styles from "../styles/Home.module.css";
import Image from "next/image";

function Delivery() {
  return (
    <div
      className="flex justify-evenly mt-14  pt-[3vh] w-[80vw] m-auto  text-black "
      id={styles.shadow}
    >
      {delivery.map((data, index) => {
        return (
          <div className="w-40 m-auto " key={index}>
            <div className="pl-5">
              <div
                className={`w-[30%] h-10 flex items-center justify-center  border rounded-2xl hover:scale-125 duration-1000`}
              >
                <Image
                  src={data.image}
                  alt="Icons"
                  className="w-12"
                  width={300}
                  height={300}
                />
              </div>
            </div>

            <div className="pl-3 pt-1 lg:text-[15px] xsm:text-[8px] h-14">
              <p>{data.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Delivery;
