import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Link from "next/link";
import { useRouter } from "next/router";

function Footer() {
  const router=useRouter()
  return (
    <div className={`h-[40vh] w-[100vw] mt-40`}>
      <div className="grid xsm:grid-cols-2 lg:grid-cols-4 xsm:gap-x-[20px] xsm:gap-y-[20px] lg:gap-x-48 w-[80vw]  m-auto border-b border-gray-400 pb-5">
        <div className="flex flex-col gap-2 xsm:text-[12px] lg:text-md font-medium">
          <h1 className="lg:text-2xl xsm:text-xl font-semibold pb-2">Customer Service</h1>
          <p className="hover:text-[--third-color] hover:font-semibold">
            Help Center
          </p>
          <p className="hover:text-[--third-color] hover:font-semibold">
            Payment Methods
          </p>
          <p className="hover:text-[--third-color] hover:font-semibold">
            Free Shipping
          </p>
          <p className="hover:text-[--third-color] hover:font-semibold">
            Return & Refund
          </p>
          <p className="hover:text-[--third-color] hover:font-semibold">
            Sun Guarantee
          </p>
          <p className="hover:text-[--third-color] hover:font-semibold">
            OverSeas Products
          </p>
          <p className="hover:text-[--third-color] hover:font-semibold">
            Contact Us
          </p>
        </div>
        <div className="flex flex-col gap-2 text-md font-medium">
          <h1 className="lg:text-2xl xsm:text-xl font-semibold pb-2">About Sun</h1>
          <Link href="/footers/About">
            <p className="hover:text-[--third-color] hover:font-semibold">
              About Us
            </p>
          </Link>

          <p className="hover:text-[--third-color] hover:font-semibold">
            Sun Blog
          </p>
          <p className="hover:text-[--third-color] hover:font-semibold">
            Sun Careeres
          </p>
          <p className="hover:text-[--third-color] hover:font-semibold">
            Sun policy
          </p>
          <p className="hover:text-[--third-color] hover:font-semibold">
            Sun Mall
          </p>
          <p className="hover:text-[--third-color] hover:font-semibold">
            Seller Center
          </p>
          <p className="hover:text-[--third-color] hover:font-semibold">
            Flash Deals
          </p>
        </div>
        <div className="flex flex-col gap-2 text-md font-medium">
          <h1 className="lg:text-2xl xsm:text-xl font-semibold pb-2">Follow Us </h1>
          <div className="group hover:font-semibold cursor-pointer flex flex-row items-center gap-x-2">
            <FacebookIcon className="group-hover:text-[#1673eb] " />
            <h1 className="text-md">Facebook</h1>
          </div>
          <div className="group hover:font-semibold cursor-pointer flex flex-row items-center gap-x-2">
            <InstagramIcon className="group-hover:text-[#f40873] " />
            <h1 className="text-md">Instagram</h1>
          </div>
          <div className="group hover:font-semibold cursor-pointer flex flex-row items-center gap-x-2">
            <TwitterIcon className="group-hover:text-[#1c96e8] " />
            <h1 className="text-md">Twitter</h1>
          </div>
          <div className="group hover:font-semibold cursor-pointer flex flex-row items-center gap-x-2">
            <WhatsAppIcon className="group-hover:text-[#1ad03f] " />
            <h1 className="text-md">Whatsapp</h1>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-md font-medium">
          <h1 className="lg:text-2xl xsm:text-xl  font-semibold pb-2">Sun App Download</h1>
          <p className="hover:text-[--third-color] hover:font-semibold">
            Google play
          </p>
        </div>
      </div>
      <div>
        <div className="w-[80vw] m-auto pt-10">
          <div className="text-center">
            <span className="text-2xl">&#169;</span> Sun All Rights
            reserved 2023
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
