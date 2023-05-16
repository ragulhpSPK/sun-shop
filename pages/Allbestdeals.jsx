import React from "react";
import { BestDeals } from "@/helper/bestDeals";
import Image from "next/image";
import { getAllproducts, createCart,getAllBanner } from "@/helper/utilities/apiHelper";
import { useEffect, useState } from "react";
import { get } from "lodash";
import { useRouter } from "next/router";
import { Spin, notification } from "antd";
import { addproduct } from "@/redux/cartSlice";
import { useDispatch } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

function Allbestdeals() {
  const [product, setProducts] = useState([]);
const [banner,setBanner] = useState([]);
  const [bestProducts, setbestProducts] = useState([]);
  const [loading,setLoading] = useState(false)
  const router = useRouter();
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      setLoading(true)
      const result = [await getAllproducts(), await getAllBanner()]
      console.log(result)
      setProducts(get(result, "[0].data.data", []));
      setBanner(get(result,"[1].data.data",[]))
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

   const antIcon = (
    <LoadingOutlined style={{ fontSize: 40 }} className="animate-spin" />
  );

  return (
    <Spin  spinning={loading}
          tip="Loading Data..."
          size="large"
          indicator={antIcon}>
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

      <div className="flex items-center justify-center pt-10 relative">
        <div className="grid xsm:grid-cols-1 xl:grid-cols-4 xxl:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 xsm:gap-10 xl:gap-24 ">
          {bestProducts.map((data) => {
           
            return (
              <div
                className="relative xxl:!w-[13vw] xxl:h-[32vh] xsm:w-[70vw] sm:w-[40vw] sm:h-[36vh] md:!w-[27vw] md:h-[28vh] xl:!w-[20vw] lg:h-[40vh] flex flex-col justify-between xl:h-[36vh] border bg-[#fff] border-gray-200 m-auto shadow-lg"
                key={data.id}
              >
                <div className="flex flex-col" onClick={() =>
                    router.push({
                      pathname: `/product/${data._id}`,
                      query: { id: data._id },
                    })
                  }>
                  <div className="flex justify-between">
                    <Image
                      width={100}
                      height={100}
                      alt="logo"
                      src={data.image[0]}
                      className="xl:h-[18vh] xsm:h-[20vh] md:h-[12vh] lg:h-[16vh] w-fit pt-10 m-auto"
                    />
                    <p className="bg-[--fifth-color] text-sm font-semibold text-black w-14 h-10 absolute top-0 right-0  flex flex-col  text-center">
                      <span>{data.bestOffer}%</span>
                      OFF
                    </p>
                  </div>
                  <p className="text-center text-md pt-[16px] font-medium">
                    {data.title}
                  </p>
                </div>

                <div className="flex justify-between">
                  <div className="pl-[2vw]">
                       {data.offer !== null || 0 ? (
                    <p className="text-lg text-center flex flex-col font-medium">
                      <s>&#8377;{data.price}</s>
                      &#8377;
                      {Math.round(data.price - (data.price / 100) * data.bestOffer)}
                    </p>
                  ) : (
                      <p className="text-lg text-center flex flex-col font-medium">{data.price}</p>
                  )}
                    </div>
                

                  <div
                      className="bg-[--fifth-color] xsm:w-[12vw] h-[5vh] flex items-center justify-center md:w-[6vw] md:h-[4vh] lg:w-[4vw] lg:h-[6vh] xl:w-[3vw] xl:h-[5vh] absolute bottom-0 right-0"
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
    </Spin>
   
  );
}

export default Allbestdeals;
