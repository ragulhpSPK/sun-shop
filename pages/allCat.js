import React from "react";
import ListIcon from "@mui/icons-material/List";
import { Category } from "@/helper/categories";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useState } from "react";
import { useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Typography } from "antd";
import { SubCategory } from "@/helper/Subcategory";
import "rc-menu/assets/index.css";
import Menu, { SubMenu, Item as MenuItem } from "rc-menu";
import {
  getAllCatagory,
  getAllSubCatagory,
  getAllproducts,
} from "../helper/utilities/apiHelper";
import { get } from "lodash";
import { useRouter } from "next/router";
import Link from "next/link";

function AllCat() {
  const [active, setActive] = useState("");
  const [id, setId] = useState();
  const [more, setMore] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const result = [
        await getAllCatagory(),
        await getAllSubCatagory(),
        await getAllproducts(),
      ];
      setCategory(get(result, "[0].data.data", []));
      setSubCategory(get(result, "[1].data.data", []));
      setProducts(get(result, "[2].data.data", []));
    } catch (err) {
      console.log(err);
    }
  };

  console.log(products, "setProducts");

  useEffect(() => {
    fetchData();
    setActive(router.query.name);
    setId(router.query._id);
  }, [router.query._id, router.query.name]);

  return (
    <div className="flex justify-between w-[100vw]">
      <div className="w-[16vw] shadow-xl h-[90vh] overflow-scroll pl-20 leading-10">
        <Link href="/products">
          <div className="flex items-center font-bold">
            <span>
              <ListIcon />
            </span>
            All Categories
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
                  <a
                    onClick={() => {
                      setActive(data.name);
                      setId(data._id);
                    }}
                  >
                    <div
                      className={`${
                        data.name === active
                          ? "text-[--second-color] font-bold"
                          : "text-black"
                      } cursor-pointer flex space-x-10`}
                    >
                      <div className="flex items-center w-[16vw]">
                        <ArrowRightIcon
                          className={`${
                            data.name === active ? "visible" : "invisible"
                          }`}
                        />
                        {data.name}
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className="w-[84vw] h-[8vh] flex justify-center items-center bg-slate-100 ">
        <div className="flex gap-[5vw] pb-5">
          <div className="pt-[15px]">
            <Menu
              style={{
                width: 600,
                height: 55,
                fontSize: 20,
              }}
              mode="horizontal"
              className="shadow-xl !rounded-md flex relative !border !border-slate-300 !bg-white"
            >
              <DownOutlined className="absolute right-4 top-[2vh]" />
              <SubMenu
                title="Subcategories"
                className="m-auto cursor-pointer"
                style={{
                  width: 600,
                }}
              >
                {subCategory
                  .filter((result) => {
                    return result.categoryId === id;
                  })
                  .map((res2, index) => {
                    return (
                      <Menu.Item key={res2._id}>
                        {res2.subcategoryname}
                      </Menu.Item>
                    );
                  })}
              </SubMenu>
            </Menu>
          </div>

          <div className="pt-[15px]">
            <Menu
              mode="horizontal"
              style={{
                width: 400,
                height: 55,
              }}
              className="shadow-xl !rounded-md flex relative !border !border-slate-300 !bg-white"
            >
              <DownOutlined className="absolute right-4 top-[2vh]" />
              <SubMenu
                title="Price"
                style={{
                  width: 400,
                }}
              >
                <Menu.Item>Price Low to high</Menu.Item>
                <Menu.Item>Price high to low</Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllCat;
