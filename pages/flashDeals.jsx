import React from "react";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import Image from "next/image";
import { getAllproducts } from "@/helper/utilities/apiHelper";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { get } from "lodash";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function FlashDeals() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true)
    try {
      const result = await getAllproducts();
      setProducts(get(result, "data.data", []));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
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

   const antIcon = (
    <LoadingOutlined style={{ fontSize: 40 }} className="animate-spin" />
  );


  return (
    <Spin  spinning={loading}
          tip="Loading Data..."
          size="large"
          indicator={antIcon}>
      <div className="bg-[--third-color] w-[80vw] m-auto ">
        <div className="text-[6vw] text-white text-center xsm:p-[4vh] xl:p-[7vh]  ">
          <p>
            Flash
            <ElectricBoltIcon
              fontSize="10px duration-3000"
              className=" text-[yellow] "
            />
            Deals
          </p>
        
        </div>
      </div>
      <div className="w-[80vw] m-auto xsm:mt-5 xsm:grid-cols-1 sm:!grid-cols-2 md:!grid-cols-3 xl:!grid-cols-3 grid xxl:!grid-cols-5  xxl:gap-14 ">
        {product.map((data) => {  
          return (
            <>
              <div className="xxl:h-[30vh] sm:w-[40vw] md:w-[25vw]  xl:w-[20vw] flex flex-col xsm:mt-[5vh] justify-between xxl:w-[14vw] border shadow-lg  relative">
                <div onClick={() =>
                    router.push({
                      pathname: `/product/${data._id}`,
                      query: { id: data._id },
                    })
                  }>
                  <Image
                    width={100}
                    height={100}
                    alt="logo"
                    src={data.image[0]}
                    className="xxl:h-[12vh] xsm:h-[20vh] sm:h-[10vh] md:h-[10vh] w-fit m-auto pt-[18px] xl:h-[12vh]"
                  />

                  <p className="flex flex-col absolute top-0 right-0 bg-[--fifth-color] text-sm font-semibold text-black px-2 leading-tight tracking-tight">
                    <span>{data.offer}%</span>OFF
                  </p>
                </div>

                <div onClick={() =>
                    router.push({
                      pathname: `/product/${data._id}`,
                      query: { id: data._id },
                    })
                  }>
                  <p className="text-center xxl:text-md xxl:h-[8vh] md:text-sm  font-bold pt-[8px] p-[10px]">
                    {data.title}
                  </p>
                  <div className="flex justify-between w-[100%]" >
                    <p className="text-center pl-5 pt-3 text-xl m-auto " onClick={() =>
                    router.push({
                      pathname: `/product/${data._id}`,
                      query: { id: data._id },
                    })
                  }>
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
    </Spin>
  );
}

export default FlashDeals;
