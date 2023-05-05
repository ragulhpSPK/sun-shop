import React from "react";
import { ClockCircleOutlined, CodeSandboxOutlined } from "@ant-design/icons";
import { Button, Timeline, Image } from "antd";
import styles from "../../styles/Home.module.css";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShareLocationRoundedIcon from "@mui/icons-material/ShareLocationRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useRouter } from "next/router";
import { getAllCart, getAllOrder } from "@/helper/utilities/apiHelper";
import { useEffect } from "react";
import { get } from "lodash";

function Orders() {
  const [process, setProcess] = useState(false);
  const [shipped, setShipped] = useState(false);
  const [outDelivery, setOutDelivery] = useState(false);
  const [reach, setReach] = useState(false);
  const [delivered, setDeliverd] = useState(false);
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [routeId, setRouteId] = useState([]);
  const [orders,setOrders]=useState([])

  const fetchData = async () => {
    try {
      const result = await getAllCart();
      setProducts(get(result, "data.message"));
     
    } catch (err) {
      console.log(err);
    }
  };


   


  useEffect(() => {
    fetchData();
   
    var total = 0;
    products.map(data => {
     total+= data.price
   })
    
    setOrders(total)
  
  }, [products]);

  


  useEffect(() => {
    setFilteredProduct(
      products.filter((data) => {
        return data._id === router.query.id.split(",")[1] || router.query.id;
      })
    );
  }, [products]);



  return (
    <div
      className="flex  justify-around mt-[5vh] w-[80vw] p-[5vw] m-auto"
      id={styles.shadow3}
    >
      <Timeline
        mode="left"
        items={[
          {
            children: (
              <h1
                className={`${process ? "opacity-100" : "opacity-40"} !text-xl`}
              >
                Order Processing
              </h1>
            ),
            dot: process ? (
              <CheckIcon style={{ color: "green", fontSize: "30px" }} />
            ) : (
              <RestartAltIcon
                style={{ fontSize: "30px" }}
                className=" text-[--third-color] "
              />
            ),
          },
          {
            children: (
              <h1
                className={`${
                  shipped && process ? "opacity-100" : "opacity-40"
                } !text-xl`}
              >
                Order Shipped
              </h1>
            ),
            color: "green",
            dot:
              shipped && process ? (
                <CheckIcon style={{ color: "green", fontSize: "30px" }} />
              ) : (
                <CodeSandboxOutlined
                  style={{ fontSize: "30px" }}
                  className="text-[--third-color]"
                />
              ),
          },

          {
            color: "red",
            children: (
              <h1
                className={`${
                  shipped && process && outDelivery
                    ? "opacity-100"
                    : "opacity-40"
                } !text-xl`}
              >
                order out for delivery
              </h1>
            ),
            dot:
              shipped && process && outDelivery ? (
                <CheckIcon style={{ color: "green", fontSize: "30px" }} />
              ) : (
                <LocalShippingIcon
                  style={{ fontSize: "30px" }}
                  className="text-[--third-color]"
                />
              ),
          },
          {
            color: "red",
            children: (
              <h1
                className={`${
                  shipped && process && outDelivery && reach
                    ? "opacity-100"
                    : "opacity-40"
                } !text-xl`}
              >
                Order reach nearest to you
              </h1>
            ),
            dot:
              shipped && process && outDelivery && reach ? (
                <CheckIcon style={{ color: "green", fontSize: "30px" }} />
              ) : (
                <ShareLocationRoundedIcon
                  style={{ fontSize: "30px" }}
                  className="text-[--third-color]"
                />
              ),
          },
          {
            children: (
              <h1
                className={`${
                  shipped && process && outDelivery && reach && delivered
                    ? "opacity-100"
                    : "opacity-40"
                } !text-xl`}
              >
                order Delivered
              </h1>
            ),
            dot:
              shipped && process && outDelivery && reach && delivered ? (
                <CheckIcon style={{ color: "green", fontSize: "30px" }} />
              ) : (
                <HomeRoundedIcon
                  style={{ fontSize: "30px" }}
                  className="text-[--third-color]"
                />
              ),
          },
        ]}
      />
      <div className="flex flex-col">
 <div
        className="flex flex-col gap-[15px] h-[50vh] bg-white p-[10px]"
        id={styles.shadow3}
      >
        <h1 className="text-2xl">Purchased Item</h1>
        {/* <div className="grid grid-cols-3">
          {filteredProduct.map((data) => {
            return (
              <>
                <p className="text-2xl text-slate-500">&#8377;{data.price}</p>
              </>
            );
          })}
        </div> */}

        <div className="bg-white  w-[20vw] grid grid-cols-3 gap-4 items-center justify-center">
          {filteredProduct.map((data) => {
            return (
              <>
                <div className="flex flex-col">
                    <Image src={data.image} alt="order" width={100} height={100} />
                  <p className="text-2xl text-slate-500">&#8377;{data.price}</p>
                </div>
              
              </>
            );
          })}
        </div>

        <button className="bg-red-600 !text-white p-[8px] h-[5vh] rounded-md">
          Cancel Order
        </button>
      </div>
      <h1 className="text-2xl ">Total Price:{orders}</h1>
      </div>
     
    </div>
  );
}

export default Orders;
