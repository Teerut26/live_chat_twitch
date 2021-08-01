import React, { Component } from "react";
import tmi from "tmi.js";

export default class LiveChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      List: null,
      client: new tmi.Client({
        channels: [this.props.name],
      }),
    };
  }

  componentDidMount() {
    this.state.client.connect().then((string, number)=>console.log(string,number));
    var obj = [];
    this.state.client.on("message", (channel, tags, message, self) => {
      if (obj.length != null && obj.length <= 15) {
        obj.push({
          name: tags["display-name"],
          content: message,
          timeStamp: new Date().toJSON(),
          color:tags['color'] || "#efeff1"
        });
      } else {
        obj.splice(0, 1);
        obj.push({
          name: tags["display-name"],
          content: message,
          timeStamp: new Date().toJSON(),
          color:tags['color'] || "#efeff1"
        });
      }
      this.setState({ List: obj });
      console.log(this.state.client.host())

    });
  }
  
  componentWillUnmount(){
    this.state.client.disconnect().then((string, number)=>console.log(string,number))
  }

  componentDidUpdate() {
    // console.log(this.state.List);
  }

  render() {
    if (!this.state.List) {
      return <></>;
    }

    return (
      <div>
        <div className="h-100 d-flex flex-column align-items-start bg-dark">
          {this.state.List.map((item) => (
            <div className="d-flex flex-column align-items-start m-1 bg-dark">
              <div
                className="p-1 d-inline-flex rounded-3 "
                title={`GMT+7 | ${new Date(item.timeStamp).toLocaleString(
                  "th-TH"
                )}`}
              >
                <div>
                  <b style={{color: item.color}} >{item.name} :</b>
                </div>
                <div>&nbsp; {item.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
