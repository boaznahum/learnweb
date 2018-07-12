import * as React from 'react';
import {Component} from 'react';
import {connect, Dispatch} from "react-redux";


import Console from 'react-console-component'

import 'react-console-component/main.css';
import {AnyAction} from "redux";
import {
    ChangeInHandlerAction,
    IGTerminalState,
    TerminalPlayDoneAction, TerminalPlayNextLineAction,
    TerminalPlayStartAction
} from "./GitTerminalState";
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
    dispatch: Dispatch;

    setCurrentRepo(repoID: RepoID): void

}

type Sig = IGTerminalProps & IGTerminalState & IGitTerminalActions;


class GitTerminalUnconnected extends Component<Sig> {


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

        if (this.props.inHandler && !nextProps.inHandler) {
            // @ts-ignore
            this.child.console.return()
        }

    }


    private changeInHandler(inHandler: boolean) {

        const doIt = () => {

            const action: ChangeInHandlerAction = {

                type: ActionTypes.SET_IN_HANDLER_STATE,
                payload: {inHandler}

            };

            this.props.dispatch(action)
        };

        if (inHandler) {
            doIt();
        } else {
            setTimeout(doIt, 10)
        }

    }

    private finishHandler() {

        this.changeInHandler(false);

    }

    private startPlay(lines: string[]) {

        const log = this.child.console;

        if (log) {
            log.log("Will play next command: '" + lines[0] + "'");
        }

        const action: TerminalPlayStartAction = {

            type: ActionTypes.TERMINAL_PLAY_START,
            payload: {
                playLines: lines
            }

        };

        this.props.dispatch(action);
    }

    private playNextLine() {

        if (!this.props.isPlaying) {
            return
        }

        let currentLine = this.props.currentLine;
        ++currentLine;

        // compute if last or not
        let done: boolean = false;

        if (currentLine >= this.props.playLines.length) {
            done = true;
        }

        let action: AnyAction;

        if (done) {


            const a: TerminalPlayDoneAction = {

                type: ActionTypes.TERMINAL_PLAY_DONE,

            };

            action = a;

        } else {

            const log = this.child.console;

            if (log) {
                log.log("Will play next command: '" + this.props.playLines[currentLine] + "'");
            }

            const a: TerminalPlayNextLineAction = {

                type: ActionTypes.TERMINAL_PLAY_NEXT_LINE,
                payload: {
                    currentLine: this.props.currentLine + 1
                }

            };

            action = a;
        }


        this.props.dispatch(action);
    }

    private stopPlay() {
        const action: TerminalPlayDoneAction = {

            type: ActionTypes.TERMINAL_PLAY_DONE,

        };

        this.props.dispatch(action);
    }


    private handler = (text: string) => {

        this.changeInHandler(true);

        let nextCommand = text;



        // @ts-ignore
        // this.child.console.log("nextCommand=" +nextCommand);


        if (nextCommand === "") {

            if (this.props.isPlaying) {
                nextCommand = this.props.playLines[this.props.currentLine];

                const log = this.child.console;

                if (log) {
                    log.log("Playing next command: '" + nextCommand + "'");
                }

            }
        }

        if (nextCommand === "") {


            this.finishHandler();
            // return;
        } else if (nextCommand === ":1") {
            this.props.setCurrentRepo(RepoID.LOCAL1);
            this.playNextLine();
            this.finishHandler();
            // return;
        } else if (nextCommand === ":2") {
            this.props.setCurrentRepo(RepoID.LOCAL2);
            this.playNextLine();
            this.finishHandler();
            // return;
        } else if (nextCommand.toLowerCase() === ":r") {

            this.props.setCurrentRepo(RepoID.REMOTE);
            this.playNextLine();
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
            this.playNextLine();
            // this.finishHandler();
        } else if (nextCommand.toLowerCase().startsWith("@")) {

            const lines = [
                ":1",
                "git ec aaa",
                "git push",
                ":2",
                "git pull"
            ];

            this.startPlay(lines);
            this.finishHandler();
        } else if (nextCommand.toLowerCase().startsWith("!")) {



            this.stopPlay();
            this.finishHandler();
        } else {
            this.runCommand(nextCommand);
            // this.finishHandler();
        }


    };

    private promptLabel = () => {

        let prompt="?>";

        switch (this.props.currentRepo) {
            case RepoID.LOCAL1:
                prompt = "L1>";
                break;

            case RepoID.LOCAL2:
                prompt = "L2>";
                break;

            case RepoID.REMOTE:
                prompt = "R>";
                break;

        }

        if (this.props.isPlaying) {
            prompt = "*" + prompt;
        }

        return  prompt;
    };

    // @ts-ignore
    private restartSession() {
        this.runRest(RESTART_URL+"?sessionID=1", true);
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

        this.runRest(runCommandURL, true);
    }

    private runRest(url: string, callFinish:boolean) {

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

                this.playNextLine();
                this.finishHandler();
            }).then (res => {
                if (callFinish) {
                    this.finishHandler();
                }
            }
        );


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
        inHandler: state.terminalState.inHandler,
        isPlaying:state.terminalState.isPlaying,
        currentLine:state.terminalState.currentLine,
        playLines:state.terminalState.playLines
    };

};

const GitTerminal = connect(
    mapStateToProps,
    mapDispatchToProps
)(GitTerminalUnconnected);

export default GitTerminal;



