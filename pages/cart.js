import React, { useEffect } from "react";
import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import styles from "../styles/form.module.css";
import { useRouter } from "next/router";
import { Button, InputNumber, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  getAllCart,
  deleteCart,
  updateCart,
} from "../helper/utilities/apiHelper";
import { get } from "lodash";
import Navbar from "@/components/Navbar";

function Cart() {
  const [check, setCheck] = useState(false);
  const [Qty, setQty] = useState(1);
  const [price, setPrice] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [product, setProdut] = useState();
  const [deleteId, setDeleteId] = useState();
  const [length, setLength] = useState();

  const fetchData = async () => {
    try {
      const result = await getAllCart();

      setProdut(get(result, "data.message"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (data) => {
    // console.log(deleteId);

    try {
      await deleteCart(data);
      fetchData();
      notification.success({ message: "cart deleted successfully" });
    } catch {
      notification.error({ message: "Something went wrong" });
    }
  };

  const handleChange = async (data, e) => {
    console.log("sdfiudhf", e);
    try {
      const formData = {
        quantity: e,
        id: data,
      };
      await updateCart(formData);
      fetchData();
      notification.success({ message: "cart updated successfully" });
    } catch (err) {
      notification.error({ message: "Something went wrong" });
    }
  };

  var prices = 0;
  product &&
    product.map((data) => {
      prices += data.quantity * data.total;
      console.log(prices);
    });

  return (
    <div className="flex relative">
      <div className="flex">
        <div className="pt-10">
          {product && product.length > 0 ? (
            <div className="overflow-x-auto w-[70vw]">
              {product &&
                product.map((data) => {
                  return (
                    <table
                      className={`table w-[60vw] border m-auto  mt-10
						}`}
                      key={data._id}
                    >
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Name</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Delete</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td className="border-r">
                            <Image
                              width={100}
                              height={100}
                              alt="logo"
                              src={data.image}
                              className="w-20"
                            />
                          </td>

                          <td className="border-r">{data.name}</td>
                          <td className="border-r">
                            <div className="flex justify-center items-center">
                              <InputNumber
                                min={1}
                                max={5}
                                defaultValue={data.quantity}
                                onChange={(e) => {
                                  // setQty(e);
                                  handleChange(data._id, e);
                                }}
                                className="w-14"
                              />
                            </div>
                          </td>

                          <td className="border-r">
                            Rs:{data.quantity * data.total}
                          </td>

                          <td>
                            <Button
                              onClick={() => {
                                // setDeleteId(data._id);
                                deleteHandler(data._id);
                              }}
                              className="!text-black hover:scale-90 duration-1000 hover:!text-bold"
                              type="text"
                            >
                              Remove
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  );
                })}
            </div>
          ) : (
            <div className="w-[70vw] flex  flex-col-reverse pt-10 relative ">
              <Image
                width={100}
                height={100}
                alt="logo"
                src="/assets/No_Product_Found.png"
                className="text-center m-auto w-[20vw] animate-pulse absolute top-[5vh] left-[30vw]"
              ></Image>
            </div>
          )}
        </div>
        <div
          className={`mt-14 w-[15vw] h-[30vh] text-white ${
            check ? "hidden" : "block"
          } `}
        >
          <div className=" bg-black/90 h-[100%] text-xl pl-5 mt-20 flex flex-col justify-evenly rounded-md">
            <p>Total Price:{prices}</p>

            <p>Total Products:{product && product.length}</p>
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
