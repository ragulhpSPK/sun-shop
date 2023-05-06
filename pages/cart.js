import React, { useEffect } from "react";
import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import styles from "../styles/form.module.css";
import { useRouter } from "next/router";
import { Button, InputNumber, Select, Table, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  getAllCart,
  deleteCart,
  updateCart,
  createOrder,
  getAllOrder,
  getAllproducts,
} from "../helper/utilities/apiHelper";
import { get } from "lodash";
import Navbar from "@/components/Navbar";
// import { v4 as uuidv4 } from "uuid";
// import { parse as uuidParse } from "uuid";
import { v1 as uuidv1 } from "uuid";

function Cart() {
  const [check, setCheck] = useState(false);
  const [Qty, setQty] = useState(1);
  const [bqty, setBqty] = useState(1);

  const [UID, setUID] = useState("");

  const router = useRouter();
  const [price, setPrice] = useState(router.query.price);
  const [product, setProdut] = useState();
  const [deleteId, setDeleteId] = useState();
  const [Buy, setBuy] = useState(false);
  const [inputs, setInputs] = useState({});
  const [order, setOrder] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const [id, setId] = useState([]);
  const [buyId, setBuyId] = useState("");
  uuidv1();

  const handleCheck = () => {
    setBuy(false);

    var today = new Date();
    const v1options = {
      node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
      clockseq: 0x1234,
      time: today.toLocaleTimeString({
        hour: "numeric",
        hour12: true,
        minute: "numeric",
      }),
      seconds: today.getSeconds(),
      date:
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate(),
    };

    const res = uuidv1(v1options);
    setUID(res);
  };

  const fetchData = async () => {
    try {
      const result = [await getAllCart(), await getAllproducts()];

      setProdut(get(result, "[0].data.message"));
      setAllProducts(get(result, "[1].data.data"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    if (Object.keys(router.query).length > 0) {
      setBuy(true);
    }

    setPrice(bqty * router.query.price);
  }, [router.query, bqty]);

  useEffect(() => {
    setId(
      product &&
        product.map((data) => {
          return data._id;
        })
    );
  }, [product]);

  const deleteHandler = async (data) => {
    try {
      await deleteCart(data);
      fetchData();
      notification.success({ message: "cart deleted successfully" });
    } catch {
      notification.error({ message: "Something went wrong" });
    }
  };

  const handleChange = async (data, e) => {
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
    });

  const handleChangevalue = (v, event) => {
    console.log(v);
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Buy === false ? setBuy(true) : Buy === true ? setBuy(false) : "";
    try {
      const formData = {
        data: {
          orderId: UID,
          customer: inputs.name,
          productname: !Buy
            ? product.map((data) => {
                return data.name + data.name;
              })
            : allProducts.filter((data) => {
                return data._id === router.query._id;
              })[0].title,
          cartId: !Buy
            ? product.map((data) => {
                return data._id;
              })
            : allProducts.filter((data) => {
                return data._id === router.query._id;
              })[0]._id,
          image: !Buy
            ? product.map((data) => {
                return data.image;
              })
            : allProducts.filter((data) => {
                return data._id === router.query._id;
              })[0].image[0],
          address: inputs.message,
          total: !Buy ? prices : price,
          status: "pending",
          price: !Buy
            ? product.map((data) => {
                return data.price;
              })
            : allProducts.filter((data) => {
                return data._id === router.query._id;
              })[0].price,
        },
      };
      await createOrder(formData);
      notification.success({ message: "order placed successfully" });
    } catch (err) {
      notification.failure({ message: "something went wrong" });
    }
  };

  // console.log(
  //   allProducts.filter((data) => {
  //     return data._id === router.query._id;
  //   })[0].price
  // );

  const BuyId = allProducts
    .filter((data) => {
      return data._id === router.query._id;
    })
    .map((res) => {
      return res._id;
    });

  console.log(Buy);

  return (
    <div>
      {!Buy ? (
        <div className="flex relative min-h-screen">
          <div className="flex">
            <div className="pt-10">
              {product && product.length > 0 ? (
                <div className="overflow-x-auto w-[70vw]">
                  {product &&
                    product.map((data) => {
                      return (
                        <table
                          className={`table w-[60vw] border-2 h-[20vh] text-slate-700 border-slate-200 m-auto  mt-10
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
                              <td className="border-r border-slate-200 !w-[10vw]">
                                <Image
                                  width={100}
                                  height={100}
                                  alt="logo"
                                  src={data.image[0]}
                                  className="w-20"
                                />
                              </td>

                              <td className="border-slate-200 border-r w-[40vw]">
                                <p className="w-[40vw]">{data.name}</p>
                              </td>
                              <td className="border-slate-200 border-r w-[8vw]">
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

                              <td className="border-slate-200 border-r w-[8vw]">
                                Rs:{data.quantity * data.total}
                              </td>

                              <td className="w-[8vw]">
                                <button
                                  onClick={() => {
                                    // setDeleteId(data._id);
                                    deleteHandler(data._id);
                                  }}
                                  className="!text-black text-sm hover:scale-95 h-[4vh] w-[5vw] rounded-md duration-1000 hover:!text-bold  hover:bg-[--third-color] hover:!text-white hover:shadow-inner hover:text-lg"
                                  type="text"
                                >
                                  Remove
                                </button>
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
              className={`mt-14 w-[18vw] h-[35vh] text-white ${
                check ? "hidden" : "block"
              } `}
            >
              <div className=" bg-white h-[100%] text-[20px] uppercase border shadow-md text-slate-700 pl-5 mt-6 flex flex-col justify-evenly rounded-md">
                <h1 className="font-bold text-slate-600">Order Summary</h1>
                <p>Total Price:{prices}</p>

                <p>Total Products:{product && product.length}</p>
                <button
                  className="bg-[var(--third-color)] w-[8vw] h-[5vh] text-[18px] tracking-widest hover:bg-[--fifth-color] duration-1000 scale-110 text-white rounded-sm hover:text-black font-medium"
                  onClick={() => setCheck(true)}
                >
                  CheckOut
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-between w-[85vw]">
          {allProducts
            .filter((data) => {
              return data._id === router.query._id;
            })
            .map((res) => {
              return (
                <>
                  <table
                    className={`table w-[60vw] border m-auto  mt-10`}
                    key={res._id}
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
                        <td>
                          <Image
                            src={res.image[0]}
                            alt="not found"
                            width={70}
                            height={50}
                          />
                        </td>

                        <td>{res.title}</td>
                        <td>
                          <div className="flex justify-center items-center">
                            <InputNumber
                              min={1}
                              max={5}
                              defaultValue={1}
                              onChange={(e) => {
                                setBqty(e);
                                // handleChange(data._id, e);
                              }}
                              className="w-14"
                            />
                          </div>
                        </td>

                        <td>{res.price}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="h-[80vh]">
                    <div className={`${check ? "hidden" : "block"} pt-10 `}>
                      <div className="h-[15vh] w-[10vw] bg-black/90 flex flex-col items-center justify-around">
                        <p className="text-xl text-[#fff]">
                          Total Price:{bqty * res.price}
                        </p>
                        <button
                          className="text-xl text-[#fff] bg-[--third-color] px-3 py-2 rounded-md hover:bg-[--second-color]"
                          onClick={() => {
                            setCheck(true);
                          }}
                        >
                          CheckOut
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      )}

      <div className="bg-[#fff]">
        <div
          className={`min-h-[50vh] w-[25vw] absolute z-50  right-10 top-28 shadow-2xl pl-10 ${
            check ? "block" : "hidden"
          }`}
        >
          <section className={styles.section_form}>
            <form
              id={styles.consultation_form}
              className={styles.feed_form}
              onSubmit={handleSubmit}
            >
              <h1 className="text-2xl py-3">Enter Your Delivery Location</h1>
              <input
                required=""
                placeholder="Name"
                name="name"
                type="text"
                onChange={handleChangevalue}
              />
              <input
                name="phone1"
                required=""
                placeholder="Phone number 1"
                onChange={handleChangevalue}
              />
              <input
                name="phone2"
                required=""
                placeholder="Phone number 2"
                onChange={handleChangevalue}
              />
              <textarea
                name="message"
                required=""
                placeholder="Address"
                type="email"
                rows={10}
                cols={7}
                onChange={handleChangevalue}
              />

              <Select
                placeholder="Select Payment"
                size="large"
                className="!h-[5vh]"
                onSelect={(v, e) => {
                  handleChange(v, e);
                }}
              >
                <Select.Option>Cash On Delivery</Select.Option>
              </Select>
              {!Buy ? (
                <button
                  className={styles.button_submit}
                  onClick={() => {
                    handleCheck();
                    setBuy(false);

                    router.push({
                      pathname: `orders/${id}`,
                      query: id,
                    });
                  }}
                >
                  CheckOut
                </button>
              ) : (
                <button
                  className={styles.button_submit}
                  onClick={() => {
                    handleCheck();
                    setBuy(false);

                    router.push({
                      pathname: `orders/${BuyId}`,
                      query: BuyId,
                    });
                  }}
                >
                  CheckOut
                </button>
              )}

              <CloseOutlined
                className="text-black absolute top-0 right-0 pr-2"
                color=""
                onClick={() => {
                  setCheck(false);
                }}
              />
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Cart;
