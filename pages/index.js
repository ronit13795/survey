import dynamic from "next/dynamic";
import { Fragment } from "react";
import Link from "next/link";
import style from "../styles/header.module.css";
import dbConnect from "../lib/dbConnect";
import surveyModel from "../models/survey";
import { useRouter } from "next/router";

const DynamicForm = dynamic(() => import("../components/Form"), {
  ssr: false,
});

export default function Home({ survey }) {
  const router = useRouter();
  const checkDetail = () => {
    if (
      localStorage.getItem("user-name") === "ADMIN" &&
      localStorage.getItem("password") === "1234"
    ) {
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
      </header>
      <DynamicForm survey={survey} />
    </Fragment>
  );
}

export async function getServerSideProps() {
  await dbConnect();
  let mySurvey = await surveyModel.find();

  return {
    props: { survey: JSON.parse(JSON.stringify(mySurvey[0])) },
  };
}
