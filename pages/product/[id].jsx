/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import React from "react";
import styles from "../../styles/zoom.module.css";
import { useDispatch } from "react-redux";
import { addproduct } from "@/redux/cartSlice";
import { useRouter } from "next/router";
import { AddCart } from "@/helper/Addcart";
import Link from "next/link";
import style from "../../styles/Home.module.css";
import Image from "next/image";
import {
  createCart,
  getAllproducts,
  getAllCart,
} from "../../helper/utilities/apiHelper";
import { Spin, notification } from "antd";
import { get } from "lodash";
import { ReloadOutlined } from "@ant-design/icons";

export default function App() {
  const [current, setCurrentImage] = useState();
  const router = useRouter();
  const [imgs, setImgs] = useState([]);
  const [product, setProduct] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const result = AddCart.filter((data) => {
    return data.product_id == router.query.id;
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = [await getAllproducts(), await getAllCart()];
      setProduct(get(result, "[0].data.data", []));
      setCart(get(result, "[1].data.message", []));
      setLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [router.query.id]);

  useEffect(() => {
    setFilterData(
      product.filter((data) => {
        return data._id === router.query.id;
      })
    );
  }, [product, router.query.id]);

  useEffect(() => {
    filterData.map((img, i) => {
      setImgs(img.image[0]);
    });
  }, [filterData]);

  const handleClick = async (data) => {
    try {
      const formData = {
        data: {
          productId: data._id,
          image: filterData[0].image,
          name: filterData[0].title,
          total: filterData[0].price,
          quantity: 1,
          price: filterData[0].price,
        },
      };

      await createCart(formData);
      notification.success({ message: "cart added successfully" });
    } catch (err) {
      notification.error({ message: "something went wrong" });
    }
  };

  const AntIcon = (
    <ReloadOutlined style={{ fontSize: 40 }} className="animate-spin" />
  );

  return (
    <Spin
      spinning={loading}
      tip="loading data..."
      size="large"
      indicator={AntIcon}
    >
      <div
        className={`${
          loading ? "invisible" : "visible"
        } flex lg:h-[80vh] justify-center xsm:w-[100vw] lg:[80vw]`}
      >
        <div className="xsm:flex-col flex lg:!flex-row !pt-[12vh]">
          <div className={`${styles.container} lg:pt-[15vh]`}>
            <div className={`${styles.left} md:h-[40vh] lg:!h-[50vh]`}>
              <div
                className={`${styles.left_2} flex items-center justify-center md:h-[30vh] lg:pl-[8vw] lg:!h-[20vh]`}
              >
                <Image
                  width={300}
                  height={300}
                  alt="logo"
                  src={current || imgs}
                  className="xsm:w-[50vw] sm:w-[50vw] lg:w-fit lg:!h-[40vh] md:h-[30vh] flex items-center justify-center xsm:pb-[2vh] lg:ml-[6vw]"
                />
              </div>
              <div className={`${styles.left_1} `}>
                {result &&
                  filterData.map((img) => {
                    return img.image.map((image, i) => {
                      return (
                        <>
                          <div className="xl:pt-[5vh]  xsm:pl-[3vw] sm:!pl-[5vw] lg:!pl-[3vw] lg:!pt-[13vh]  flex items-center justify-center">
                            <div
                              className={
                                current && current.includes(image)
                                  ? "border-4 border-[--third-color] "
                                  : "border-none "
                              }
                              id={styles.img_wrap}
                              key={i}
                              onMouseEnter={() => {
                                setCurrentImage(image);
                              }}
                            >
                              <Image
                                width={200}
                                height={300}
                                alt="logo"
                                src={image}
                                className="xl:w-40 "
                              />
                            </div>
                          </div>
                        </>
                      );
                    });
                  })}
              </div>
            </div>
          </div>
          <div className="xsm:pt-[3vh] lg:pt-0 xl:pt-[8vh] xxl:pt-[1vh] flex items-center justify-center">
            {result &&
              filterData.map((data, index) => {
                return (
                  <div className="xsm:pl-[2vw]" key={index}>
                    <h1 className="xl:text-xl  font-semibold xsm:text-md">
                      {data.title}
                    </h1>

                    {data.flashStatus == true ? (
                      <div>
                        <span>
                          <s>&#8377;{data.price}</s>-
                          <p className="font-bold text-sm text-red-500">
                            -{data.offer}% Off
                          </p>
                        </span>

                        {data.offer !== null || 0 ? (
                          <p className="text-xl text-slate-800 pt-1">
                            &#8377;
                            {Math.round(
                              data.price - (data.price / 100) * data.offer
                            )}
                          </p>
                        ) : (
                          <p className="text-xl text-slate-800 pt-1">
                            &#8377;{data.price}
                          </p>
                        )}
                      </div>
                    ) : data.bestStatus === true ? (
                      <div>
                        <s>&#8377;{data.price}</s>{" "}
                        <p className="font-bold text-sm text-red-500">
                          -{data.bestOffer}% Off
                        </p>
                        {data.bestOffer !== null || 0 ? (
                          <p className="text-xl text-slate-800 pt-1">
                            &#8377;
                            {Math.round(
                              data.price - (data.price / 100) * data.bestOffer
                            )}
                          </p>
                        ) : (
                          <p className="text-xl text-slate-800 pt-1">
                            &#8377;{data.price}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-xl text-slate-800 pt-1">
                        &#8377;{data.price}
                      </p>
                    )}

                    <h2 className="xl:text-2xl pt-5 font-bold xsm:text-xl">
                      Product Specifications
                    </h2>

                    {data.highlight.split(",").map((res, index) => {
                      return (
                        <li
                          className="xl:text-xl xsm:text-[12px] pt-2 xsm:self-start xsm:pl-[2vw] sm:self-center sm:w-[50vw]"
                          key={index}
                        >
                          {res}.
                        </li>
                      );
                    })}
                    <div className="pt-10 flex lg:gap-5 xsm:pl-0  justify-around xsm:w-[80vw] sm:pr-[8vw] sm:w-[40vw] xl:!pl-0">
                      {cart.find((res) => {
                        return res.productId === data._id;
                      }) ? (
                        <button
                          className="bg-slate-300 text-[#000] shadow-2xl hover:bg-[--second-color] hover:scale-105 hover:font-medium hover:text-white duration-1000 text-sm rounded-md px-3 lg:h-[6vh] xl:h-[5vh] w-[8vw] py-2"
                          onClick={() => {
                            router.push({ pathname: "/cart" });
                          }}
                        >
                          Go to Cart
                        </button>
                      ) : (
                        <button
                          className="bg-[var(--second-color)] text-[#fff] hover:bg-[--first-color] hover:scale-105 hover:font-medium hover:text-black duration-1000 xl:text-xl rounded-md lg:h-[6vh] px-3 xl:h-[5vh] xl:w-[10vw] xl:py-[8px] xsm:h-[4vh]"
                          onClick={() => {
                            handleClick(data);
                            dispatch(addproduct({ products: true }));
                            {
                              console.log(data);
                            }
                          }}
                        >
                          Add to Cart
                        </button>
                      )}

                      <button
                        className="bg-[var(--second-color)] hover:bg-[--first-color] hover:scale-105  hover:text-black duration-1000 hover:font-medium text-[#fff] xl:text-xl rounded-md lg:h-[6vh] xl:h-[5vh] xl:w-[8vw]  xl:px-3 xl:py-2 xsm:h-[4vh] xsm:w-[25vw] sm:w-[12vw]"
                        onClick={() => {
                          router.push({
                            pathname: "/buy",
                            query: { _id: data._id },
                          });
                        }}
                      >
                        Buy Now
                      </button>
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
