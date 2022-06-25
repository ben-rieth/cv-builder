import React from "react";
import ResumeDisplay from "./components/ResumeDisplay";
import './App.css';
import ModeContext from "./mode-context";
import ModeSwitchButton from "./components/parts/ModeSwitchButton";

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
          <ResumeDisplay />
        </ModeContext.Provider>
      </div>
    );
  }
}

export default App;
