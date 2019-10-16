import React from 'react';

import './App.css';
import { quiz } from './data/chapter1';
import Quiz from 'react-quiz-component/lib/Quiz';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Quiz quiz={quiz} showInstantFeedback={true}/>
      </header>
    </div>
  );
}

export default App;
