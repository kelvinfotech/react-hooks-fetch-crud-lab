import React from "react";

function QuestionItem({ question, onDelete, onUpdateCorrectAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleDelete = async () => {
    try {
      await onDelete(id);
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleCorrectAnswerChange = async (event) => {
    const newCorrectIndex = parseInt(event.target.value);
    try {
      await onUpdateCorrectAnswer(id, newCorrectIndex);
    } catch (error) {
      console.error("Error updating correct answer:", error);
    }
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          defaultValue={correctIndex}
          onChange={handleCorrectAnswerChange}
        >
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
