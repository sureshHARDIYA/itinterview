import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

class SubmitAnswer extends Component {

  constructor(props) {
    super(props);
    this.state = {
        open: true
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleClickOpen() {
    this.setState({
        open: true,
    })
  };

  handleSubmit() {
    this.setState({
        open: false,
    });
    setTimeout(() => {
        this.props.submitResults();  
    }, 200);
  };

  handleCancel() {
    this.setState({
        open: false,
    });
    setTimeout(() => {
        this.props.cancelResults();
    }, 200);
  };

  render() {
    return (
        <div>
          <Dialog
            open={this.state.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">{"Submit Results"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Do you really want to submit the result of this practice?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleSubmit} color="primary">
                Submit
              </Button>
              <Button onClick={this.handleCancel} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
  }
}

export default SubmitAnswer;