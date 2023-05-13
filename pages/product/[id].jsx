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
  const [addcart, setAddCart] = useState();
  const [current, setCurrentImage] = useState();
  const router = useRouter();
  const [imgs, setImgs] = useState([]);
  const [product, setProduct] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartID, setCartID] = useState([]);
  const dispatch = useDispatch();
  const [loading,setLoading]=useState(true)

  const result = AddCart.filter((data) => {
    return data.product_id == router.query.id;
  });

  const fetchData = async () => {
    try {
      setLoading(true)
      const result = [await getAllproducts(), await getAllCart()];
  
      setProduct(get(result, "[0].data.data", []));
      setCart(get(result, "[1].data.message", []));
      setLoading(false)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    setCartID(
      cart.filter((data) => {
        return data.productId === router.query.id;
      })
    );
  }, [router.query.id]);

  useEffect(() => {
    setFilterData(
      product.filter((data) => {
        return data._id === router.query.id;
      })
    );


  }, [product, router.query.id]);

  

  useEffect(() => {
    filterData.map((img) => setImgs(img.image[0]));
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

  const AntIcon=(<ReloadOutlined style={{ fontSize: 40 }} className="animate-spin" />)

  return (
    // <Spin loading={false} tip="loading data..." size="large"  indicator={AntIcon}>
 <div
        className={`xl:h-[80vh] xl:w-[80vw] xsm:flex-col xl:flex xsm:w-[100vw]  xl:flex-row justify-center  xl:m-auto xl:mt-10 ${loading===true?"invisible":"visible"}`}
      id={style.shadow3}
    >
      <div className={`${styles.container} xl:w-[30vw] xl:m-auto`}>
        <div className={styles.left}>
          <div className={`${styles.left_2} xl:pl-[8vw]`}>
            <Image
              width={350}
              height={100}
              alt="logo"
              src={current || imgs}
              className="xl:h-[34vh] xl:!w-fit xsm:h-[20vh] xsm:m-auto xsm:w-fit xsm:pt-[3vh]"
            />
          </div>
          <div className={styles.left_1}>
            {result &&
              filterData.map((img) => {
                return img.image.map((image, i) => {
                  
                  return (
                    <>
                      <div className="xl:pt-[5vh]">
                        <div
                          className={
                         image.includes(imgs)
                              ? "border-4 border-[--third-color]"
                              : "border-none"
                          }
                          id={styles.img_wrap}
                          key={i}
                          onMouseEnter={() => setCurrentImage(image)}
                        >
                          <Image
                            width={100}
                            height={100}
                            alt="logo"
                            src={image}
                            className="xl:w-40"
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
      {result &&
        filterData.map((data, index) => {
          return (
            <div className="xl:pt-32 xl:w-[60vw] xl:pl-28 xsm:p-[8px] flex flex-col xsm:items-center xl:items-start" key={index}>
              <h1 className="xl:text-xl font-semibold xsm:text-md">{data.title}</h1>
              <p className="text-xl text-slate-800 pt-1">Rs:{data.price}</p>
              <h2 className="xl:text-2xl pt-5 font-bold xsm:text-xl">
                Product Specifications
              </h2>
         
              {data.highlight.split(",").map((res, index) => {
                return (
                  <li className="xl:text-xl xsm:text-[12px] pt-2 xsm:self-start xsm:pl-[2vw] sm:self-center sm:w-[50vw]" key={index}>
                    {res}.
                  </li>
                );
              })}

              <div className="pt-10 flex lg:gap-5 xsm:pl-0  justify-around xsm:w-[80vw] sm:pr-[8vw] sm:w-[40vw] xl:!pl-0">
              
                {cartID[0]&&cartID[0].productId === data._id ? (
                  <button
                    className="bg-slate-300 text-[#000] shadow-2xl hover:bg-[--second-color] hover:scale-105 hover:font-medium hover:text-white duration-1000 text-xl rounded-md px-3 h-[5vh] w-[8vw] py-2"
                    onClick={() => {
                      router.push({ pathname: "/cart" });
                    }}
                  >
                    Go to Cart
                  </button>
                ) : (
                  <button
                    className="bg-[var(--second-color)] text-[#fff] hover:bg-[--first-color] hover:scale-105 hover:font-medium hover:text-black duration-1000 xl:text-xl rounded-md px-3 xl:h-[5vh] xl:w-[10vw] xl:py-[8px] xsm:h-[4vh]"
                    onClick={() => {
                      handleClick(data);
                      dispatch(addproduct({ ...filterData }));
                    }}
                  >
                    Add to Cart
                  </button>
                )}

                <button
                  className="bg-[var(--second-color)] hover:bg-[--first-color] hover:scale-105  hover:text-black duration-1000 hover:font-medium text-[#fff] xl:text-xl rounded-md xl:h-[5vh] xl:w-[8vw]  xl:px-3 xl:py-2 xsm:h-[4vh] xsm:w-[25vw] sm:w-[12vw]"
                  onClick={() => {
                    router.push({
                      pathname: "/cart",
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
    // </Spin>
   
  );
}
