import React, { useEffect } from "react";
import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import styles from "../styles/form.module.css";
import { useRouter } from "next/router";
import { InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";

function Cart() {
  const [check, setCheck] = useState(false);
  const [Qty, setQty] = useState(1);
  const [price, setPrice] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  return (
    <div className="flex relative">
      <div className="flex">
        <div className="pt-10">
          {cart.products.length > 0 ? (
            <div className="overflow-x-auto w-[70vw]">
              {cart.products.map((res) => {
                return res.result.map((data) => {
                  return (
                    <table
                      className={`table w-[60vw] border m-auto  mt-10
						}`}
                      key={data.id}
                    >
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Name</th>
                          <th>Quantity</th>
                          <th>Price</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td className="border-r">
                            <img src={data.image[0]} className="w-20" />
                          </td>

                          <td className="border-r">{data.producttitle}</td>
                          <td className="border-r">
                            <div className="flex justify-center items-center">
                              <InputNumber
                                min={1}
                                max={5}
                                defaultValue={1}
                                onChange={(e) => setQty(e)}
                                className="w-14"
                              />
                            </div>
                          </td>
                          {useEffect(() => {
                            setPrice(data.price);
                          })}

                          <td className="border-r">Rs:{Qty * data.price}</td>
                        </tr>
                      </tbody>
                    </table>
                  );
                });
              })}
            </div>
          ) : (
            <div className="w-[70vw] flex  flex-col-reverse pt-10 relative ">
              <img
                src="/assets/No_Product_Found.png"
                className="text-center m-auto w-[20vw] animate-pulse absolute top-[5vh] left-[30vw]"
              ></img>
            </div>
          )}
        </div>
        <div
          className={`mt-14 w-[20vw] h-[40vh] text-white ${
            check ? "hidden" : "block"
          } `}
        >
          <div className=" bg-black/90 h-[100%] text-xl pl-5 mt-20 flex flex-col justify-evenly rounded-md">
            <p>Total Price:{cart.total}</p>
            <p>Total Discount:0</p>
            <p>Total Quantity:{cart.quantity}</p>

            <button
              className="bg-[var(--third-color)] w-[8vw] h-[5vh] text-[18px] hover:bg-[--fifth-color] duration-1000 scale-110 text-white rounded-sm hover:text-black font-medium"
              onClick={() => setCheck(true)}
            >
              Cash On Delivery
            </button>
          </div>
        </div>

        <div
          className={`min-h-[50vh] w-[25vw] relative right-10 top-10 shadow-2xl pl-10 ${
            check ? "block" : "hidden"
          }`}
        >
          <section className={styles.section_form}>
            <form
              id={styles.consultation_form}
              className={styles.feed_form}
              action="#"
            >
              <h1 className="text-2xl py-3">Enter Your Delivery Location</h1>
              <input required="" placeholder="Name" type="text" />
              <input name="phone" required="" placeholder="Phone number 1" />
              <input name="phone" required="" placeholder="Phone number 2" />
              <textarea
                name="message"
                required=""
                placeholder="Address"
                type="email"
                rows={10}
                cols={7}
              />
              <button className={styles.button_submit}>CheckOut</button>
              <CloseOutlined
                className="text-black absolute top-0 right-0 pr-2"
                color=""
                onClick={() => setCheck(false)}
              />
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Cart;
