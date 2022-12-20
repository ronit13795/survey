import Page from "./Page";
import update from "immutability-helper";
import { useCallback } from "react";

export default function AdminPage({ pages, deletePage, setPages }) {
  const movePage = useCallback((dragIndex, hoverIndex) => {
    setPages((prevPages) =>
      update(prevPages, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevPages[dragIndex]],
        ],
      })
    );
  }, []);

  const updateSurveyContext = (pageIndex, indexToUpdate, updatedQuestion) => {
    const updateQuestions = pages.map((page, index) => {
      if (pageIndex === index) {
        page.elements[indexToUpdate] = updatedQuestion;
        return page;
      }
      return page;
    });
    setPages([...updateQuestions]);
  };

  const deleteQuestion = (pageIndex, questionIndex) => {
    const updateQuestions = pages.map((page, index) => {
      if (pageIndex === index) {
        const updatedQuestionsInThePage = page.elements.filter(
          (question, i) => {
            return questionIndex !== i;
          }
        );
        return { ...page, elements: [...updatedQuestionsInThePage] };
      }
      return page;
    });

    setPages([...updateQuestions]);
  };

  return (
    <div>
      <div className="admin-container">
        <div></div>
        {pages.map((page, index) => {
          return (
            <Page
              index={index}
              key={index}
              deletePage={deletePage}
              page={page}
              setPages={setPages}
              updateSurveyContext={updateSurveyContext}
              deleteQuestion={deleteQuestion}
              movePage={movePage}
            />
          );
        })}
      </div>
    </div>
  );
}
