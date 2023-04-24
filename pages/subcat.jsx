import React, { useEffect, useState } from "react";
import Menu, { SubMenu, Item as MenuItem } from "rc-menu";
import { Category } from "@/helper/categories";
import { Cat } from "@/helper/product";
import { useRouter } from "next/router";
import { SubCategory } from "@/helper/Subcategory";
import "rc-menu/assets/index.css";

function Subcat() {
  const router = useRouter();
  const [categories, setCategories] = useState();
  const [product, setProduct] = useState([]);

  console.log(router.query);

  const getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  };

  const clickHandler = (e) => {
    setProduct(
      Cat.filter((data) => {
        return data.subcat == e.key;
      })
    );
  };

  useEffect(() => {
    setCategories(router.query.id);
  }, [router.query.id]);

  let result = Cat.filter((data) => {
    return data.cat_id == categories;
  });

  return (
    <div className="w-[100vw] flex">
      <div className="shadow-lg w-[18vw] ">
        <div className="flex  w-[18vw] m-auto pl-20 pt-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <p className="border-b w-[90%] ">All categories</p>
        </div>

        <div className="text-justufy pl-20 py-4">
          <Menu
            onClick={clickHandler}
            style={{
              width: 230,
            }}
            // defaultSelectedKeys={["1"]}
            // defaultOpenKeys={["sub1"]}
            mode="inline"
          >
            {Category.map((res) => {
              return (
                <SubMenu title={res.category} key={res.id}>
                  {SubCategory.filter((resutl) => {
                    return resutl.cat_id === res.id;
                  }).map((res2, index) => {
                    return <MenuItem key={res2.id}>{res2.subname}</MenuItem>;
                  })}
                </SubMenu>
              );
            })}
          </Menu>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-10 pl-5">
        {product.map((data) => {
          return (
            <div
              className="h-[35vh] w-[14vw] shadow-lg mt-20 ml-5 border-2 relative"
              key={data.id}
              onClick={() => {
                router.push({ pathname: `/product/${data.id}`, query: data });
              }}
            >
              <div className="h-[25vh] pt-5">
                <img src={data.image} className="w-auto h-[25vh] m-auto p-5" />
              </div>
              <p className="text-center">{data.name}</p>
              <p className="text-center">{data.price}</p>
              <p className="flex flex-col bg-[gold] w-14 h-10 text-center absolute top-0 right-0 text-sm">
                <span>{data.offer}</span>OFF
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Subcat;
