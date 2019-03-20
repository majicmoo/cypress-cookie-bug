import React from "react";

class Page2 extends React.Component {
  state = {
    authed: false
  };

  componentDidMount() {
    fetch("http://localhost:9000/api/is-authed").then(response => {
      this.setState({ authed: response.status === 200 });
    });
  }

  render() {
    if (this.state.authed) {
      return <h1 id="page-2">Page 2</h1>;
    }
    return <h1 id="page-2">unauthorised</h1>;
  }
}

export default Page2;
