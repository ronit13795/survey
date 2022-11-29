import AdminPage from "../components/Admin";
import { Fragment } from "react";
import { useRouter } from "next/router";
import style from "../styles/header.module.css";

export default function Admin() {
  const router = useRouter();
  return (
    <Fragment>
      <header className={style.header}>
        <button
          onClick={() => {
            router.push("/");
          }}
          className={style.btn}
        >
          survey
        </button>
      </header>
      <AdminPage />
    </Fragment>
  );
}
