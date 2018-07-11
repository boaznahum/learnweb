import * as React from 'react';
import {Component} from "react";
import {connect, Dispatch} from "react-redux";


import Console from 'react-console-component'

import 'react-console-component/main.css';
import {RepoID, setCurrentRepo} from "./repository/Actions";
import {RootState} from "./root/reducer";

// https://github.com/autochthe/react-console/blob/master/docs/example/src/example.tsx


const RUN_COMMAND_URL = "http://localhost:8080/runCommand";


interface IGTerminalState {
    // 1 - local 1, 2 - local 2, 3 - remote
    currentRepo: RepoID;
}

interface IGTerminalProps {
    // 1 - local 1, 2 - local 2, 3 - remote
    sessionID: string;
}

interface IGitTerminalActions {

    setCurrentRepo(repoID: RepoID): void

}

type Sig = IGTerminalProps & IGTerminalState & IGitTerminalActions;


  class GitTerminalUnconnected extends Component<Sig>{


    private child: {
        console?: Console,
    } = {};

    constructor(ops: Sig) {
        super(ops);
    }

    public render(): any {

        // key={this.props.currentRepo.toString()}

        // @ts-ignore
        return <Console ref={ref => this.child.console = ref}
                        key={this.props.currentRepo.toString()}
                        handler={this.handler}
                        promptLabel={this.promptLabel}
            // welcomeMessage={"Welcome to the react-console demo!\nThis is an example of a simple echo console."}
                        autofocus={true}
        />;
    }


    private setStateAfterCommand(newState: any) {

        // @ts-ignore
        // this.child.console.return()

        // @ts-ignore
        this.setState(newState,
            // @ts-ignore
            this.child.console.return
        );

    }

    private handler = (text: string) => {


        if (text === "") {
            this.setStateAfterCommand({});
            return;
        }

        if (text === "1") {
            this.props.setCurrentRepo(RepoID.LOCAL1);
            this.setStateAfterCommand({currentRepo: RepoID.LOCAL1});
            return;
        } else if (text === "2") {
            this.props.setCurrentRepo(RepoID.LOCAL2);
            this.setStateAfterCommand({currentRepo: RepoID.LOCAL2});
            return;
        }
        if (text.toLowerCase() === "r") {
            this.props.setCurrentRepo(RepoID.REMOTE);
            this.setStateAfterCommand({currentRepo: RepoID.REMOTE});
            return;
        } else {
            this.runCommand(text);
            this.setStateAfterCommand({});
        }

    };

    private promptLabel = () => {

        switch (this.props.currentRepo) {
            case RepoID.LOCAL1:
                return "L1>";

            case RepoID.LOCAL2:
                return "L2>";

            case RepoID.REMOTE:
                return "R>";
        }

        return this.props.currentRepo + "> ";
    };


    // @ts-ignore
    private runCommand(command: string) {


        let repoID: string;

        switch (this.props.currentRepo) {

            case RepoID.LOCAL1:
                repoID = "local1";
                break;

            case RepoID.LOCAL2:
                repoID = "local2";
                break;

            case RepoID.REMOTE:
                repoID = "remote";
                break;

            default:
                repoID = "unknown";


        }

        const runCommandURL = RUN_COMMAND_URL + "?sessionID=1&repoID=" + repoID + "&command=" + encodeURIComponent(command);

        // https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api
        // @ts-ignore
        fetch(runCommandURL)
        // @ts-ignore
            .then(res => {

                if (res.ok) {
                     return res.text();
                } else {


                return res.json();
                    // const json = res.json();
                    // // @ts-ignore
                    // return json;
                }

            })
            // @ts-ignore
            .then(res => {
                // this.setState( {data:JSON.stringify(res) });


                if (typeof  res === "string") {
                    // @ts-ignore
                    this.child.console.log(res);

                } else {
                    // @ts-ignore
                    const m = (res as object).message;
                    // @ts-ignore
                    this.child.console.log(m);
                }

                this.setState({},
                    // @ts-ignore
                    this.child.console.return
                );
            });


    }
}
function mapDispatchToProps(dispatch: Dispatch): IGitTerminalActions {
    return {

        setCurrentRepo: (currentRepo: RepoID) => {
            dispatch(setCurrentRepo(currentRepo));
        }

    };
}
const mapStateToProps = (state: RootState, ownProps: IGTerminalProps): IGTerminalState => {

    return {currentRepo: state.app.currentRepo};

};

const GitTerminal = connect (
    mapStateToProps,
    mapDispatchToProps
)(GitTerminalUnconnected);

export default GitTerminal;



