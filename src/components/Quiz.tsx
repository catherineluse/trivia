import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import categoryIcons from '../categories';
import decodedQuestion from '../utils';

type Question = {
  category: string,
  correct_answer: string,
  question: string,
};

type Props = {
  questions: Array<Question>,
  userAnswersForCurrentQuiz: Array<string>,
  setUserAnswersForCurrentQuiz: Function,
  score: number,
  setScore: Function,
  resetGame: Function,
  positionInQuiz: number,
  setPositionInQuiz: Function,
};


const Quiz = ({
  questions,
  userAnswersForCurrentQuiz,
  setUserAnswersForCurrentQuiz,
  score,
  setScore,
  resetGame,
  positionInQuiz,
  setPositionInQuiz,
}: Props) => {
  const history = useHistory();

  if (questions.length === 0) {
    return <p>Loading questions...</p>;
  }

  const currentQuestion = questions[positionInQuiz];

  const { category, correct_answer, question } = currentQuestion;

  const checkAnswer = (answer: string) => {
    if (answer === correct_answer) {
      setPositionInQuiz(positionInQuiz + 1);
      setScore(score + 1);

      // Here we record what the user's answer was
      // so that it can later be shown in the results.
      setUserAnswersForCurrentQuiz([...userAnswersForCurrentQuiz, answer]);
    } else {
      setPositionInQuiz(positionInQuiz + 1);
      setUserAnswersForCurrentQuiz([...userAnswersForCurrentQuiz, answer]);
    }
    if (positionInQuiz === questions.length - 1) {
      // Go to the results page when we run out of questions.
      history.push('/results');
    }
  };

  // The categoryIcons object is a way to look up
  // the Font Awesome icon that goes with a given category.
  // @ts-ignore
  const categoryIconClassName = categoryIcons[category]['icon'];

  return (
    <div className='container'>
      <h1>{'Trivia Challenge'}</h1>

      <div className='card'>
        <h2 className='card-header category'>
          
          <i className={categoryIconClassName}></i>
          {category}
        </h2>
        <div className='card-body'>{decodedQuestion(question)}</div>
        <div className='card-footer answer-buttons'>
          <button
            className='btn'
            onClick={() => {
              checkAnswer('True');
            }}
          >
            True
          </button>
          <button
            className='btn'
            onClick={() => {
              checkAnswer('False');
            }}
          >
            False
          </button>
        </div>
      </div>

      <div className='position'>{`Question ${positionInQuiz + 1} of 10`}</div>
      <div className='score'>{`You scored ${score} of 10`}</div>
      <Link to='/quiz'>
        <button className='btn' onClick={() => {
          resetGame()
        }}>
          Reset
        </button>
      </Link>
    </div>
  );
};

export default Quiz;
