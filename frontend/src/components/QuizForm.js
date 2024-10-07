import React, { useState } from 'react';

const QuizForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeLimit, setTimeLimit] = useState(30);
  const [questions, setQuestions] = useState([{ questionText: '', correctAnswer: '' }]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', correctAnswer: '' }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, timeLimit, questions });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Quiz</h2>
      <input
        type="text"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Time Limit (in minutes)"
        value={timeLimit}
        onChange={(e) => setTimeLimit(e.target.value)}
      />
      <h3>Questions</h3>
      {questions.map((question, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder={`Question ${index + 1}`}
            value={question.questionText}
            onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
          />
          <input
            type="text"
            placeholder="Correct Answer"
            value={question.correctAnswer}
            onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={handleAddQuestion}>
        Add Another Question
      </button>
      <button type="submit">Create Quiz</button>
    </form>
  );
};

export default QuizForm;