import * as React from 'react';
import './App.css';
// @ts-ignore
import GitTerminal from "./GitTerminal2";
import Repository from './Repository'

class App extends React.Component {
    public render() {
        return (


            <div className="App">

                <div className="Remote">
                    <Repository repoID="remote" name="Remote" hasConsole={false}/>
                </div>

                <div className="Terminal">
                    <GitTerminal sessionID={"1"}/>
                </div>

                <div className="Local">
                    <Repository repoID="local1" name="Local 1" hasConsole={false}/>
                </div>
                <div className="Local">
                    <Repository repoID="local2" name="Local 2" hasConsole={false}/>
                </div>


            </div>

        );
    }
}

export default App;
