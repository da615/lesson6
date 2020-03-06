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
      email: profile.email,
      name: profile.name
    };
    this.extras = {
      art: 0,
      mathe: 5
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
  changeContextValue = e => {
    e.persist();
    //在当前组件修改要显示的2个context值 一个name， 一个email
  };
  handelExtras = e => {
    //同步附加分数到当前组件
  };
  handelExtras_Average = () => {
    // 计算带附加分的平均数
  };
  toggle = e => {
    e.persist();
    //显示隐藏计算器组件
  };
  render() {
    return (
      <div className="average_warp">
        <p>
          email:{/*显示和修改Email.context的值*/}
        </p>
        <p>
          name:{/*显示nameContext的值*/}
        </p>
        <p>
          _Subject:{/*显示没有计算附加分的科目code与对应的分数*/}
        </p>
        <p>
          _Average:{/*显示没有计算附加分数后的平均分*/}
        </p>
        <p>
          Extras_Average: {/*显示计算附加分数后的平均分*/}
        </p>
        <div className="Calculator_warp">
          <div>
            <button onClick={this.toggle} value="Art">
              显示/影藏
            </button>
            {/*通过NameContext.Provider向Art组件提供相关值*/}
            {/*在<Art>组件上通过自定义属性传值利用 prop render的方式在子组件渲染附加分数的组件，并且实现在子组件修改附加分值的时候要在当前组件保存附加分数的值*/}
            {this.state.showArt && <Art title="请计算美术成绩" />}
          </div>
          <div>
            <button onClick={this.toggle} value="Math">
              显示/影藏
            </button>
            {/*通过EmailContext.Provider向Mathe组件提供相关值*/}
            {this.state.showMath &&
              <Mathe title="请计算数学成绩">
                {/*在<Mathe>组件的内部定义附加分数的组件，并且实现能同步修改和显示附加分数的值*/}
              </Mathe>}
          </div>
        </div>
      </div>
    );
  }
}
export default App;
