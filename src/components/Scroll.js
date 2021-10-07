import { Component } from "react";

class Scroll extends Component {
  render() {
    return (
      <div
        style={{
          overflowY: "scroll",
          height: "600px",
        }}>
        {this.props.children}
      </div>
    );
  }
}

export default Scroll;
