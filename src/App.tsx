import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Quiz from './components/Quiz';
import Results from './components/Results';
import './App.scss';

function App() {
  const [triviaQuestions, setTriviaQuestions] = useState([]);
  const [userAnswersForCurrentQuiz, setUserAnswersForCurrentQuiz] = useState(
    []
  );
  const [positionInQuiz, setPositionInQuiz] = useState(0);
  const [score, setScore] = useState(0);

  const fetchQuestions = async () => {
    await axios
      .get('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
      .then((response) => {
        const questions = response.data.results;
        setTriviaQuestions(questions);
      })
      .catch((error) => {
        alert(error);
        return [];
      });
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const resetGame = (): void => {
    setScore(0);
    setPositionInQuiz(0);
    setUserAnswersForCurrentQuiz([]);
    fetchQuestions();
  };

  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route path='/' exact>
            <LandingPage />
          </Route>
          <Route path='/quiz'>
            <Quiz
              questions={triviaQuestions}
              userAnswersForCurrentQuiz={userAnswersForCurrentQuiz}
              setUserAnswersForCurrentQuiz={setUserAnswersForCurrentQuiz}
              positionInQuiz={positionInQuiz}
              setPositionInQuiz={setPositionInQuiz}
              score={score}
              setScore={setScore}
              resetGame={resetGame}
            />
          </Route>
          <Route path='/results'>
            <Results
              questions={triviaQuestions}
              userAnswersForCurrentQuiz={userAnswersForCurrentQuiz}
              score={score}
              resetGame={resetGame}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
