import AdminPage from "../components/Admin";
import { Fragment, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import SidebarRight from "../components/SidebarRight";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";
import React from "react";

export default function Admin() {
  const [pages, setPages] = useState([]);

  // const addQuestion = (question) => {
  //   const copyQuestion = { ...question };
  //   setQuestions((questions) => [...questions, copyQuestion]);
  // };

  const addPage = () => {
    setPages((pages) => [...pages, { elements: [] }]);
  };

  useEffect(() => {
    console.log(pages);
  }, [pages]);

  // const addQuestion = (question, index) => {
  //   console.log(pages, "pages");
  //   const updatedPages = pages.map((page, i) => {
  //     console.log(i, "i");
  //     if (index == i) {
  //       console.log(i, index);
  //       return { elements: [...page.elements, { ...question }] };
  //     }
  //     return page;
  //   });
  //   console.log(updatedPages, "updated");
  //   console.log(index, "index", question, "question");
  //   // setPages(() => [...updatedPages]);
  // };

  const deletePage = (index) => {
    const updatedPages = pages.filter((page, i) => {
      return index != i;
    });
    setPages(updatedPages);
  };

  return (
    <Fragment>
      <DndProvider backend={HTML5Backend}>
        <Sidebar setPages={setPages} />
        <AdminPage
          addPage={addPage}
          pages={pages}
          deletePage={deletePage}
          setPages={setPages}
        />
      </DndProvider>
      <SidebarRight addPage={addPage} pages={pages} />
    </Fragment>
  );
}
