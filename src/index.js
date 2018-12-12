import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import "turn.js";

import "./styles.css";

class Turn extends React.Component {
  static defaultProps = {
    style: {},
    className: "",
    options: {}
  };

  componentDidMount() {
    if (this.el) {
      $(this.el).turn(Object.assign({}, this.props.options));
    }
    document.addEventListener("keydown", this.handleKeyDown, false);
  }

  componentWillUnmount() {
    if (this.el) {
      $(this.el)
        .turn("destroy")
        .remove();
    }
    document.removeEventListener("keydown", this.handleKeyDown, false);
  }

  handleKeyDown = event => {
    if (event.keyCode === 37) {
      $(this.el).turn("previous");
    }
    if (event.keyCode === 39) {
      $(this.el).turn("next");
    }
  };

  render() {
    return (
      <div
        className={this.props.className}
        style={Object.assign({}, this.props.style)}
        ref={el => (this.el = el)}
      >
        {this.props.children}
      </div>
    );
  }
}

const options = {
  width: 800,
  height: 600,
  autoCenter: true,
  display: "double",
  acceleration: true,
  elevation: 50,
  gradients: !$.isTouch,
  when: {
    turned: function(e, page) {
      console.log("Current view: ", $(this).turn("view"));
    }
  }
};

const pages = [
  "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/01.jpg",
  "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/02.jpg",
  "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/03.jpg",
  "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/04.jpg",
  "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/05.jpg",
  "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/06.jpg"
];

const App = () => {
  return (
    <Turn options={options} className="magazine">
      {pages.map((page, index) => (
        <div key={index} className="page">
          <img src={page} alt="" />
        </div>
      ))}
    </Turn>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
