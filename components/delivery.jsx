import React from "react";
import { delivery } from "@/helper/delivery";
import styles from "../styles/Home.module.css";
import Image from "next/image";

function Delivery() {
  return (
    <div
      className="flex justify-evenly items-center  mt-6 xsm:h-[6vh] sm:h-[8vh] md:h-[10vh]  lg:h-[16vh]   xxl:pt-0 xsm:w-[90vw] lg:w-[80vw] m-auto  text-black "
      id={styles.shadow}
    >
      {delivery.map((data, index) => {
        return (
          <div className="xl:w-50 m-auto " key={index}>
            <div className="flex  flex-col items-center justify-center">
              <div
                className={`   flex items-center justify-center  border rounded-2xl hover:scale-125 duration-1000`}
              >
                <Image
                  src={data.image}
                  alt="Icons"
                  className="xsm:h-[1.5vh] xsm:!w-fit md:!h-[2vh] xl:!h-[3vh]"
                  width={300}
                  height={300}
                />
              </div>
               <div className=" lg:pt-1  lg:text-[15px] xl:!text-xl  xsm:!text-[8px] md:text-[10px] xsm:h-[2vh]">
              <p>{data.desc}</p>
            </div>
            </div>

           
          </div>
        );
      })}
    </div>
  );
}

export default Delivery;
