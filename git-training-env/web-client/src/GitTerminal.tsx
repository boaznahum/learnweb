import * as React from 'react';
import {Component} from 'react';
import {connect, Dispatch} from "react-redux";


import Console from 'react-console-component'

import 'react-console-component/main.css';
import {ChangeInHandlerAction, IGTerminalState} from "./GitTerminalState";
import {ActionTypes, RepoID, setCurrentRepo} from "./repository/Actions";
import {RootState} from "./root/reducer";

// https://github.com/autochthe/react-console/blob/master/docs/example/src/example.tsx

const SERVER_URL = "http://localhost:8080/";
const RUN_COMMAND_URL = SERVER_URL + "runCommand";
const RESTART_URL = SERVER_URL + "restartSession";




interface IGTerminalProps {
    // 1 - local 1, 2 - local 2, 3 - remote
    sessionID: string;
}

interface IGitTerminalActions {

    // for general use, should be removed
    dispatch:Dispatch;

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
                        handler={this.handler}
                        promptLabel={this.promptLabel}
            // welcomeMessage={"Welcome to the react-console demo!\nThis is an example of a simple echo console."}
                        autofocus={true}
        />;
    }


    public componentWillReceiveProps(nextProps: Readonly<Sig>, nextContext: any): void {

        if ( this.props.inHandler && ! nextProps.inHandler) {
            // @ts-ignore
            this.child.console.return()
        }

    }


    private changeInHandler(inHandler:boolean) {

        const doIt = () => {

            const action: ChangeInHandlerAction = {

                type: ActionTypes.SET_IN_HANDLER_STATE,
                payload: {inHandler}

            };

            this.props.dispatch(action)
        }

        if (inHandler) {
            doIt();
        } else {
            setTimeout(doIt, 1)
        }

    }

    private finishHandler() {

        this.changeInHandler(false);

        // @ts-ignore
        // this.child.console.return()

        // @ts-ignore
        // this.setState(newState,
        //     // @ts-ignore
        //     this.child.console.return
        // );

    }

    private handler = (text: string) => {

        this.changeInHandler(true);

        let command = text;

        while (command) {
            let nextCommand = command;
            const indexOf = command.indexOf("\n");

            if (indexOf !== -1) {
                nextCommand = command.substr(0,indexOf);
                command = command.substr(indexOf+1);
            } else {
                command = "";
            }
            
             const log = this.child.console;

            if(log) {
                log.log("command=" +command);
                log.log("nextCommand=" +nextCommand);
            }

            // @ts-ignore
            // this.child.console.log("nextCommand=" +nextCommand);


            if (nextCommand === "") {
                this.finishHandler();
                // return;
            } else if (nextCommand === ":1") {
                this.props.setCurrentRepo(RepoID.LOCAL1);
                this.finishHandler();
                // return;
            } else if (nextCommand === ":2") {
                this.props.setCurrentRepo(RepoID.LOCAL2);
                this.finishHandler();
                // return;
            } else if (nextCommand.toLowerCase() === ":r") {

                this.props.setCurrentRepo(RepoID.REMOTE);
                this.finishHandler();
                // return;
                // } else if (text.toLowerCase() === ":pause") {
                //     this.props.setCurrentRepo(RepoID.REMOTE);
                //
                //     this.setStateAfterCommand({currentRepo: RepoID.REMOTE});
                //     return;
            } else if (nextCommand === ":restart") {
                this.restartSession();
                this.props.setCurrentRepo(RepoID.LOCAL1);
                this.finishHandler();
            }else if (nextCommand.toLowerCase().startsWith("@")) {

                // const file = nextCommand.substr(1);
                // alert(file)
                // this.readTextFile("F:\\views\\g\\git_training_env\\1.txt");
                // console.info(file)
                command = ":1\ngit ec aaa\ngit push\n:2\ngit pull";

                // this.props.setCurrentRepo(RepoID.REMOTE);
                // this.setStateAfterCommand({});
                // return;
            } else {
                this.runCommand(nextCommand);
                this.finishHandler();
            }
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
    private restartSession() {
        this.runRest(RESTART_URL+"?sessionID=1");
    }

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

        this.runRest(runCommandURL);
    }

    private runRest(url:string) {

        // https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api
        // @ts-ignore
        fetch(url)
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

    // private loadFile() {
    //     var reader = new FileReader();
    //     var file = new File("F:\\views\\g\\git_training_env\\1.txt");
    //     reader.readAsText();
    // }
    // private readTextFile(file: string)
    // {
    //     const rawFile = new XMLHttpRequest();
    //     rawFile.open("GET", file, false);
    //     rawFile.onreadystatechange = () => {
    //         if(rawFile.readyState === 4)
    //         {
    //             if(rawFile.status === 200 || rawFile.status === 0)
    //             {
    //                 const allText = rawFile.responseText;
    //                 alert(allText);
    //             }
    //         }
    //     };
    //     rawFile.send(null);
    // }
}
function mapDispatchToProps(dispatch: Dispatch): IGitTerminalActions {
    return {

        dispatch,
        setCurrentRepo: (currentRepo: RepoID) => {
            dispatch(setCurrentRepo(currentRepo));
        }

    };
}
const mapStateToProps = (state: RootState, ownProps: IGTerminalProps): IGTerminalState => {

    return {
        currentRepo: state.app.currentRepo,
        inHandler:state.terminalState.inHandler
    };

};

const GitTerminal = connect (
    mapStateToProps,
    mapDispatchToProps
)(GitTerminalUnconnected);

export default GitTerminal;



