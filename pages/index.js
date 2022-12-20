import { Fragment } from "react";
import style from "../styles/header.module.css";
import dbConnect from "../lib/dbConnect";
import { useRouter } from "next/router";

export default function Home({ survey }) {
  const router = useRouter();
  const checkDetail = () => {
    if (localStorage.getItem("accessToken")) {
      return router.push("/Admin");
    }
    return router.push("/Login");
  };
  return (
    <Fragment>
      <header className={style.header}>
        <button
          onClick={() => {
            checkDetail();
          }}
          className={style.btn}
        >
          Admin
        </button>
        <button
          onClick={() => {
            return router.push("/SignUp");
          }}
          className={style.btn}
        >
          Sign Up
        </button>
      </header>
    </Fragment>
  );
}

export async function getServerSideProps() {
  await dbConnect();
  let mySurvey = await surveyModel.find();

  return {
    props: { survey: JSON.parse(JSON.stringify(mySurvey)) },
  };
}
