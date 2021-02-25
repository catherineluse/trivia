import React from 'react';
import decodedQuestion from '../utils';
import { Link } from 'react-router-dom';

type Question = {
  correct_answer: string,
  question: string,
};

type Props = {
  questions: Array<Question>,
  userAnswersForCurrentQuiz: Array<string>,
  score: number,
  resetGame: Function,
}

const Results = ({
  questions,
  userAnswersForCurrentQuiz,
  score,
  resetGame,
}: Props) => {
  const getResults = () => {
    if (userAnswersForCurrentQuiz.length === 0) {
      return (
        <tr>
          <td>-</td>
          <td>{"You don't have any results yet."}</td>
          <td>-</td>
        </tr>
      );
    }
    return userAnswersForCurrentQuiz.map((answer, idx) => {
      // The user's recorded answers are in the same order as
      // the questions, so we can use the same index to find the
      // user's answer and the question it corresponds to.
      const correspondingQuestion = questions[idx];
      const { correct_answer, question } = correspondingQuestion;

      if (answer === correct_answer) {
        return (
          <tr key={idx}>
            <td className='correct'>&#10003;</td>
            <td>{decodedQuestion(question)}</td>
            <td>{answer}</td>
          </tr>
        );
      } else {
        return (
          <tr key={idx}>
            <td className='incorrect'>&#215;</td>
            <td>{decodedQuestion(question)}</td>
            <td>{answer}</td>
          </tr>
        );
      }
    });
  };

  return (
    <>
      <h1>Results</h1>
      {userAnswersForCurrentQuiz.length > 0 ? (
        <p>You scored {score} out of 10.</p>
      ) : null}
      <div className='container'>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Score</th>
              <th scope='col'>Trivia Question</th>
              <th scope='col'>Your Answer</th>
            </tr>
          </thead>
          <tbody>{getResults()}</tbody>
        </table>
      </div>
      <Link to='/quiz'>
        <button className='btn' onClick={() => {
          resetGame()
        }}>
          Start New Quiz
        </button>
      </Link>
    </>
  );
};

export default Results;
