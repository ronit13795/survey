import { Fragment } from "react";
import style from "../styles/header.module.css";
import dbConnect from "../lib/dbConnect";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const checkDetail = () => {
    if (localStorage.getItem("accessToken")) {
      return router.push("/Admin");
    }
    return router.push("/Login");
  };
  return (
    <Fragment>
      <button
        onClick={() => {
          checkDetail();
        }}
        className={style.btn}
      >
        Sign In
      </button>
      <button
        onClick={() => {
          return router.push("/SignUp");
        }}
        className={style.btn}
      >
        Sign Up
      </button>
      <button
        onClick={() => {
         router.push("/SurveysMarketplace");
        }}
        className={style.btn}
      >
        Surveys
      </button>
    </Fragment>
  );
}
