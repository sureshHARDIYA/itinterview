import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";

import Contact from './containers/contact'
import Home from './containers/home'
import QuizChapter1 from './containers/quizChapter1'

export const Routes = () =>
<Switch>
  <Route path="/about-us">
    <About />
  </Route>
  <Route path="/contact">
    <Contact />
  </Route>
  <Route path="/quiz/chapter1">
    <QuizChapter1 />
  </Route>
  <Route path="/">
    <Home />
  </Route>
</Switch>

function About() {
  return <h2>About Exploratory Data Analysis</h2>;
}
