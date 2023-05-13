import React from "react";
import { BestDeals } from "@/helper/bestDeals";
import Image from "next/image";
import { getAllproducts, createCart,getAllBanner } from "@/helper/utilities/apiHelper";
import { useEffect, useState } from "react";
import { get } from "lodash";
import { useRouter } from "next/router";
import { notification } from "antd";
import { addproduct } from "@/redux/cartSlice";
import { useDispatch } from "react-redux";

function Allbestdeals() {
  const [product, setProducts] = useState([]);
const [banner,setBanner] = useState([]);
  const [bestProducts, setbestProducts] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const result = [await getAllproducts(), await getAllBanner()]
      console.log(result)
      setProducts(get(result, "[0].data.data", []));
      setBanner(get(result,"[1].data.data",[]))
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setbestProducts(
      product.filter((data) => {
        return data.bestStatus === true;
      })
    );
  }, [product]);

  

  const handleCart = async (data) => {
    try {
      const formData = {
        data: {
          productId: data._id,
          image: data.image,
          name: data.title,
          price: data.price,
          total: data.price,
          quantity: 1,
        },
      };
      await createCart(formData);
      fetchData();
      notification.success({ message: "added to cart successfully" });
    } catch (err) {
      notification.error({ message: "something went wrong" });
    }
  };

  return (
    <div className="w-[80vw] m-auto">
      {/* <div className="bg-[url('/assets/bg-8.jpg')] flex flex-col bg-cover backdrop-blur-md bg-white/30  h-[40vh] w-[80vw] m-auto  shadow-xl shadow-black/30">
        <div className=" flex justify-evenly items-center pt-10">
          <h1 className="text-6xl text-white w-[500px] pl-[6vw]">
            Daily Best Deals
          </h1>
          <Image
            width={700}
            height={500}
            alt="logo"
            src="/assets/bestdeals2.png"
            className="mt-[-40px] ml-[-7vw]"
          />
          <p className="text-5xl text-white w-[300px]">Upto 50% Offers</p>
        </div>
        <div>
          <p className="text-[28px] text-white w-[80vw] text-center mt-[-40px]">
            Unbeatable daily deals on top-rated products,with discounts upto 30%
            offer...
          </p>
        </div>
      </div> */}
      {banner.filter(data => {
        return data.status==="Bestdeals"
      }).map(res => {
        return (
          <>
            <div>
              <Image src={res.image} alt="bestDeas" width={100} height={100} className="w-[80vw] "/>
             </div>
          </>
         
        )
      })}

      <div className="flex items-center justify-center pt-10">
        <div className="grid xsm:grid-cols-1 xl:grid-cols-4 xxl:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 xsm:gap-10 xl:gap-24 ">
          {bestProducts.map((data) => {
            return (
              <div
                className="relative xxl:!w-[13vw] xxl:h-[32vh] xsm:w-[70vw] sm:w-[40vw] sm:h-[36vh] md:!w-[25vw] md:h-[36vh] xl:!w-[20vw] flex flex-col justify-between xl:h-[35vh] border bg-[#fff] border-gray-200 m-auto shadow-lg"
                key={data.id}
              >
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <Image
                      width={100}
                      height={100}
                      alt="logo"
                      src={data.image[0]}
                      className="xl:h-[18vh] xsm:h-[20vh] md:h-[15vh] w-fit pt-10 m-auto"
                    />
                    <p className="bg-[--fifth-color] text-sm font-semibold text-black w-14 h-10 absolute top-0 right-0  flex flex-col  text-center">
                      <span>{data.offer}%</span>
                      OFF
                    </p>
                  </div>
                  <p className="text-center text-md pt-[16px] font-medium">
                    {data.title}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-center text-lg font-medium pt-[8px] !m-auto ">
                   &#8377;{data.price}
                  </p>

                  <div
                    className="bg-[--fifth-color] p-[10px] px-[12px]"
                    onClick={() => {
                      handleCart(data);
                      dispatch(addproduct({ ...data }));
                    }}
                  >
                    <Image
                      width={100}
                      height={100}
                      alt="logo"
                      src="/assets/cart2.png"
                      className="w-6 m-auto pt-1"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Allbestdeals;
