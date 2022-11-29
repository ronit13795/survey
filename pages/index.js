import dynamic from "next/dynamic";
import { Fragment } from "react";
import Link from "next/link";
import style from "../styles/header.module.css";
import dbConnect from "../lib/dbConnect";
import surveyModel from "../models/survey";

const DynamicForm = dynamic(() => import("../components/Form"), {
  ssr: false,
});

export default function Home({ survey }) {
  return (
    <Fragment>
      <header className={style.header}>
        <Link className={style.link} href={"/Login"}>
          <button>ADMIN</button>
        </Link>
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
