import React, { useEffect, useState, useMemo } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Link from "next/link";
import { Category } from "@/helper/categories";
import { useRouter } from "next/router";
import { Avatar, Badge, Button, Drawer, Input, Modal, Form } from "antd";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { useDispatch, useSelector } from "react-redux";
import { addSearch } from "@/redux/searchSlice";
import Image from "next/image";
import { getAllCart, getOneUerforNav } from "../helper/utilities/apiHelper";
import { get, isEmpty } from "lodash";
import Login from "../pages/Authentication/Register";
import Cookies from "js-cookie";

function Navbar() {
  const { Search } = Input;
  const Quantity = useSelector((state) => state.cart.quantity);
  const userDetails = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart);
  const [search, setSearch] = useState([]);
  const [product, setProduct] = useState([]);
  const [data, setData] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
  const [activeUser, setActiveUser] = useState([]);
  const [drawOpen, setDrawOpen] = useState(false);
  const [profile, setProfile] = useState(false);

  const [form] = Form.useForm();
  const { TextArea } = Input;

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
      const getOneUser = Cookies.get("x-o-t-p") && (await getOneUerforNav());
      setActiveUser(get(getOneUser, "data.message[0]", []));
      setProduct(get(result, "data.message"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cart.products.length, userDetails]);

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
          <div className="relative mx-auto flex items-center  text-gray-600 h-[6vh] xsm:w-[70vw] sm:w-[42vw] ">
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
              className="absolute md:right-[21%] xsm:right-[26%] xl:right-[18%] xsm:top-[8px] xl:top-[16px]  text-slate-500"
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
          className="xsm:mr-[3vw] xl:pr-0 flex items-center justify-center"
        >
          <div className="shadow shadow-slate-400 bg-white p-1  rounded">
            <Link href="/profiles/SideNavbar#2">
              <ShoppingCartCheckoutOutlinedIcon className="xsm:text-[16px] sm:!text-lg " />
            </Link>
          </div>
        </Badge>

        {isEmpty(activeUser) ? (
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
        ) : (
          <Avatar
            style={{
              background: "orange",
              textTransform: "uppercase",
            }}
            size={20}
            className="xsm:!text-[12px]"
            onClick={() => {
              router.push({ pathname: "/profiles/SideNavbar" });
            }}
          >
            {activeUser.firstName?.split("")[0]}
          </Avatar>
        )}
      </div>

      <Modal
        open={login}
        width={1000}
        footer={false}
        onCancel={() => {
          setLogin(false);
        }}
      >
        <Login setLogin={setLogin} />;
      </Modal>

      <Modal
        open={profile}
        footer={false}
        onCancel={() => {
          setProfile(false);
        }}
      >
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl">Personal Information</h1>
          <Form
            form={form}
            size="small"
            layout="vertical"
            // onFinish={handleSubmit}
          >
            <Form.Item
              name="firstName"
              label="Name"
              rules={[{ required: true, message: "Please Enter Your Name" }]}
            >
              <Input placeholder="Enter Your Name" />
            </Form.Item>
            <Form.Item
              name="number"
              label="Mobile Number"
              rules={[
                {
                  required: true,
                  message: "Please Enter Your Mobile Number",
                },
              ]}
            >
              <Input
                placeholder="Enter Your  Mobile number"
                // value={phoneNumber}
              />
            </Form.Item>
            <Form.Item
              name="alternateNumber"
              label={
                <span>
                  Alternate Mobile number{" "}
                  <span className="text-slate-400">(optional)</span>
                </span>
              }
              rules={[{ message: "Please Enter Your Alternate Mobile number" }]}
            >
              <Input placeholder="Enter Your Alternate Mobile number" />
            </Form.Item>
            <Form.Item
              name="email"
              label={
                <span>
                  Email Address
                  <span className="text-slate-400">(optional)</span>
                </span>
              }
              rules={[{ message: "Please Enter Your Email Address" }]}
            >
              <Input placeholder="Enter Your Alternate Mobile number" />
            </Form.Item>
            <Form.Item
              name="address"
              label={<span>Address</span>}
              rules={[{ required: true, message: "Please Enter Your Address" }]}
            >
              <TextArea placeholder="Enter Your Address" />
            </Form.Item>
            <Button htmlType="submit" className="w-[100%] !h-[5vh]">
              <span className="text-black">Save</span>
            </Button>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default Navbar;
