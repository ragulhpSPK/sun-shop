import React from "react";
import { delivery } from "@/helper/delivery";
import styles from "../styles/Home.module.css";
import Image from "next/image";

function Delivery() {
  return (
    <div
      className="flex justify-evenly items-center mt-6 xsm:h-[6vh] sm:h-[8vh] md:h-[10vh] lg:h-[16vh] xsm:pt-[1vh] lg:pt-[3vh] xsm:w-[90vw] lg:w-[80vw] m-auto  text-black "
      id={styles.shadow}
    >
      {delivery.map((data, index) => {
        return (
          <div className="xl:w-50 m-auto " key={index}>
            <div className="flex  flex-col items-center justify-center">
              <div
                className={`xsm:!h-[2vh] md:!h-[3vh] xl:!h-[4vh] xsm:w-fit xl:w-[3vw]  flex items-center justify-center  border rounded-2xl hover:scale-125 duration-1000`}
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
