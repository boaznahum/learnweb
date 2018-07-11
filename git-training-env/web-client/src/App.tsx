import * as React from 'react';
import './App.css';
// @ts-ignore
import GitTerminal from "./GitTerminal";
import {RepoID} from "./repository/Actions";
import Repositories from './repository/Repositories'

class App extends React.Component {
    public render() {
        return (


            <div className="App">

                <Repositories.RepositoriesManager />

                <div className="Remote" >

                    { Repositories.createRepoElement({ repoID:RepoID.REMOTE, name:"Remote"})}
                </div>

                <div className="Terminal">
                    <GitTerminal sessionID={"1"}/>
                </div>

                <div className="Local">
                    { Repositories.createRepoElement({ repoID:RepoID.LOCAL1, name:"Local 1"})}
                </div>
                <div className="Local">
                    { Repositories.createRepoElement({ repoID:RepoID.LOCAL2, name:"Local 2"})}
                </div>


            </div>

        );
    }
}

export default App;
