import React, { useEffect, useState, useMemo } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Divider } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";
import { SubCategory } from "../helper/Subcategory";
import { Category } from "@/helper/categories";
import { useRouter } from "next/router";
import { Button, Input, Modal } from "antd";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { addSearch } from "@/redux/searchSlice";
import Image from "next/image";
import { getAllCart } from "../helper/utilities/apiHelper";
import { get } from "lodash";
import Register from "../pages/Authentication/Register";
import Login from "@/pages/Authentication/Login";

function Navbar() {
  const { Search } = Input;
  const Quantity = useSelector((state) => state.cart.quantity);
  const [search, setSearch] = useState([]);
  const [product, setProduct] = useState([]);
  const [data, setData] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearch(event.target.value);
      router.push({ pathname: `/subcat`, query: data });
    } else if (search.length == 0) {
      router.push({ pathname: "/" });
    }
  };

  const fetchData = async () => {
    try {
      const result = await getAllCart();
      setProduct(get(result, "data.message"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setData(
      Category.filter((data) => {
        return data.category.toLowerCase().includes(search);
      })
    );
  }, [search]);

  return (
    <div>
      <div className="h-24 bg-[white] bg-fixed shadow-md shadow-slate-100 ">
        <div className=" bg-[#943074] text-white flex justify-around ">
          <div className="flex p-1">
            <p className="text-md font-bold text-white">follow us On</p>
            <FacebookIcon className="mr-1" />
            <InstagramIcon className="mr-1" />
          </div>
          <div className="flex p-1 font-bold text-[var(--first-color)]">
            <button
              className="pr-1 text-md font-medium text-white border-none"
              onClick={() => {
                setRegister(!register);
              }}
            >
              Sign Up
            </button>
            <Divider orientation="vertical" color="white" />
            <button
              className="pl-1 text-md font-medium text-white border-none"
              onClick={() => {
                setLogin(!login);
              }}
            >
              Login
            </button>
          </div>
        </div>
        <div className="w-screen flex justify-around items-center h-[60%]">
          <div className="pl-24">
            <Image
              src="/assets/sunn.png"
              className="xl:w-20 xsm:w-14"
              alt="Logo"
              width={300}
              height={300}
            />
          </div>
          <div className="pt-2 relative lg:w-[36vw] xsm:w-[50vw] text-gray-600">
            <div className="pt-2 relative mx-auto  text-gray-600 h-[6vh] w-[42vw] ">
              <input
                className="border-2 border-gray-300 bg-white px-5 pr-16 w-[80%] h-[100%] rounded-lg text-sm focus:outline-none"
                type="search"
                name="search"
                placeholder="Search"
                onChange={(e) => dispatch(addSearch(e.target.value))}
                onKeyUp={handleKeyDown}
              />
              <button
                type="submit"
                className="absolute right-[21%] top-5   text-slate-500"
                onClick={() => {
                  router.push({ pathname: `/subcat`, query: data });
                }}
              >
                <SearchIcon className=" text-slate-700 text-[28px]" />
              </button>
            </div>
          </div>
          <Link href="/cart">
            <div className="xsm:min-w-[20px] lg:w-[37px] relative">
              <Image
                src="/assets/cart2.png"
                className="lg:w-7 xsm:w-[30px]"
                alt="Cart"
                width={300}
                height={300}
              />
              {product.length === 0 ? (
                ""
              ) : (
                <p className="absolute  xsm:float-right   bg-[var(--second-color)] top-[-5px] right-0 xsm:h-[20px] xsm:w-[20px] xsm:text-[12px]  lg:h-5  lg:w-5 text-center lg:text-sm text-white rounded-full">
                  {product.length}
                </p>
              )}
            </div>
          </Link>
          <div className="xsm:hidden lg:block pr-[110px]">
            <p className="lg:text-md text-[var(--first-color)] text-xl lg:font-bold ">
              For Contact:
            </p>
            <p className="text-black font-semi-bold">123-534-8364</p>
          </div>
        </div>
      </div>
      <Modal
        open={register}
        width={1000}
        footer={false}
        onCancel={() => setRegister(!register)}
      >
        <Register />;
      </Modal>
      <Modal
        open={login}
        width={1000}
        footer={false}
        onCancel={() => {
          setLogin(!login);
        }}
      >
        <Login />;
      </Modal>
    </div>
  );
}

export default Navbar;
