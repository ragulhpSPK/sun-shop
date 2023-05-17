import React, { useEffect, useState, useMemo } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Divider } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";
import { SubCategory } from "../helper/Subcategory";
import { Category } from "@/helper/categories";
import { useRouter } from "next/router";
import { Badge, Button, Input, Modal } from "antd";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { useDispatch } from "react-redux";
import { addSearch } from "@/redux/searchSlice";
import Image from "next/image";
import { getAllCart } from "../helper/utilities/apiHelper";
import { get } from "lodash";
import Login from "../pages/Authentication/Register";
// import Login from "@/pages/Authentication/Login";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

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

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    fetchData();
  }, [cart.products.length]);

  useEffect(() => {
    setData(
      Category.filter((data) => {
        return data.category.toLowerCase().includes(search);
      })
    );
  }, [search]);

  return (
    <div>
      <div
        className={`h-[10vh] xsm:w-[98vw] xl:w-screen flex flex-row  items-center justify-around  ${
          router.pathname.split("/").includes("allCat")
            ? "!shadow-none"
            : "shadow shadow-slate-100 bg-[white]"
        }`}
      >
        <div className="sm:pl-24">
          <Image
            src="/assets/sunn.png"
            className="xl:w-20 xsm:w-14"
            alt="Logo"
            width={300}
            height={300}
          />
        </div>
        <div className=" relative lg:w-[36vw] xsm:w-[60vw] text-gray-600">
          <div className=" relative mx-auto  text-gray-600 h-[5vh] xsm:w-[70vw] sm:w-[42vw] ">
            <input
              className="rounded-lg shadow  bg-white ml-[2vw] px-5 pr-16 xsm:w-[75%] md:w-[80%] xsm:h-[90%] sm:h-[100%] text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
              onChange={(e) => dispatch(addSearch(e.target.value))}
              onKeyUp={handleKeyDown}
            />
            <button
              type="submit"
              className="absolute md:right-[21%] xsm:right-[26%] xsm:top-[8px] xl:top-[10px]  text-slate-500"
              onClick={() => {
                router.push({ pathname: `/subcat`, query: data });
              }}
            >
              <SearchIcon className=" text-slate-700 text-[20px]" />
            </button>
          </div>
        </div>

        <div className="xsm:hidden lg:block pr-[110px] ">
          <div className="flex flex-row gap-x-2">
            <div className="group shadow shadow-slate-400 bg-white p-2  rounded hover:font-semibold cursor-pointer flex flex-row items-center gap-x-2">
              <FacebookIcon className="group-hover:text-[#1673eb] text-[16px]" />
            </div>
            <div className="group shadow shadow-slate-400 bg-white p-2  rounded  hover:font-semibold cursor-pointer flex flex-row items-center gap-x-2">
              <InstagramIcon className="group-hover:text-[#f40873] text-[16px]" />
            </div>
            <div className="group shadow shadow-slate-400 bg-white p-2  rounded  hover:font-semibold cursor-pointer flex flex-row items-center gap-x-2">
              <TwitterIcon className="group-hover:text-[#1c96e8] text-[16px]" />
            </div>
            <div className="group  shadow shadow-slate-400 bg-white p-2  rounded hover:font-semibold cursor-pointer flex flex-row items-center gap-x-2">
              <WhatsAppIcon className="group-hover:text-[#1ad03f] text-[16px]" />
            </div>
            <div className="group shadow shadow-slate-400 bg-white p-2  rounded  hover:font-semibold cursor-pointer flex flex-row items-center gap-x-2">
              <LocalPhoneOutlinedIcon className="group-hover:text-[#d02f1a] text-[16px]" />
            </div>
          </div>
        </div>
        <Badge
          count={get(product, "length", "")}
          size="small"
          color="#943074"
          className="pr-[2vw] xl:pr-0"
        >
          <div className="shadow shadow-slate-400 bg-white p-1  rounded">
            <Link href="/cart">
              <ShoppingCartCheckoutOutlinedIcon className="xsm:text-[16px] xl:!text-lg " />
            </Link>
          </div>
        </Badge>
        <div className="bg-white shadow shadow-slate-300 rounded p-2 xl:h-[4vh] xl:w-[5vw] xsm:w-[15vw] xsm:h-[3vh] sm:w-[8vw] flex items-center  justify-center">
          <button
            className="pl-1 xsm:text-[10px]  sm:text-md flex gap-x-1 items-center font-medium text-[--second-color] border-none lg:text-lg"
            onClick={() => {
              setLogin(!login);
            }}
          >
            <h1 className="font-bold tracking-wider">Login</h1>
          </button>
        </div>
      </div>

      <Modal open={login} width={1000} footer={false}>
        <Login />;
      </Modal>
    </div>
  );
}

export default Navbar;
