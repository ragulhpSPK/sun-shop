import React from "react";
import { BestDeals } from "@/helper/bestDeals";
import Image from "next/image";
import {
  getAllproducts,
  createCart,
  getAllBanner,
} from "@/helper/utilities/apiHelper";
import { useEffect, useState } from "react";
import { get } from "lodash";
import { useRouter } from "next/router";
import { Spin, notification } from "antd";
import { addproduct } from "@/redux/cartSlice";
import { useDispatch } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";

function Allbestdeals() {
  const [product, setProducts] = useState([]);
  const [banner, setBanner] = useState([]);
  const [bestProducts, setbestProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      setLoading(true);
      const result = [await getAllproducts(), await getAllBanner()];
      setProducts(get(result, "[0].data.data", []));
      setBanner(get(result, "[1].data.data", []));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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
    <Spin
      spinning={loading}
      tip="Loading Data..."
      size="large"
      indicator={antIcon}
    >
      <div className="w-[80vw] m-auto">
        {banner
          .filter((data) => {
            return data.status === "Bestdeals";
          })
          .map((res) => {
            return (
              <>
                <div>
                  <Image
                    src={res.image}
                    alt="bestDeas"
                    width={100}
                    height={100}
                    className="w-[80vw] "
                  />
                </div>
              </>
            );
          })}

        <div className="flex items-center justify-center pt-10 relative">
          <div className="grid xsm:grid-cols-1 xl:grid-cols-4 xxl:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 xsm:gap-10 xl:gap-24 ">
            {bestProducts.map((data) => {
              return (
                <div
                  className="relative xxl:!w-[13vw]  xsm:w-[70vw] sm:w-[40vw]  md:!w-[27vw]  xl:!w-[20vw] flex flex-col justify-between  border bg-[#fff] border-gray-200 m-auto shadow-lg"
                  key={data.id}
                >
                  <div
                    className="flex flex-col"
                    onClick={() =>
                      router.push({
                        pathname: `/product/${data._id}`,
                        query: { id: data._id },
                      })
                    }
                  >
                    <div className="flex justify-between">
                      <Image
                        width={100}
                        height={100}
                        alt="logo"
                        src={data.image[0]}
                        className="xl:h-[18vh] xsm:h-[20vh] md:h-[12vh] lg:h-[16vh] w-fit pt-10 m-auto"
                      />
                      <p className="bg-[--fifth-color] text-[12px] font-semibold text-black  p-[5px] tracking-tight leading-tight absolute top-0 right-0  flex flex-col  text-center">
                        <span>{data.bestOffer}%</span>
                        OFF
                      </p>
                    </div>
                    <p className="text-center text-md pt-[16px] font-medium">
                      {data.title}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <div className="pl-[2vw]  w-[100%] pt-[2vh]">
                      {data.offer !== null || 0 ? (
                        <p className="text-lg text-center flex flex-row-reverse w-[60%] pb-[1vh] font-medium">
                          <s>&#8377;{data.price}</s>
                          &#8377;
                          {Math.round(
                            data.price - (data.price / 100) * data.bestOffer
                          )}
                        </p>
                      ) : (
                        <p className="text-lg text-center  font-medium">
                          {data.price}
                        </p>
                      )}
                    </div>

                    <div
                      className="bg-[--fifth-color] xsm:w-[12vw] h-[5vh] flex items-center justify-center md:w-[6vw] md:h-[4vh] lg:w-[4vw] lg:h-[6vh] xl:w-[3vw] xl:h-[5vh] absolute bottom-0 right-0"
                      onClick={() => {
                        handleCart(data);
                        dispatch(addproduct({ ...data }));
                      }}
                    >
                      <ShoppingCartCheckoutOutlinedIcon />
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
