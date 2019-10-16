import React from 'react';

import './App.css';
import { quiz } from './data/chapter1';
import Quiz from 'react-quiz-component/lib/Quiz';
import { Card, Icon, Avatar } from 'antd';
const { Meta } = Card;


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Quiz quiz={quiz} showInstantFeedback={true}/>
        <Card
          style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
          >
            Coming soon...!
            Visual Aids for exploratory data analysis
          </Card>
      </header>
    </div>
  );
}

export default App;
