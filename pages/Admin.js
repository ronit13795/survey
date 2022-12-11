import AdminPage from "../components/Admin";
import { Fragment } from "react";
import { useRouter } from "next/router";
import style from "../styles/header.module.css";
import Sidebar from "../components/Sidebar";
import SidebarRight from "../components/SidebarRight";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";

export default function Admin() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [pages, setPages] = useState([{ elements: [] }]);

  const addQuestion = (question) => {
    const copyQuestion = { ...question };
    setQuestions((questions) => [...questions, copyQuestion]);
  };

  const addPage = () => {
    setPages([...pages, { elements: [] }]);
  };

  const deletePage = (index) => {
    const updatedPages = pages.filter((page, i) => {
      return index != i;
    });
    setPages(updatedPages);
  };

  return (
    <Fragment>
      <DndProvider backend={HTML5Backend}>
        <Sidebar addQuestion={addQuestion} />
        <AdminPage
          addQuestion={addQuestion}
          setQuestions={setQuestions}
          questions={questions}
          addPage={addPage}
          pages={pages}
          deletePage={deletePage}
        />
      </DndProvider>
      <SidebarRight
        setQuestions={setQuestions}
        questions={questions}
        addPage={addPage}
      />
    </Fragment>
  );
}
