import dynamic from "next/dynamic";
import { Fragment } from "react";
import Link from "next/link";
import style from "../styles/header.module.css";

const DynamicForm = dynamic(() => import("../components/Form"), {
  ssr: false,
});

export default function Home() {
  return (
    <Fragment>
      <header className={style.header}>
        <button>
          <Link className={style.link} href={"/login"}>
            ADMIN
          </Link>
        </button>
      </header>
      <DynamicForm />
    </Fragment>
  );
}
