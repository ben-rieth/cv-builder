import React from "react";
import ResumeDisplay from "./components/ResumeDisplay";
import './App.css';
import ModeContext from "./mode-context";
import ModeSwitchButton from "./components/parts/ModeSwitchButton";
import PrintButton from "./components/parts/PrintButton";

import ReactToPrint from 'react-to-print';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleMode= () => {
      this.setState((state) => ({
        mode: state.mode === "working" ? "preview" : "working"
      }));
    };

    this.state = {
      mode: "working",
      toggleMode: this.toggleMode
    }
  }

  

  render() {

    return (
      <div className="content">
        <ModeContext.Provider value={this.state} >
          <div className="header-container">
            <h1 className="header">CV Builder</h1>
          </div>
          <ModeSwitchButton />
          <ReactToPrint 
            content={() => this.componentRef}
            trigger={() => {
              return this.state.mode === "preview" ? <PrintButton /> : <div></div>;
            }}
          />
          <ResumeDisplay ref={el => (this.componentRef = el)}/>
        </ModeContext.Provider>
      </div>
    );
  }
}

export default App;
