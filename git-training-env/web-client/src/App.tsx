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

        // let name1:string = "Local 1";
        // let name2:string = "Local 2";
        // let remote:string = "Remote";
        //
        // if (this.props.currentRepo === RepoID.LOCAL1) {
        //     name1 += "*";
        // } else if (this.props.currentRepo === RepoID.LOCAL2) {
        //     name2 += "*";
        // } if (this.props.currentRepo === RepoID.REMOTE) {
        //     remote += "*";
        // }

        const name1:string = "Local 1";
        const name2:string = "Local 2";
        const remote:string = "Remote";


        return (


            <div className="App">

                <Repositories.RepositoriesManager />

                <div className={this.props.currentRepo === RepoID.REMOTE ? "Remote Current" : "Remote"} >

                    { Repositories.createRepoElement({ repoID:RepoID.REMOTE, name:remote})}
                </div>

                <div className="Terminal">
                    <GitTerminal sessionID={"1"}/>
                    {// <input type="file" id="fileinput" />
                    }

                </div>

                <div className={this.props.currentRepo === RepoID.LOCAL1 ? "Local Current" : "Local"}>
                    { Repositories.createRepoElement({ repoID:RepoID.LOCAL1, name:name1})}
                </div>
                <div className={this.props.currentRepo === RepoID.LOCAL2 ? "Local Current" : "Local"}>
                    { Repositories.createRepoElement({ repoID:RepoID.LOCAL2, name:name2})}
                </div>


            </div>

        );
    }
    // function readSingleFile(evt) {
    //     //Retrieve the first (and only!) File from the FileList object
    //     var f = evt.target.files[0];
    //
    //     if (f) {
    //         var r = new FileReader();
    //         r.onload = function(e) {
    //             var contents = e.target.result;
    //             alert( "Got the file.n"
    //                 +"name: " + f.name + "n"
    //                 +"type: " + f.type + "n"
    //                 +"size: " + f.size + " bytesn"
    //                 + "starts with: " + contents.substr(1, contents.indexOf("n"))
    //             );
    //         }
    //         r.readAsText(f);
    //     } else {
    //         alert("Failed to load file");
    //     }
    // }
    //
    // document.getElementById('fileinput').addEventListener('change', readSingleFile, false);
}

const mapStateToProps = (state: RootState, ownProps: IAppProps): IAppState => {

    return state.app;

};

export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(App);



