/* eslint-disable react-hooks/exhaustive-deps */
import { TopProducts } from "@/helper/topProducts";
import Image from "next/image";
import React from "react";
import {
  getAllproducts,
  createCart,
  getAllCart,
} from "@/helper/utilities/apiHelper";
import { get } from "lodash";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { notification } from "antd";
import { addproduct } from "@/redux/cartSlice";
import { useDispatch } from "react-redux";

function Topproducts({setLoading}) {
  const [products, setProducts] = useState([]);
  // const [topProducts,setTopProducts] = useState([])
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();

  const router = useRouter();

  const fetchData = async () => {
    try {
      setLoading(true)
      const result = [await getAllproducts(), await getAllCart()];
      setProducts(get(result, "[0].data.data"));
      setCart(get(result, "[1].data.message"));
      setLoading(false)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = async (id, data) => {
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
    } catch (err) {}
  };

  let topProducts = products.filter((data) => {
    return data.status === true;
  });

  return (
    <div className="xsm:w-[90vw] lg:w-[80vw] m-auto pt-10">
      <div className="text-xl">
        <h1 className="bg-[var(--second-color)] py-3 px-2 text-white">
          Top Products
        </h1>
      </div>
      <div className="grid xsm:grid-cols-2 md:grid-cols-3 md:gap-[2vw] lg:grid-cols-4 xxl:grid-cols-5 items-center justify-center  xl:gap-[2vw] ">
        {topProducts.map((data) => {
          return (
            <div
              className=" l
              lg:w-[18vw] xl:w-[16vw]  border shadow-lg relative mt-5 xsm:w-[43vw] xsm:h-[25vh] md:w-[28vw] md:h-[28vh]"
              key={data._id}
            >
              <div>
                <div
                  className=" xsm:h-[14vh] flex items-center justify-center"
                  onClick={() =>
                    router.push({
                      pathname: `/product/${data._id}`,
                      query: { id: data._id },
                    })
                  }
                >
                  <Image
                    width={50}
                    height={100}
                    alt="logo"
                    src={data.image[0]}
                    className="lg:!w-fit  lg:!h-[12vh]"
                  />
                </div>

                <div className="lg:h-[5vh] ">
                  <h1 className="text-center xsm:text-[8px] lg:text-[12px] font-bold xl:p-[3px]">
                    {data.title}
                  </h1>
                  <p className="text-center xsm:text-[12px]">Rs:{data.price}</p>
                </div>
                {cart.find((res) => {
                  return res.productId === data._id;
                }) ? (
                  <div className="bg-[var(--fifth-color)] xsm:!w-[30px] xl:h-[35px] xl:!w-[45px] xsm:h-[25px] lg:w-[55px] lg:h-[35px] absolute right-0 bottom-0 xsm:text-[8px] lg:text-xs text-black text-center font-bold" onClick={()=>{router.push({pathname:"/cart"})}}>
                    Go to Cart
                  </div>
                ) : (
                  <div
                    className="bg-[var(--fifth-color)] xsm:!w-[30px] xsm:h-[25px] lg:w-[55px] lg:h-[35px]  xl:h-[35px] xl:!w-[45px] absolute right-0 bottom-0"
                    onClick={() => {
                      handleClick(data._id, data);
                      dispatch(addproduct({ ...data }));
                    }}
                  >
                    <Image
                      width={100}
                      height={100}
                      alt="logo"
                      src="/assets/cart2.png"
                      className="lg:w-5 lg:pt-2 xsm:w-4 m-auto pt-1"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Topproducts;
