import React, {Component} from "react";
import ReactDOM from "react-dom";

class App extends Component {

  render () {
    return(
      <>
        <h1>
          A whole new app!
        </h1>
      </>
    )
  }
}

ReactDOM.render(<App/>, document.querySelector("#root"));
