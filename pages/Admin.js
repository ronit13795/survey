import AdminPage from "../components/Admin";
import { Fragment } from "react";
import { useRouter } from "next/router";
import style from "../styles/header.module.css";
import Sidebar from "../components/Sidebar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState, useEffect } from "react";

export default function Admin() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);

  const addQuestion = (question) => {
    const copyQuestion = { ...question };
    setQuestions((questions) => [...questions, copyQuestion]);
  };

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
      <DndProvider backend={HTML5Backend}>
        <Sidebar addQuestion={addQuestion} />
        <AdminPage
          addQuestion={addQuestion}
          setQuestions={setQuestions}
          questions={questions}
        />
      </DndProvider>
    </Fragment>
  );
}
