import React, { Component } from 'react';
import './practice.css';
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
            activeView: null,
            currentQuestionIndex: 0,
            answers: [],
            buttonsDisabled: false,
            transitionDelay: 1000
        };
        this.submitAnswer = this.submitAnswer.bind(this);
        this.getListedData = this.getListedData.bind(this);
        this.submitBack = this.submitBack.bind(this);
    }

    getListedData = data => {
      return data;
    };
    
    render() {
        const { data } = this.props;
        const preQuestion = data && this.getListedData(data.questionnaireFind || {});
        let Quiz = {"id": 0, "numOfQuestions": 0, "questions": null};
        Quiz.questions = preQuestion["questions"];
        Quiz.id = preQuestion["id"];
        Quiz.numOfQuestions = (Quiz.questions) && Object.keys(Quiz.questions).length;
        
        return (
            <div>
                <div style={{backgroundColor:"cornflowerblue", margin: 20, padding: 20}}>
                    <h1 style={{textAlign: "center", margin: "0 0 -20px", fontSize: 25, color: "white" }}>{preQuestion.name}</h1>
                    <h1 style={{textAlign: "left", margin: "20px 20px 0", fontWeight: "unset", color:"white"}}>{preQuestion.description}</h1>    
                </div>
                <div className="questionApp">
                    {this.state.activeView === 'quizQuestions' && Quiz.numOfQuestions > 0 &&
                        <Quizinator
                            submitAnswer={this.submitAnswer}
                            submitBack={this.submitBack}
                            quiz={Quiz}
                            currentQuestionIndex={this.state.currentQuestionIndex}
                            buttonsDisabled={this.state.buttonsDisabled}
                            transitionDelay={this.state.transitionDelay}
                            refresh={this.showRefreshQuestion.bind(this)}
                        />
                    }
                    {this.state.activeView === 'quizResults' &&
                        <QuizResults
                            quizNum={Quiz.numOfQuestions}
                            results={this.getResults(Quiz)}
                            refresh={this.showRefreshQuestion.bind(this)}
                        />
                    }
                    {this.state.activeView === 'submitDialog' && 
                        <SubmitResult
                            submitResults={this.showResults.bind(this)}
                            cancelResults={this.showQuizQuestion.bind(this, this.state.currentQuestionIndex)}
                        />
                    }                
                </div>
            </div>
        );
    };

    componentDidMount() {
        this.showQuizQuestion(this.state.currentQuestionIndex);
    };    

    showRefreshQuestion() {
        this.setState((prevState) => {
            return {
                currentQuestionIndex: 0,
                activeView: 'quizQuestions',
                buttonsDisabled: false,
                answers: []
            };
        });
    };
    
    showQuizQuestion(index) {
        console.log(index);
        this.setState((prevState) => {
            return {
                currentQuestionIndex: index,
                activeView: 'quizQuestions',
                buttonsDisabled: false
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

    submitAnswer(answer, num) {
        var app = this;        
        this.setState((prevState) => {
            return {
                buttonsDisabled: true,
                answers: Object.assign({ [this.state.currentQuestionIndex]: answer }, prevState.answers)
            };
        });        
        window.setTimeout(function () {            
            let nextIndex = app.state.currentQuestionIndex + 1,
                hasMoreQuestions = (nextIndex < num);
            (hasMoreQuestions) ? app.showQuizQuestion(nextIndex) : app.showSubDial();            
        }, this.state.transitionDelay);
    };

    submitBack() {        
        var app = this;
        window.setTimeout(function () {
            let prevIndex = app.state.currentQuestionIndex - 1,
                hasPrevStep = (prevIndex > -1);
            (hasPrevStep) ? app.showQuizQuestion(prevIndex) : window.location.href = window.localStorage.getItem('cntURL');
        }, this.state.transitionDelay);
    };
    
    getResults(quiz) {
        return quiz.questions.map((item, index) => {
            return Object.assign({}, item, this.state.answers[index]);
        });
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

            this.props.submitAnswer(answer, this.props.quiz.numOfQuestions);            

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
            let questionHtml = function () { return { __html: item.title }; };
            let explanationHtml = function () { return { __html: item.explainAnswer }; };
            let response =
                (item.isCorrect === true) ?
                    <p style={{color:"blue"}}>You correctly answered</p> : <p style={{color:"red"}}>Your answer was wrong</p>;

            return (                 
                <li className={"result" + (item.isCorrect ? " correct" : " incorrect")} key={i}>
                    <div className="question" dangerouslySetInnerHTML={questionHtml()} />
                    <div className="response">
                        {response}
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
                <div>{results}</div>
                <div style={{ textAlign: "right" }}>
                    <Button 
                        size={"default"} 
                        onClick={()=>{console.log("Results");}}
                    >
                        Go to Test
                    </Button>
                </div>
            </section>
        );
    }
}

export default graphql(POST_QUERY, {
    options: ({ match }) => ({
        variables: {
          id: match.params.id
        }
    })
  })(Questionnaries);