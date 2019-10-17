import React from 'react';
import Quiz from 'react-quiz-component/lib/Quiz';

import { quiz } from '../../data/chapter1';

const Home = () => {
  return (<div>
    <Quiz quiz={quiz} showInstantFeedback={true} shuffle={true} />
    </div>
  );
}

export default Home;
