import React, { useEffect, useState } from "react";
import ListIcon from "@mui/icons-material/List";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Category } from "@/helper/categories";
import { SubCategory } from "@/helper/Subcategory";

function allCat() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState();
  //   const [subCategory, setSubCategory] = useState();

  useEffect(() => {
    setCategory(
      Category.map((data) => {
        return data.id;
      })
    );
  }, []);

  return (
    <div>
      <div className="w-[20vw] h-[100vh] shadow-lg">
        <div className="flex  pt-5 pl-[3vw]">
          <ListIcon />
          <p>All Categories</p>
        </div>

        <div className="flex flex-col ">
          {Category.map((data) => {
            console.log(data.category);
            return (
              <div
                className="p-3 pl-[3vw] flex flex-col justify-between min-h-[5vh]"
                key={data.id}
              >
                <div className="flex w-[20vw]" onClick={() => setOpen(!open)}>
                  <h1 className="w-[12vw]">{data.category}</h1>
                  <div>
                    <KeyboardArrowDownIcon />
                  </div>
                </div>

                <div
                  className={`${
                    open ? "block" : "hidden"
                  } flex flex-col duration-1000 ease-linear`}
                >
                  <div>Vivo</div>
                  <div>Vivo</div>
                  <div>Vivo</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default allCat;
