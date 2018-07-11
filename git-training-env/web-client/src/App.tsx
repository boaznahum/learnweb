import * as React from 'react';
import {connect} from "react-redux";
import './App.css';
import {IAppState} from "./AppState";
// @ts-ignore
import GitTerminal from "./GitTerminal";
import {RepoID} from "./repository/Actions";
import Repositories from './repository/Repositories'
import {RootState} from "./root/reducer";


interface IAppProps {}

type Sig = IAppProps & IAppState & {};


class App extends React.Component<Sig> {
    public render() {

        let name1:string = "Local 1";
        let name2:string = "Local 2";
        let remote:string = "Remote";

        if (this.props.currentRepo === RepoID.LOCAL1) {
            name1 += "*";
        } else if (this.props.currentRepo === RepoID.LOCAL2) {
            name2 += "*";
        } if (this.props.currentRepo === RepoID.REMOTE) {
            remote += "*";
        }


        return (


            <div className="App">

                <Repositories.RepositoriesManager />

                <div className="Remote" >

                    { Repositories.createRepoElement({ repoID:RepoID.REMOTE, name:remote})}
                </div>

                <div className="Terminal">
                    <GitTerminal sessionID={"1"}/>
                </div>

                <div className="Local">
                    { Repositories.createRepoElement({ repoID:RepoID.LOCAL1, name:name1})}
                </div>
                <div className="Local">
                    { Repositories.createRepoElement({ repoID:RepoID.LOCAL2, name:name2})}
                </div>


            </div>

        );
    }
}

const mapStateToProps = (state: RootState, ownProps: IAppProps): IAppState => {

    return state.app;

};

export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(App);



