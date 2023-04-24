import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { result } from "lodash";

function Layout({ children }) {
  const router = useRouter();
  const result = useSelector((data) => {
    return data.search.searches;
  });

  return (
    <div>
      {router.pathname.split("/").includes("dashboard") ? "" : <Navbar />}
      {children}

      {router.pathname.split("/").includes("dashboard") || result.length > 0 ? (
        ""
      ) : (
        <Footer />
      )}
    </div>
  );
}

export default Layout;
