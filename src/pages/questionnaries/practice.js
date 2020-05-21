import React from 'react';  
import './practice.css';
import Questionnaries from '../questionnaries/questionnaries';

class Pracpopup extends React.Component {    
  render() {    
    return (  
      <div className='popup'>  
        <div className='popup_inner'>
          <img
            src={require("../../img/close.png")} 
            onClick={this.props.closePopup} 
            style={{position:"absolute",top:0,right:0,width:30,cursor:"pointer",opacity:0.5}} 
          />        
          <div style={{backgroundColor:"rgba(0,0,0,0.05)", margin: 20, borderRadius: 20, padding: 20}}>
            <h1 style={{textAlign: "center", margin: "0 0 -20px", fontSize: 25 }}>{this.props.title}</h1>
            <h1 style={{textAlign: "left", margin: "20px 20px 0", fontWeight: "unset" }}>{this.props.content}</h1>    
          </div>
          <Questionnaries close={this.props.closePopup} id={this.props.id} />
        </div>  
      </div>  
    );  
  }  
}  

export default Pracpopup;