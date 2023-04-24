import { useState, useRef, useEffect } from "react";
import React from "react";
import styles from "../../styles/zoom.module.css";
import { useDispatch } from "react-redux";
import { addproduct } from "@/redux/cartSlice";
import { useRouter } from "next/router";
import { AddCart } from "@/helper/Addcart";
import Link from "next/link";
import style from "../../styles/Home.module.css";

export default function App() {
  const [addcart, setAddCart] = useState();
  const [current, setCurrentImage] = useState();
  const router = useRouter();
  // const [cart,setCart]=useState([]);
  const dispatch = useDispatch();

  const [img, setImg] = useState([]);

  const result = AddCart.filter((data) => {
    return data.product_id == router.query.id;
  });

  useEffect(() => {
    result.map((img) => setImg(img.image[0]));
  });

  const handleClick = () => {
    dispatch(addproduct({ result }));
  };

  return (
    <div
      className="h-[80vh] w-[80vw] flex justify-center  m-auto mt-10"
      id={style.shadow3}
    >
      <div className={`${styles.container} w-[30vw] m-auto`}>
        <div className={styles.left}>
          <div className={`${styles.left_2} pl-24`}>
            <img src={current || img} alt="product" className="h-[60vh]" />
          </div>
          <div className={styles.left_1}>
            {result.map((img) => {
              return img.image.map((image, i) => {
                return (
                  <div
                    className={
                      i == 0 ? "border border-[--third-color]" : "border-none"
                    }
                    id={styles.img_wrap}
                    key={i}
                    onMouseEnter={() => setCurrentImage(image)}
                  >
                    <img src={image} alt="Mobile" className="w-40" />
                  </div>
                );
              });
            })}
          </div>
        </div>
      </div>
      {result.map((data) => {
        return (
          <div className="pt-32 w-[60vw] pl-28">
            <h1 className="text-2xl font-semibold">{data.producttitle}</h1>
            <p className="text-xl text-slate-800 pt-1">Rs:{data.price}</p>
            <h2 className="text-2xl pt-5 font-bold">Product Specifications</h2>
            {data.highlights.map((res) => {
              return <li className="text-xl pt-2">{res}</li>;
            })}

            <div className="pt-10 flex gap-7 justify-between w-fit pl-5">
              <button
                className="bg-[var(--second-color)] text-[#fff] hover:bg-[--fifth-color] hover:scale-105 hover:font-medium hover:text-black duration-1000 text-xl rounded-md px-3 h-[5vh] w-[8vw] py-2"
                onClick={handleClick}
              >
                Add to Cart
              </button>

              <button className="bg-[var(--second-color)] hover:bg-[--fifth-color] hover:scale-105  hover:text-black duration-1000 hover:font-medium text-[#fff] text-xl rounded-md h-[5vh] w-[6vw] px-3 py-2">
                Buy Now
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
