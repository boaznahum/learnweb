import * as React from 'react';
import './App.css';
// @ts-ignore
import GitTerminal from "./GitTerminal2";
import {RepoID} from "./repository/Actions";
import Repository from './repository/Repository'

class App extends React.Component {
    public render() {
        return (


            <div className="App">

                <div className="Remote">
                    <Repository repoID={RepoID.REMOTE} name="Remote" hasConsole={false}/>
                </div>

                <div className="Terminal">
                    <GitTerminal sessionID={"1"}/>
                </div>

                <div className="Local">
                    <Repository repoID={RepoID.LOCAL1} name="Local 1" hasConsole={false}/>
                </div>
                <div className="Local">
                    <Repository repoID={RepoID.LOCAL2} name="Local 2" hasConsole={false}/>
                </div>


            </div>

        );
    }
}

export default App;
