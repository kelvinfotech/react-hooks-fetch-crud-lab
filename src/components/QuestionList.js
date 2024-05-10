import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => setQuestions(questions.filter((question) => question.id !== id)))
      .catch((error) => console.error("Error:", error));
  }

  function handleUpdateCorrectAnswer(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then(() =>
        setQuestions(
          questions.map((question) =>
            question.id === id ? { ...question, correctIndex } : question
          )
        )
      )
      .catch((error) => console.error("Error:", error));
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDeleteQuestion}
            onUpdateCorrectAnswer={handleUpdateCorrectAnswer}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
