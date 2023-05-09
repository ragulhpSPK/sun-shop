import { TopProducts } from "@/helper/topProducts";
import Image from "next/image";
import React from "react";
import { getAllproducts,createCart } from "@/helper/utilities/apiHelper";
import {get} from "lodash"
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { notification } from "antd";

function Topproducts() {

  const [products, setProducts] = useState([])
  // const [topProducts,setTopProducts] = useState([])

  const router=useRouter()
  
  const fetchData = async() => {
    try {
      const result = await getAllproducts();
      setProducts(get(result,"data.data"))
    } catch (err) {
      console.log(err)
    }
  }



  useEffect(() => {
    fetchData()
    
  }, [])

  const handleClick = async(id,data) => {
  
    try {
      const formData = {
        data: {
          image: data.image,
          name: data.title,
          price: data.price,
          total: data.price,
          quantity:1,
        }
        
      }
      await createCart(formData)
      notification.success({message:"added to cart successfully"})
    } catch (err) {
      
    }
  }
  
  
let topProducts=products.filter(data => {
      return data.status===true
    })
  
  return (
    <div className="w-[80vw] m-auto pt-10">
      <div className="text-xl">
        <h1 className="bg-[var(--second-color)] py-3 px-2 text-white">
          Top Products
        </h1>
      </div>
      <div className="grid grid-cols-5 gap-x-28 gap-y-2">
        {topProducts.map((data) => {
          return (
            <div
              className=" w-[12vw] border shadow-lg h-[28vh] relative mt-5"
              key={data._id}
            >
              <div  onClick={() =>
                              router.push({
                                pathname: `/product/${data._id}`,
                                query: { id: data._id },
                              })
                            }>
                 <div className="h-[18vh] flex items-center justify-center">
                <Image
                  width={50}
                  height={100}
                  alt="logo"
                  src={data.image[0]}
                  className="!w-fit !h-[12vh]"
                />
              </div>

             

              <div className="h-[5vh] ">
                <h1 className="text-center text-[12px] font-bold">{data.title}</h1>
                <p className="text-center">Rs:{data.price}</p>
                </div>
             
                <div className="bg-[var(--fifth-color)] w-[45px] h-[35px] absolute right-0 bottom-0"
                onClick={()=>handleClick(data._id,data)}>
                  <Image
                    width={100}
                    height={100}
                    alt="logo"
                    src="/assets/cart2.png"
                    className="w-6 m-auto pt-1"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Topproducts;
