import React, { Component } from 'react';
import { Modal } from 'antd';

class SubmitResult extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        ModalText: 'Do you really want to submit the result of this practice?',
        visible: true,
        confirmLoading: false,
    };
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
      this.props.submitResults(); 
    }, 2000);
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
    this.props.cancelResults();
  };

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <div>
        <Modal
          title="Submit Results"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{ModalText}</p>
        </Modal>
      </div>
    );
  }
}

export default SubmitResult;