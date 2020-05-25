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
                            cntAnswer={this.state.answers}
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
        if(this.state.answers[app.state.currentQuestionIndex] && app.state.currentQuestionIndex + 1 < num) {
            app.showQuizQuestion(app.state.currentQuestionIndex + 1);
        } else {
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
        }
    };

    submitBack() {        
        var app = this;
        window.setTimeout(function () {
            let prevIndex = app.state.currentQuestionIndex - 1,
                hasPrevStep = (prevIndex > -1);
            (hasPrevStep) ? app.showQuizQuestion(prevIndex) : window.location.href = window.localStorage.getItem('cntURL');
        }, 100);
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
            seted: false,
        };
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onNextHandle = this.onNextHandle.bind(this);
    }

    onCheckboxChange = (checkedValues) => {
        if(this.props.cntAnswer[this.props.currentQuestionIndex] || this.state.seted) {return;}       
        this.setState({
            qsChecked: checkedValues,
        });
        let rightAnswer=[], answers = this.props.quiz.questions[this.props.currentQuestionIndex].answers;
        for (let i = 1; i <= answers.length; i++) {
            let id = "check" + i,
                cntP = document.getElementById(id);
            if (checkedValues.includes(i)) {           
                cntP.classList.add("showCheck");
            } else {
                cntP.classList.remove("showCheck");
            }
            if (answers[i-1].score > 0) {
                rightAnswer.push(i);
            }
        }
        for (let i = 0; i < checkedValues.length; i++) {
            if(!rightAnswer.includes(checkedValues[i]) || eqSet(checkedValues, rightAnswer)) {
                document.getElementById("explainAnswer").classList.add("showAnswer");
                this.setState({
                    qsChecked: checkedValues,
                    seted: true,
                })
            }
        }
        function eqSet(as, bs) {
            if (as.length !== bs.length) return false;
            for (let i = 0; i < as.length; i++) {
                if(!bs.includes(as[i])) return false;
            } 
            return true;
        }
    }

    onRadioChange = e => {
        if(this.props.cntAnswer[this.props.currentQuestionIndex] || this.state.seted) {return;}
        this.setState({
            qsChecked: [e.target.value],
            seted: true,
        });
        document.getElementById("explainAnswer").classList.add("showAnswer");
        let id = "check" + e.target.value;
        document.getElementById(id).classList.add("showCheck");
    };

    onNextHandle = (event) => {
        if(!this.state.seted && !this.props.cntAnswer[this.props.currentQuestionIndex]) return;
        if(this.props.cntAnswer[this.props.currentQuestionIndex]) {
            this.props.submitAnswer(answer, this.props.quiz.numOfQuestions);
            return;
        }       
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
        let answer = { value: 1, isCorrect: isCor, qsChecked: this.state.qsChecked },
            target = event.currentTarget;
        
        target.classList.add('clicked', answer.isCorrect ? 'correct' : 'incorrect');       

        setTimeout(() => {
            target.classList.remove('clicked', 'correct', 'incorrect');
            this.setState({
                qsChecked: [],
                seted: false,
            });
            this.props.submitAnswer(answer, this.props.quiz.numOfQuestions);
        }, this.props.transitionDelay);             
    }

    onBackHandle = () => {
        this.props.submitBack();        
        this.setState({ qsChecked: [], });         
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
                                        style={{width: "20px", marginLeft: "10px"}}
                                        className={(this.props.cntAnswer[this.props.currentQuestionIndex] && this.props.cntAnswer[this.props.currentQuestionIndex].qsChecked.includes(i+1)) ? "showCheck" : "hideCheck"}  
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
                                        style={{width: "20px", marginLeft: "10px"}}
                                        className={(this.props.cntAnswer[this.props.currentQuestionIndex] && this.props.cntAnswer[this.props.currentQuestionIndex].qsChecked.includes(i+1)) ? "showCheck" : "hideCheck"} 
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
                <div 
                    className={(this.props.cntAnswer[this.props.currentQuestionIndex]) ? "showAnswer" : "hideAnswer"} 
                    id="explainAnswer"
                >
                    <p><b>Explanation:</b> {question.explainAnswer}</p>
                </div>
                <div 
                    className={(question.questionType === "MULTIPLE") ? {display: 'flex'} : 'hideCheck'}
                    style={{fontStyle: "italic", fontSize: '12px', textAlign: 'left', marginBottom: '10px', marginLeft: '60px'}}
                >
                    MULTIPLE ANSWER REQUIRED!
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
    constructor(props) {
        super(props);
        this.HandleGoTo = this.HandleGoTo.bind(this);
    }
    HandleGoTo() {
        console.log("Results");
        window.location.href = '/sign-in';
    }
    render() {
        let numCorrect = 0, score = 0, possibleScore = 0;
        this.props.results.forEach((answer) => {
            if (!!answer.isCorrect) {
                numCorrect += 1;
                score += ((answer.level || 1) * 10);
            }
            possibleScore += ((answer.level || 1) * 10);
        });
        let cntPercent = Math.round(parseInt(numCorrect) / parseInt(this.props.quizNum) * 100);
        let result = cntPercent > 50 ? "You have passed this practice" : "You did not pass this practice."
        return (
            <section className="resultsSection">
                <div className="helpImg">
                    <img src={require("../../../img/repeat.png")} onClick={this.props.refresh} />
                </div>
                <h2>{result}</h2>
                <div className="scoring">
                    You got <em>{numCorrect}</em> correct scoring a total of <b>{score}</b> out of a possible <b>{possibleScore}</b>.
                </div>
                <Progress type="circle" percent={cntPercent} />
                <div style={{ textAlign: "left" }}>
                    <div style={{width: "100%",display:"flex"}}>
                        <Button style={{marginLeft:"0%"}} onClick={this.props.refresh} className="submitBtn">Try Again</Button>
                        <Button style={{marginLeft:"70%"}} onClick={this.HandleGoTo} className="submitBtn">Go to Test</Button>
                    </div>
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