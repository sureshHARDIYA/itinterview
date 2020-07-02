import React, { Component } from "react";
import { Carousel, Button } from "antd";

class QuestionnariePlay extends Component {
  previous = () => {
    this.slider.slick.slickPrev();
  };

  next = () => {
    this.slider.slick.slickNext();
  };

  render() {
    const { questions } = this.props;

    return (
      <div>
        <Carousel effect="scrollx" ref={c => (this.slider = c)}>
          {questions &&
            questions.map(item => (
              <div key={item.id}>
                <h3>{item.title}</h3>
                <Button onClick={this.previous}>Previous </Button>
                <Button onClick={this.next}>Next </Button>
              </div>
            ))}
        </Carousel>
      </div>
    );
  }
}

export default QuestionnariePlay;
