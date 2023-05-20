import React from "react";
import Profile from "./myaccount";
import Cart from "./cart";
import Order from "./Orders";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import StoreIcon from "@mui/icons-material/Store";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "next/link";
import { Divider } from "antd";
import Cookies from "js-cookie";

function SideNavebar() {
  const [current, setProfileCurrent] = useState(1);

  const sidenavData = [
    {
      id: 1,
      name: "Profile",
      img: <AccountCircleIcon />,
      goto: "/profiles/SideNavbar/#1",
    },
    {
      id: 2,
      name: "Cart",
      img: <ShoppingCartCheckoutIcon />,
      goto: "/profiles/SideNavbar/#2",
    },
    {
      id: 3,
      name: "Orders",
      img: <StoreIcon />,
      goto: "/profiles/SideNavbar/#3",
    },
    {
      id: 4,
      name: "Logout",
      img: <LogoutIcon />,
      goto: "/",
    },
  ];

  const handleLogout = () => {
    Cookies.remove("x-o-t-p");
    dispatch(changeUserValues({ user: [] }));
  };

  return (
    <div className="flex justify-between w-[100vw] flex-row-reverse ">
      <div className="w-[20vw] h-[85vh] flex flex-col gap-y-3  pt-[10vh]  p-10 overflow-y-hidden">
        {sidenavData.map((res, index) => {
          return (
            <div key={index}>
              <div
                onClick={() => {
                  setProfileCurrent(res.id);
                }}
                key={index}
                className={`${
                  current === res.id
                    ? "bg-[--third-color] text-white "
                    : "bg-white"
                } h-[6vh] rounded`}
              >
                <Link
                  href={`${res.goto}`}
                  onClick={() => {
                    res.id === 4 && handleLogout();
                  }}
                >
                  <div className="flex items-center justify-start gap-1 h-[100%]">
                    <div className="p-3">{res.img}</div>
                    <div className="text-xl font-bold ">{res.name}</div>
                  </div>
                </Link>
              </div>
              <hr />
            </div>
          );
        })}
      </div>

      <div className="w-[80vw] h-[90vh]  overflow-y-scroll">
        <div id="1" className="h-[90vh] flex justify-center pt-[10vh]">
          {<Profile />}
        </div>
        <div id="2" className="h-[90vh] flex justify-center ">
          {<Cart />}
        </div>
        <div id="3" className="h-[90vh] flex justify-center pt-[10vh]">
          {<Order />}
        </div>
      </div>
    </div>
    // <div className="flex w-screen ">
    //   <div className=" xsm:w-[30vw] lg:w-[14vw] h-screen bg-red-500  flex flex-col text-xl gap-[2vh]  pt-[5vh]">
    //     <div className="flex flex-col gap-[2vh] ">
    //       <div className="flex justify-between items-center pl-[3vw] !text-[--third-color] font-semibold">
    //         <span className="flex gap-2 items-center">
    //           <AccountCircleIcon className="text-xl !text-[--third-color]" />
    //           Profile
    //         </span>
    //       </div>
    //       <span className="border-b w-[15vw]"></span>
    //       <div className="flex items-center justify-between gap-2 pl-[3vw] !text-[--third-color] font-semibold">
    //         <span className="flex gap-2 items-center">
    //           <ShoppingCartCheckoutIcon className="text-xl !text-[--third-color]" />
    //           Cart
    //         </span>
    //       </div>
    //       <span className="border-b w-[15vw]"></span>
    //       <div className="flex items-center justify-between gap-2 pl-[3vw] !text-[--third-color] font-semibold">
    //         <span className="flex gap-2 items-center ">
    //           <StoreIcon className="text-xl !text-[--third-color]" />
    //           Orders
    //         </span>
    //       </div>
    //       <span className="border-b w-[15vw]"></span>
    //     </div>
    //     <div className="flex items-center justify-between  gap-2 pl-[3vw] !text-[--third-color] font-semibold">
    //       <span className="flex gap-2 items-center">
    //         <LogoutIcon className="text-xl !text-[--third-color]" />
    //         Logout
    //       </span>
    //     </div>

    //     <span className="border-b w-[15vw]"></span>
    //   </div>
    //   <div>
    //     <div id="1">
    //       <Profile />
    //     </div>
    //     <div id="2">
    //       <Cart />
    //     </div>
    //     <div id="3">
    //       <Order />
    //     </div>
    //   </div>
    // </div>
  );
}

export default SideNavebar;
