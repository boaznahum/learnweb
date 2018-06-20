import * as React from 'react';
import './App.css';

// @ts-ignore
import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
        <div className="wrapper">
            <div className="box a">A</div>
            <div className="box b">B</div>
            <div className="box c">C</div>
            <div className="box d">D</div>
        </div>

    );
  }
}

export default App;
