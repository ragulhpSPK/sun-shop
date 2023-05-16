import React from "react";

import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import Image from "next/image";

function FlashDeals() {
  return (
    <div>
      <div className="bg-[--third-color] w-[90vw] m-auto h-[35vh]">
        <div className="text-[8vw] text-white text-center pt-10  ">
          <p>
            Flash
            <ElectricBoltIcon
              fontSize="10px duration-3000"
              className=" text-[yellow] "
            />
            Deals
          </p>
          {/* <TypeAnimation
            sequence={[
              "Flash", // Types 'One'
              1000, // Waits 1s
              "", // Deletes 'One' and types 'Two'
              2000, // Waits 2s
              "<ElectricBoltIcon />",
              "Deals", // Types 'Three' without deleting 'Two'
              () => {
                console.log("Sequence completed"); // Place optional callbacks anywhere in the array
              },
            ]}
          /> */}
        </div>
      </div>
      <div className="w-[90vw] m-auto mt-10 grid grid-cols-5 gap-28">
        <div className="h-fit w-[11vw] border shadow-lg  relative">
          <Image
            width={100}
            height={100}
            alt="logo"
            src="/assets/watch2.png"
            className="w-40 m-auto"
          />
          <div>
            <p className="text-center text-lg">Boat Blutooth Watch P1433</p>
            <div className="flex justify-between w-[100%]">
              <p className="text-center pl-5 pt-3 text-xl">Rs:3000</p>
              <div className="pt-3">
                <button className="w-20 bg-[--third-color] h-8 text-white">
                  Buy now
                </button>
              </div>
            </div>
          </div>
          <p className="flex flex-col absolute top-0 right-0 bg-[--fifth-color] text-sm font-semibold text-black px-3">
            <span>56%</span>OFF
          </p>
        </div>
        <div className="h-fit w-[11vw] border shadow-lg  relative">
          <Image
            width={100}
            height={100}
            alt="logo"
            src="/assets/watch2.png"
            className="w-40 m-auto"
          />
          <div>
            <p className="text-center text-lg">Boat Blutooth Watch P1433</p>
            <div className="flex justify-between w-[100%]">
              <p className="text-center pl-5 pt-3 text-xl">Rs:3000</p>
              <div className="pt-3">
                <button className="w-20 bg-[--third-color] h-8 text-white">
                  Buy now
                </button>
              </div>
            </div>
          </div>
          <p className="flex flex-col absolute top-0 text-sm font-semibold text-black right-0 bg-[--fifth-color] px-3">
            <span>56%</span>OFF
          </p>
        </div>
        <div className="h-fit w-[11vw] border shadow-lg  relative">
          <Image
            width={100}
            height={100}
            alt="logo"
            src="/assets/watch2.png"
            className="w-40 m-auto"
          />
          <div>
            <p className="text-center text-lg">Boat Blutooth Watch P1433</p>
            <div className="flex justify-between w-[100%]">
              <p className="text-center pl-5 pt-3 text-xl">Rs:3000</p>
              <div className="pt-3">
                <button className="w-20 bg-[--third-color] h-8 text-white">
                  Buy now
                </button>
              </div>
            </div>
          </div>
          <p className="flex flex-col absolute text-sm font-semibold text-black top-0 right-0 bg-[--fifth-color] px-3">
            <span>56%</span>OFF
          </p>
        </div>
        <div className="h-fit w-[11vw] border shadow-lg  relative">
          <Image
            width={100}
            height={100}
            alt="logo"
            src="/assets/watch2.png"
            className="w-40 m-auto"
          />
          <div>
            <p className="text-center text-lg">Boat Blutooth Watch P1433</p>
            <div className="flex justify-between w-[100%]">
              <p className="text-center pl-5 pt-3 text-xl">Rs:3000</p>
              <div className="pt-3">
                <button className="w-20 bg-[--third-color] h-8 text-white">
                  Buy now
                </button>
              </div>
            </div>
          </div>
          <p className="flex flex-col text-sm font-semibold text-black absolute top-0 right-0 bg-[--fifth-color] px-3">
            <span>56%</span>OFF
          </p>
        </div>
        <div className="h-fit w-[11vw] border shadow-lg  relative">
          <Image
            width={100}
            height={100}
            alt="logo"
            src="/assets/watch2.png"
            className="w-40 m-auto"
          />
          <div>
            <p className="text-center text-lg">Boat Blutooth Watch P1433</p>
            <div className="flex justify-between w-[100%]">
              <p className="text-center pl-5 pt-3 text-xl">Rs:3000</p>
              <div className="pt-3">
                <button className="w-20 bg-[--third-color] h-8 text-white">
                  Buy now
                </button>
              </div>
            </div>
          </div>
          <p className="flex flex-col absolute text-sm font-semibold text-black top-0 right-0 bg-[--fifth-color] px-3">
            <span>56%</span>OFF
          </p>
        </div>
      </div>
    </div>
  );
}

export default FlashDeals;
