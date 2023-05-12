import React from "react";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import Image from "next/image";
import { getAllproducts } from "@/helper/utilities/apiHelper";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { get } from "lodash";

function FlashDeals() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [product, setProducts] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const result = await getAllproducts();
      setProducts(get(result, "data.data", []));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      product.filter((data) => {
        return data.flashStatus === true;
      })
    );
  }, [product]);

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
        {product.map((data) => {
         
          return (
            <>
              <div className="h-[30vh] flex flex-col justify-between w-[14vw] border shadow-lg  relative">
                <div>
                  <Image
                    width={100}
                    height={100}
                    alt="logo"
                    src={data.image[0]}
                    className="h-[14vh] m-auto pt-[18px]"
                  />

                  <p className="flex flex-col absolute top-0 right-0 bg-[--fifth-color] text-sm font-semibold text-black px-3">
                    <span>{data.offer}%</span>OFF
                  </p>
                </div>

                <div>
                  <p className="text-center text-md h-[8vh]  font-bold pt-[8px] p-[10px]">
                    {data.title}
                  </p>
                  <div className="flex justify-between w-[100%]">
                    <p className="text-center pl-5 pt-3 text-xl m-auto ">
                      &#8377;{data.price}
                    </p>
                    <div className="pt-3">
                      <button
                        className="w-20 bg-[--third-color] h-8 text-white"
                        onClick={() => {
                          router.push({
                            pathname: "/cart",
                            query: { _id: data._id },
                          });
                        }}
                      >
                        Buy now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default FlashDeals;
