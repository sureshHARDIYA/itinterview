import React, { Component } from 'react';
import './questionnaries.css';
import { Progress, Checkbox, Radio, Button } from 'antd';
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import _map from "lodash/map";
import ReactMarkdown from "react-markdown";
import SubmitResult from './submitresult';

const POST_QUERY = gql`
    query QUESTIONNAIRE_FIND($id: String!) {
        questionnaireFind(id: $id) {
            id
            name
            description
            status
            level
            category {
                name
                id
            }
            questions {
                id
                title
                explainAnswer
                questionType
                answers {
                    id
                    title
                    score
                    isCorrect
                    answerType
                }
            }
            createdBy {
                id
                email
                firstName
            }
            createdAt
            updatedAt
        }
    }
    `;


class Questionnaries extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quiz: this.getData(),
            activeView: null,
            currentQuestionIndex: 0,
            answers: []
        };
        this.submitAnswer = this.submitAnswer.bind(this);
        this.getListedData = this.getListedData.bind(this);
        this.submitBack = this.submitBack.bind(this);
    }

    getListedData = data => {
      return data;
    };

    getData() {
      let quiz = require('../quiz.json');    
      return quiz;
    };
    
    render() {
        const { data } = this.props;
        const preQuestion = this.getListedData(data.questionnaireFind || {});
        let Quiz = require('../quiz.json');
        Quiz.questions = preQuestion["questions"];
        Quiz.id = preQuestion["id"];
        Quiz.numOfQuestions = (Quiz.questions) && Object.keys(Quiz.questions).length;
        console.log("preQuiz",Quiz, Quiz.numOfQuestions, Quiz.id);
        return (
            <div className="questionApp">                
                {this.state.activeView === 'quizOverview' &&
                    <QuizDescription
                        id={Quiz.id}
                        quiz={Quiz}
                        showQuizQuestion={this.showQuizQuestion.bind(this, 0)}
                        endPopup={this.endPopup.bind(this)}                        
                    />
                }
                {this.state.activeView === 'quizQuestions' &&
                    <Quizinator
                        submitAnswer={this.submitAnswer}
                        submitBack={this.submitBack}
                        quiz={Quiz}
                        currentQuestionIndex={this.state.currentQuestionIndex}
                        buttonsDisabled={this.state.buttonsDisabled}
                        transitionDelay={this.state.transitionDelay}
                        refresh={this.showQuizDescription.bind(this)}
                    />
                }
                {this.state.activeView === 'quizResults' &&
                    <QuizResults
                        quizNum={Quiz.numOfQuestions}
                        results={this.getResults()}
                        thumbnail={Quiz.thumbnail}
                        refresh={this.showQuizDescription.bind(this)}
                    />
                }
                {this.state.activeView === 'submitDialog' && 
                    // <SubmitAnswer 
                    //     submitResults={this.showResults.bind(this)}
                    //     cancelResults={this.showQuizQuestion.bind(this, this.state.currentQuestionIndex)}
                    // />
                    <SubmitResult
                        submitResults={this.showResults.bind(this)}
                        cancelResults={this.showQuizQuestion.bind(this, this.state.currentQuestionIndex)}
                    />
                }                
            </div>
        );
    };

    componentDidMount() {
        this.showQuizDescription();
        // this.showSubDial();
    };    

    showQuizDescription() {
        this.setState((prevState, props) => {
            return {
                activeView: 'quizOverview',
                currentQuestionIndex: 0,
                answers: []
            };
        });
    }

    endPopup() {
        this.props.close();
    }
    
    showQuizQuestion(index) {
        console.log(index);
        this.setState((prevState) => {
            return {
                currentQuestionIndex: index,
                activeView: 'quizQuestions',
                buttonsDisabled: false,
                transitionDelay: 1000
            };
        });
    };
    
    showResults() {
        this.setState((prevState) => {
            return {
                activeView: 'quizResults'
            };
        });
    }

    showSubDial() {
        this.setState((prevState) => {
            return {
                activeView: 'submitDialog'
            };
        });
    }

    submitAnswer(answer) {
        var app = this;
        
        this.setState((prevState) => {
            return {
                buttonsDisabled: true,
                answers: Object.assign({ [this.state.currentQuestionIndex]: answer }, prevState.answers)
            };
        });
        
        window.setTimeout(function () {
            
            let nextIndex = app.state.currentQuestionIndex + 1,
                hasMoreQuestions = (nextIndex < app.state.quiz.numOfQuestions);

            // (hasMoreQuestions) ? app.showQuizQuestion(nextIndex) : app.showResults();
            (hasMoreQuestions) ? app.showQuizQuestion(nextIndex) : app.showSubDial();
            
        }, this.state.transitionDelay);
    };

    submitBack() {
        var app = this;

        window.setTimeout(function () {

            let prevIndex = app.state.currentQuestionIndex - 1,
                hasMoreQuestions = (prevIndex > 0);

            (hasMoreQuestions) ? app.showQuizQuestion(prevIndex) : app.showQuizDescription();
            
        }, this.state.transitionDelay);
    };
    
    getResults() {
        return this.state.quiz.questions.map((item, index) => {
            return Object.assign({}, item, this.state.answers[index]);
        });
    };

}

class QuizDescription extends Component {
    render() {
        let quiz = this.props.quiz;
        let image = quiz.image;
        let htmlDescription = function () { return { __html: quiz.introduction }; };

        return (
            <section className="overviewSection">
                <div className="imageWrapper">
                    <img style={{width:"100%"}} src={require("../../../img/bestpractice.png")} />
                </div>
                <div className="overviewButton">
                  <button onClick={this.props.showQuizQuestion}>Start</button>
                </div>
            </section>
        );
    };
}

class Quizinator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            qsChecked: [],
        };
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onNextHandle = this.onNextHandle.bind(this);
    }

    onCheckboxChange = (checkedValues) => {        
        this.setState({
            qsChecked: checkedValues,
        });
        for (let i = 1; i <= this.props.quiz.questions[this.props.currentQuestionIndex].answers.length; i++) {
            let id = "check" + i,
                cntP = document.getElementById(id);
            if (checkedValues.includes(i)) {           
                cntP.classList.add("showCheck");
            } else {
                cntP.classList.remove("showCheck");
            }
        }
    }

    onRadioChange = e => {
        this.setState({
            qsChecked: [e.target.value],
        });
        for (let i = 1; i <= this.props.quiz.questions[this.props.currentQuestionIndex].answers.length; i++) {
            let id = "check" + i,
                cntP = document.getElementById(id);
            if (e.target.value == i) {           
                cntP.classList.add("showCheck");
            } else {
                cntP.classList.remove("showCheck");
            }
        }
    };

    onNextHandle = (event) => {        
        let isCor = true,
            scroing = this.props.quiz.questions[this.props.currentQuestionIndex].answers;
        if (!this.state.qsChecked.length) isCor = false;
        for (let i = 0; i < this.state.qsChecked.length; i++) {
            if (scroing[this.state.qsChecked[i] - 1].score === 0) {
                isCor = false;
                break;
            }            
        }
        for (let i = 0; i < scroing.length; i++) {
            if (scroing[i].score > 0 && !this.state.qsChecked.includes(i+1)) {
                isCor = false;
                break;
            }
        }
        let answer = { value: 1, isCorrect: isCor },
            target = event.currentTarget;

        let cntAnswer = document.getElementById("explainAnswer");
        cntAnswer.classList.add("showAnswer");
        target.classList.add('clicked', answer.isCorrect ? 'correct' : 'incorrect');
        setTimeout(() => {           

            this.props.submitAnswer(answer);            

            window.setTimeout(function () {
                target.classList.remove('clicked', 'correct', 'incorrect');
            }, this.props.transitionDelay);
            
            setTimeout(() => {
                this.setState({
                    qsChecked: [],
                });
                cntAnswer.classList.remove("showAnswer");        
                if(this.props.currentQuestionIndex < this.props.quiz.questions.length - 1) {
                    for (let i = 1; i <= this.props.quiz.questions[this.props.currentQuestionIndex].answers.length; i++) {
                        let id = "check" + i,
                            cntP = document.getElementById(id);
                        cntP.classList.remove("showCheck");
                    }
                }            
            }, this.props.transitionDelay);

        }, 1);                
    }

    onBackHandle = (event) => {  
        let answer = { value: 1, isCorrect: true },
            target = event.currentTarget;

        this.props.submitBack();

        target.classList.add('clicked', answer.isCorrect ? 'correct' : 'incorrect');

        window.setTimeout(function () {
            target.classList.remove('clicked', 'correct', 'incorrect');
        }, this.props.transitionDelay);
        
        setTimeout(() => {
            this.setState({
                qsChecked: [],
            });
            if(this.props.currentQuestionIndex > 1) {
                for (let i = 1; i <= this.props.quiz.questions[this.props.currentQuestionIndex].answers.length; i++) {
                    let id = "check" + i,
                        cntP = document.getElementById(id);
                    cntP.classList.remove("showCheck");
                }
            }            
        }, 500);        
    }

    render() {
        let quiz = this.props.quiz,
            question = quiz.questions[this.props.currentQuestionIndex],
            answerDivs = question.questionType === "MULTIPLE" ?
                <Checkbox.Group style={{ width: '100%' }} value={this.state.qsChecked} onChange={this.onCheckboxChange}>
                    {
                        question.answers.map((answer, i) =>
                            <div className="checkbox" key={i}>                             
                                <Checkbox value={i+1} checked={false}>
                                    {answer.title}
                                    <img 
                                        id={`check${i+1}`} 
                                        className="hideCheck" 
                                        src={answer.score > 0 ? require("../../../img/right.png") : require("../../../img/wrong.png")} 
                                    />
                                </Checkbox>
                            </div>
                        )
                    }
                </Checkbox.Group>:
                <Radio.Group onChange={this.onRadioChange} defaultValue={""} value={this.state.qsChecked}>
                    {
                        question.answers.map((answer, i) =>
                            <div className="checkbox" key={i}> 
                                <Radio.Button value={i+1} checked={false}>
                                    {answer.title}
                                    <img 
                                        id={`check${i+1}`} 
                                        className="hideCheck" 
                                        src={answer.score > 0 ? require("../../../img/right.png") : require("../../../img/wrong.png")} 
                                    />
                                </Radio.Button>
                            </div>
                        )
                    }
                </Radio.Group>

        
        return (
            <section className={'quizSection' + (this.props.buttonsDisabled ? ' transitionOut' : '')}>
                <div className="helpImg">
                    {/* <img src={require("../../img/help.png")} onClick={this.showCorrect.bind(this)} /> */}
                    <img src={require("../../../img/repeat.png")} onClick={this.props.refresh} style={{opacity:0.5}}/>
                </div>                
                <Progress 
                  percent={Math.round(parseInt(this.props.currentQuestionIndex) / parseInt(this.props.quiz.numOfQuestions) * 100)} 
                  status="active"
                  showInfo={false} 
                />
                <hr />
                <div className="question">
                    <ReactMarkdown source={question.title} />
                </div>
                <div className="hideAnswer" id="explainAnswer">
                    <p><b>Explanation:</b> {question.explainAnswer}</p>
                </div>
                <div style={{textAlign:"left"}}>
                    {answerDivs}
                    <div style={{width: "100%",display:"flex"}}>
                        <Button style={{marginLeft:"10%"}} onClick={this.onBackHandle} className="submitBtn">Back</Button>
                        <Button style={{marginLeft:"60%"}} onClick={this.onNextHandle} className="submitBtn">Next</Button>
                    </div>
                </div>
            </section>
        );
    }

    showCorrect() {
        let question = this.props.quiz.questions[this.props.currentQuestionIndex], scoring = [];
        for(let i = 0; i < question.answers.length; i++ ) {
            if(parseInt(question.answers[i].score) > 0) {
                scoring.push(i+1);
            }
        }
        let CorrAns = question.explainAnswer + "\nCorrect Answer: ";
        for (let i = 0; i < scoring.length; i++) {
            CorrAns += scoring[i] + ', ';
        }
        alert(CorrAns);
    }
}

class QuizResults extends Component {
    render() {
        let numCorrect = 0, score = 0, possibleScore = 0;

        this.props.results.forEach((answer) => {
            if (!!answer.isCorrect) {
                numCorrect += 1;
                score += ((answer.level || 1) * 10);
            }
            possibleScore += ((answer.level || 1) * 10);
        });
        
        const results = this.props.results.map((item, i) => {
            let questionHtml = function () { return { __html: item.question }; };
            let explanationHtml = function () { return { __html: item.explanation }; };
            let response =
                (item.isCorrect === true) ?
                    "You correctly answered " :
                (item.isCorrect === false) ? 
                    `You answered ${item.answers[item.value - 1]}. The correct answer is ` :
                    "The correct answer is ";

            return (                 
                <li className={"result" + (item.isCorrect ? " correct" : " incorrect")} key={i}>
                    <div className="question" dangerouslySetInnerHTML={questionHtml()} />
                    <div className="response">
                        {response} <b>{item.answers[item.correct - 1]}</b>
                    </div>
                    <p className="explanation">
                        <i dangerouslySetInnerHTML={explanationHtml()} />
                    </p>
                </li>
            );
        });        

        return (
            <section className="resultsSection">
                <div className="helpImg">
                    <img src={require("../../../img/repeat.png")} onClick={this.props.refresh} />
                </div>
                <h2>Results</h2>
                <div className="scoring">
                    You got <em>{numCorrect}</em> correct scoring a total of <b>{score}</b> out of a possible <b>{possibleScore}</b>.
                </div>
                <Progress type="circle" percent={Math.round(parseInt(numCorrect) / parseInt(this.props.quizNum) * 100)} />
            </section>
        );
    }
}

export default graphql(POST_QUERY, {
    options: ({ id }) => ({
        variables: {
          id
        }
    })
  })(Questionnaries);