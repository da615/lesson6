import React from "react";
import Art from "./components/artCalculator";
import Mathe from "./components/MathCalulator";
import dataDemo from "./demoData";
import "./App.scss";

import profile, { NameContext, EmailContext } from "./context/profieContext";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _Average: null,
      _Subject: [],
      showArt: true,
      showMath: true,
      extras_Average: null,
      extras: 5,
      email: profile.email,
      nameContext: {
        name: profile.name,
        changeName: this.changeName
      }
    };
    this.extras = {
      art: 0,
      mathe: 0
    };
    dataDemo.aerageChangeCb = _Average => {
      this.setState({
        _Average
      });
      this.handelExtras_Average();
    };
    dataDemo.subjectChangeCb = _Subject => {
      this.setState({
        _Subject
      });
    };
  }
  changeName = e => {
    e.persist();
    this.setState({
      nameContext: { name: e.target.value, changeName: this.changeName }
    });
  };
  handelExtras = e => {
    this.extras[e.code] = e.extras;
  };
  handelExtras_Average = () => {
    let extras_Average = null;
    let totle = 0;
    dataDemo._TotalSubject.forEach(e => {
      totle += e.score + parseInt(this.extras[e.code], 10);
    });
    extras_Average = (totle / dataDemo._TotalSubject.length).toFixed(2);
    this.setState({
      extras_Average
    });
  };
  toggle = e => {
    e.persist();
    const value = e.target.value;
    this.setState({
      [`show${value}`]: !this.state[`show${value}`]
    });
  };
  render() {
    console.log(this.context);
    return (
      <div className="average_warp">
        <p>
          email:<input
            value={this.state.email}
            onChange={e => {
              this.setState({
                email: e.target.value
              });
            }}
            style={{ width: "200px" }}
          />
        </p>
        <p>
          name:{this.state.nameContext.name}
        </p>
        <p>
          _Subject:{this.state._Subject.map(e =>
            <span key={e.code}>
              {e.code}:{e.score}/
            </span>
          )}
        </p>
        <p>
          _Average:{this.state._Average}
        </p>
        <p>
          Extras_Average: {this.state.extras_Average}
        </p>
        <div className="Calculator_warp">
          <div>
            <button onClick={this.toggle} value="Art">
              显示/影藏
            </button>
            <NameContext.Provider value={this.state.nameContext}>
              {this.state.showArt &&
                <Art
                  title="请计算美术成绩"
                  onExtrasChange={this.handelExtras}
                  extrasElm={(extras, handelExtras) => {
                    this.extras.art = extras;
                    return (
                      <p>
                        extras:<input
                          type="number"
                          name="art"
                          value={extras}
                          onChange={handelExtras}
                        />
                      </p>
                    );
                  }}
                />}
            </NameContext.Provider>
          </div>
          <div>
            <button onClick={this.toggle} value="Math">
              显示/影藏
            </button>
            <EmailContext.Provider value={this.state.email}>
              {this.state.showMath &&
                <Mathe title="请计算数学成绩">
                  <p>
                    extras:<input
                      type="range"
                      min="-20"
                      max="20"
                      step="5"
                      name="mathe"
                      value={this.state.extras}
                      onChange={e => {
                        const extras = e.target.value;
                        this.handelExtras({
                          code: "mathe",
                          extras
                        });
                        this.setState({ extras });
                      }}
                    />
                    <span>{this.state.extras}</span>
                  </p>
                </Mathe>}
            </EmailContext.Provider>
          </div>
        </div>
      </div>
    );
  }
}
App.contextType = NameContext;
export default App;
