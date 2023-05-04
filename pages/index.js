import Head from "next/head";
import Swiper from "../components/swiper";
import Delivery from "@/components/delivery";
import Categories from "@/components/categories";
import Bestdeals from "@/components/bestdeals";
import Topproducts from "@/components/topproducts";
import ProductFilter from "@/components/productFilter";
import { useSelector } from "react-redux";
import Loading from "./loading";
import { Suspense } from "react";

export default function Home() {
  const result = useSelector((data) => {
    return data.search.searches;
  });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {result.length > 0 ? (
          <ProductFilter />
        ) : (
          <>
            <Suspense fallback={<Loading />}>
              <Swiper />
            </Suspense>

            <Delivery />
            <Categories />
            <Bestdeals />
            <Topproducts />
          </>
        )}
      </main>
    </>
  );
}
