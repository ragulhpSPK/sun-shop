/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ListIcon from "@mui/icons-material/List";
import { Category } from "@/helper/categories";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useState } from "react";
import { useEffect } from "react";
import {
  DownOutlined,
  LoadingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  Card,
  Dropdown,
  Image,
  List,
  Select,
  Space,
  Typography,
  notification,
  Drawer,
} from "antd";
import { SubCategory } from "@/helper/Subcategory";
import "rc-menu/assets/index.css";
import {
  getAllCatagory,
  getAllSubCatagory,
  getAllproducts,
  createCart,
  getAllCart,
} from "../helper/utilities/apiHelper";
import { get, isEmpty } from "lodash";
import { useRouter } from "next/router";
import Link from "next/link";
import { Spin } from "antd";
import SyncIcon from "@mui/icons-material/Sync";
import { useDispatch } from "react-redux";
import { addproduct } from "@/redux/cartSlice";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

function AllCat() {
  const [active, setActive] = useState("");
  const [id, setId] = useState();
  const [more, setMore] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [filerProduct, setFilerProduct] = useState([]);
  const [dummy, activateDummy] = useState();
  const [priceDummy, setPriceDummy] = useState(false);
  const router = useRouter();
  const { Meta } = Card;
  const [priceval, setPriceVal] = useState([]);
  const [loading, setLoading] = useState([]);
  const [cart, setCart] = useState([]);
  const [productId, setProductId] = useState("");
  const [allProducts, setAllProducts] = useState(false);
  const [catDrawer, setCatDrawer] = useState(false);
  const [filDrawer, setFilDrawer] = useState(false);
  const [priceFilter, setPriceFilter] = useState();
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = [
        await getAllCatagory(),
        await getAllSubCatagory(),
        await getAllproducts(),
        await getAllCart(),
      ];
      setCategory(get(result, "[0].data.data", []));
      setSubCategory(get(result, "[1].data.data", []));
      setProducts(get(result, "[2].data.data", []));
      setCart(get(result, "[3].data.message", []));
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
    if (
      get(router, "query.cat_id", "") &&
      get(router, "query.subcat_id", "") &&
      get(router, "query.price", "")
    ) {
      setFilerProduct(
        products
          .filter((product) => {
            return (
              product.categoryId === router.query.cat_id &&
              product.SubCategoryId === router.query.subcat_id
            );
          })
          .sort((a, b) => {
            return get(router, "query.price", "") === "high"
              ? b.price - a.price
              : a.price - b.price;
          })
      );
    } else if (
      get(router, "query.cat_id", "") &&
      get(router, "query.price", "")
    ) {
      setFilerProduct(
        products
          .filter((product) => {
            return product.categoryId === router.query.cat_id;
          })
          .sort((a, b) => {
            return get(router, "query.price", "") === "high"
              ? b.price - a.price
              : a.price - b.price;
          })
      );
    } else if (
      get(router, "query._id", "") === "123" &&
      get(router, "query.price", "")
    ) {
      console.log("trigger");
      setFilerProduct(
        products
          .map((product) => {
            return product;
          })
          .sort((a, b) => {
            return get(router, "query.price", "") === "high"
              ? b.price - a.price
              : a.price - b.price;
          })
      );
    } else if (
      get(router, "query.cat_id", "") &&
      get(router, "query.subcat_id", "")
    ) {
      setFilerProduct(
        products.filter((product) => {
          return (
            product.categoryId === router.query.cat_id &&
            product.SubCategoryId === router.query.subcat_id
          );
        })
      );
      setPriceFilter();
    } else if (get(router, "query.cat_id", "")) {
      setFilerProduct(
        products.filter((product) => {
          return product.categoryId === router.query.cat_id;
        })
      );
      setPriceFilter();
    } else if (get(router, "query._id", "") === "123") {
      setFilerProduct(
        products.map((product) => {
          return product;
        })
      );
      setPriceFilter();
    }
    setId(router.query.cat_id);
  }, [
    get(router, "query.cat_id", ""),
    get(router, "query.subcat_id", ""),
    get(router, "query.price", ""),
    products,
  ]);

  const handleFilter = (catIt) => {
    try {
      setId(catIt);
      router.push({
        pathname: "/allCat",
        query: { cat_id: catIt },
      });
      activateDummy();
    } catch (e) {
      console.log(e);
    }
    setPriceDummy(false);
  };

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
      notification.success({ message: "product add to cart successfully" });
    } catch (err) {
      notification.error({ message: "something went wrong" });
    }

    dispatch(addproduct({ ...data }));
  };

  const handleSubCategoryFilterChange = (id) => {
    try {
      router.push({
        pathname: "/allCat",
        query: { cat_id: router.query.cat_id, subcat_id: id },
      });
      activateDummy(id);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePriceChange = (e) => {
    try {
      setPriceFilter(e);
      setId(router.query.cat_id);
      if (router.query._id === "123") {
        router.push({
          pathname: "/allCat",
          query: {
            _id: 123,

            price: e,
          },
        });
      } else {
        router.push({
          pathname: "/allCat",
          query: {
            cat_id: router.query.cat_id,
            price: e,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const antIcon = (
    <SyncIcon style={{ fontSize: 40 }} className="animate-spin" />
  );

  const allProductsHandler = () => {
    router.push({ pathname: "/allCat", query: { _id: 123 } });
  };

  return (
    <Spin
      spinning={loading}
      size="large"
      tip="Loading data..."
      indicator={antIcon}
    >
      <div
        className={`${
          loading === true ? "invisible" : "visible"
        } xsm:hidden xxl:block`}
      >
        <div className="flex">
          <div className="w-[16vw]  h-[90vh] overflow-scroll pl-20 leading-10 ">
            <Link href="/products">
              <div className="flex items-center font-bold pt-10">
                <span>
                  <ListIcon />
                </span>
                <p>All Categories</p>
              </div>
            </Link>
            {category.map((data) => {
              return (
                <>
                  <div
                    className="flex flex-col font-normal text-lg leading-10"
                    key={data._id}
                  >
                    <div>
                      <div
                        onClick={() => {
                          handleFilter(data._id);
                        }}
                      >
                        <div
                          className={`${
                            data._id === id
                              ? "text-[--second-color] font-bold"
                              : "text-black"
                          } cursor-pointer flex space-x-10`}
                        >
                          <div className="flex items-center w-[16vw]">
                            <ArrowRightIcon
                              className={`${
                                data._id === id ? "visible" : "invisible"
                              }`}
                            />
                            {data.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="flex flex-col w-[80vw] m-auto ">
            <div className="ml-10 mt-2 h-[8vh] flex justify-center items-center bg-white  ">
              <div className="flex gap-[5vw] pb-5">
                <div className="pt-[15px]">
                  <Select
                    className="!w-[28vw]  shadow-inner rouned-lg"
                    size="large"
                    showSearch
                    filterOption={(input, option) =>
                      (option?.value ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    value={dummy}
                    placeholder="Filter by Sub Category"
                    onChange={(e) => {
                      handleSubCategoryFilterChange(e);
                    }}
                  >
                    {subCategory
                      ?.filter((res) => {
                        return res.categoryId === router.query.cat_id;
                      })
                      .map((pre, index) => {
                        return (
                          <Select.Option key={index} value={pre._id}>
                            {pre.subcategoryname}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </div>

                <div className="pt-[15px]">
                  <Select
                    className="!w-[20vw]  shadow-inner  rounded-md"
                    size="large"
                    placeholder="Filter by price"
                    value={priceFilter}
                    onChange={(e) => {
                      handlePriceChange(e);
                    }}
                  >
                    <Select.Option value={`low`}>Low to High</Select.Option>
                    <Select.Option value={`high`}>High to Low</Select.Option>
                  </Select>
                </div>
              </div>
            </div>
            <div className="h-[90vh] overflow-y-scroll">
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 3,
                  lg: 4,
                  xl: 4,
                  xxl: 5,
                }}
                pagination={{
                  pageSize: 20,
                  align: "end",
                  position: "top",
                  size: "small",
                }}
                className=" !w-[80vw]"
                dataSource={priceval.length > 0 ? priceval : filerProduct}
                renderItem={(data, index) => {
                  return (
                    <List.Item key={index}>
                      <div className="">
                        <Card
                          hoverable
                          style={{
                            width: 295,
                            height: 340,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            border: "none",
                          }}
                          className="shadow-md"
                          actions={[
                            <div
                              key={"key"}
                              className="bg-[--third-color] rounded-sm ml-[15px] text-[20px] h-[5vh] w-[10vw] text-white flex items-center justify-center !border-none"
                              onClick={() => {
                                router.push({
                                  pathname: "/cart",
                                  query: { _id: data._id },
                                });
                              }}
                            >
                              Buy Now
                            </div>,
                            <div
                              key={"key"}
                              className="bg-[--third-color] h-[5vh] w-[3vw] mr-[15px] text-white flex items-center justify-center rounded-sm float-right"
                            >
                              {cart.find((res) => {
                                return res.productId === data._id;
                              }) ? (
                                <button
                                  className="text-white text-[14px] rounded-md"
                                  onClick={() =>
                                    router.push({ pathname: "/cart" })
                                  }
                                >
                                  Go to Cart
                                </button>
                              ) : (
                                <ShoppingCartOutlined
                                  style={{
                                    fontSize: "25px",
                                  }}
                                  onClick={() => {
                                    handleClick(data._id, data);
                                    setProductId(data._id);
                                  }}
                                />
                              )}
                            </div>,
                          ]}
                        >
                          <div
                            onClick={() =>
                              router.push({
                                pathname: `/product/${data._id}`,
                                query: { id: data._id },
                              })
                            }
                            className="flex flex-col items-center "
                          >
                            <Image
                              alt="example"
                              src={data.image[0]}
                              width={140}
                              height={140}
                              preview={false}
                              // style={{
                              //   marginLeft: "50px",
                              // }}
                            />
                            <h1 className="text-[16px] h-[7vh]">
                              {data.title}
                            </h1>

                            <h1 className="text-[16px] !mt-[5px] font-bold ">
                              &#8377;{data.price}
                            </h1>
                          </div>
                        </Card>
                      </div>
                    </List.Item>
                  );
                }}
              ></List>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-[5vh]">
        <div className="xxl:hidden flex h-[4vh] w-[90vw] m-auto p-[10px] items-center  text-black justify-between">
          <p
            className="text-[12px] flex items-end justify-center"
            onClick={() => {
              setCatDrawer(!catDrawer);
            }}
          >
            <span>
              <ListIcon style={{ fontSize: "20px", textAlign: "center" }} />
            </span>
            {router.query._id === "123"
              ? "All products"
              : get(
                  category.filter((data) => {
                    return data._id == id;
                  })[0],
                  "name"
                )}
          </p>
          {console.log(router.query.price, router.query.subcat_id)}
          <p
            className={`text-[12px]  flex items-end justify-center ${
              router.query.price || router.query.subcat_id
                ? "text-[--third-color] font-bold"
                : "text-black"
            }`}
            onClick={() => {
              setFilDrawer(!filDrawer);
            }}
          >
            <span>
              <FilterAltOutlinedIcon style={{ fontSize: "18px" }} />
            </span>
            Filters
          </p>

          <Drawer
            title="Basic Drawer"
            placement="left"
            onClose={() => {
              setCatDrawer(false);
            }}
            open={catDrawer}
            width={200}
          >
            <div>
              <div className="flex items-center ">
                <p
                  onClick={allProductsHandler}
                  className={`${
                    router.query._id === "123"
                      ? "text-[--second-color] font-bold"
                      : "text-black"
                  } cursor-pointer flex space-x-8`}
                >
                  <ArrowRightIcon
                    className={`${
                      router.query._id === "123" ? "visible" : "invisible"
                    } text-[--second-color] pb-[3px] !text-2xl`}
                  />
                  All Products
                </p>
              </div>

              {category.map((data) => {
                return (
                  <>
                    <div
                      className="flex flex-col font-normal text-md leading-8"
                      key={data._id}
                    >
                      <div>
                        <div
                          onClick={() => {
                            handleFilter(data._id);
                          }}
                        >
                          <div
                            className={`${
                              data._id === id
                                ? "text-[--second-color] font-bold"
                                : "text-black"
                            } cursor-pointer flex space-x-10`}
                          >
                            <div className="flex items-center w-[100%]">
                              <ArrowRightIcon
                                className={`${
                                  data._id === id ? "visible" : "invisible"
                                }`}
                              />

                              {data.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </Drawer>

          <Drawer
            title="Basic Drawer"
            placement="right"
            onClose={() => {
              setFilDrawer(false);
            }}
            open={filDrawer}
            width={200}
          >
            <div className="flex flex-col ">
              <div>
                <h1 className="text-md text-slate-500">
                  Select product Brands
                </h1>
                <Select
                  className="!w-[48vw]  shadow-inner rouned-lg"
                  size="large"
                  showSearch
                  filterOption={(input, option) =>
                    (option?.value ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  value={dummy}
                  placeholder="Filter by Sub Category"
                  onChange={(e) => {
                    handleSubCategoryFilterChange(e);
                  }}
                >
                  {subCategory
                    ?.filter((res) => {
                      return res.categoryId === router.query.cat_id;
                    })
                    .map((pre, index) => {
                      return (
                        <Select.Option key={index} value={pre._id}>
                          {pre.subcategoryname}
                        </Select.Option>
                      );
                    })}
                </Select>
              </div>
              <div className="pt-[4vh]">
                <h1 className="text-md text-slate-500">Filter By Price</h1>
                <Select
                  className="!w-[48vw]   shadow-inner  rounded-md"
                  size="large"
                  placeholder="Filter by price"
                  value={priceFilter}
                  onChange={(e) => {
                    handlePriceChange(e);
                  }}
                >
                  <Select.Option value={`low`}>Low to High</Select.Option>
                  <Select.Option value={`high`}>High to Low</Select.Option>
                </Select>
              </div>
            </div>
          </Drawer>
        </div>
        <div className=" overflow-y-scroll flex  justify-center ">
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 4,
              xxl: 5,
            }}
            pagination={{
              pageSize: 20,
              align: "end",
              position: "top",
              size: "small",
            }}
            className=" !w-[90vw] "
            dataSource={priceval.length > 0 ? priceval : filerProduct}
            renderItem={(data, index) => {
              return (
                <List.Item
                  key={index}
                  className="flex items-center justify-center"
                >
                  <Card
                    hoverable
                    style={{
                      width: 265,
                      height: 310,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      backgroundColor: "white",
                      alignSelf: "center",
                      margin: "auto",
                      border: "none",
                      marginTop: "30px",
                    }}
                    className="!shadow-lg"
                    actions={[
                      <div
                        key={"key"}
                        className="bg-[--third-color] rounded-sm  text-[14px] h-[5vh] w-[25vw] text-white flex items-center justify-center !border-none"
                        onClick={() => {
                          router.push({
                            pathname: "/cart",
                            query: { _id: data._id },
                          });
                        }}
                      >
                        Buy Now
                      </div>,
                      <div
                        key={"key"}
                        className="bg-[--third-color] h-[5vh]  w-[15vw]  text-white flex items-center justify-center rounded-sm float-right"
                      >
                        {cart.find((res) => {
                          return res.productId === data._id;
                        }) ? (
                          <button
                            className="text-white text-[12px] rounded-md"
                            onClick={() => router.push({ pathname: "/cart" })}
                          >
                            Go to Cart
                          </button>
                        ) : (
                          <ShoppingCartOutlined
                            style={{
                              fontSize: "20px",
                            }}
                            onClick={() => {
                              handleClick(data._id, data);
                              setProductId(data._id);
                            }}
                          />
                        )}
                      </div>,
                    ]}
                  >
                    <div
                      onClick={() =>
                        router.push({
                          pathname: `/product/${data._id}`,
                          query: { id: data._id },
                        })
                      }
                      className="flex flex-col items-center "
                    >
                      <Image
                        alt="example"
                        src={data.image[0]}
                        width={70}
                        height={70}
                        preview={false}
                        className="!h-[8vh] w-fit"
                      />
                      <h1 className="text-[14px] h-[10vh] pt-[2vh]">
                        {data.title}
                      </h1>

                      <h1 className="text-[16px] !mt-[5px] font-bold ">
                        &#8377;{data.price}
                      </h1>
                    </div>
                  </Card>
                </List.Item>
              );
            }}
          ></List>
        </div>
      </div>
    </Spin>
  );
}

export default AllCat;
