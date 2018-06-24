import * as React from 'react';
import {Component} from "react";


import Console from 'react-console-component'

import 'react-console-component/main.css';

// https://github.com/autochthe/react-console/blob/master/docs/example/src/example.tsx


const RUN_COMMAND_URL = "http://localhost:8080/runCommand";

enum RepoID {

    L1,
    L2,
    R

}

interface IGTerminalState {
    // 1 - local 1, 2 - local 2, 3 - remote
    currentRepo: RepoID;
}

interface IGTerminalProps {
    // 1 - local 1, 2 - local 2, 3 - remote
    sessionID: string;
}


class GitTerminal extends Component<IGTerminalProps, IGTerminalState> {


    private child: {
        console?: Console,
    } = {};

    constructor(props: IGTerminalProps) {
        super(props);

        this.state = {
            currentRepo: RepoID.L1
        };
    }

    public render(): any {


        // @ts-ignore
        return <Console ref={ref => this.child.console = ref}
                        handler={this.handler}
                        promptLabel={this.promptLabel}
            // welcomeMessage={"Welcome to the react-console demo!\nThis is an example of a simple echo console."}
                        autofocus={true}
        />;
    }


    private setStateAfterCommand(newState: any) {

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
            this.setStateAfterCommand({currentRepo: RepoID.L1});
            return;
        } else if (text === "2") {
            this.setStateAfterCommand({currentRepo: RepoID.L2});
            return;
        }
        if (text.toLowerCase() === "r") {
            this.setStateAfterCommand({currentRepo: RepoID.R});
            return;
        } else {
            this.runCommand(text);
            this.setStateAfterCommand({});
        }

    };

    private promptLabel = () => {

        switch (this.state.currentRepo) {
            case RepoID.L1:
                return "L1>";

            case RepoID.L2:
                return "L2>";

            case RepoID.R:
                return "R>";
        }

        return this.state.currentRepo + "> ";
    };


    // @ts-ignore
    private runCommand(command: string) {


        let repoID: string;

        switch (this.state.currentRepo) {

            case RepoID.L1:
                repoID = "local1";
                break;

            case RepoID.L2:
                repoID = "local2";
                break;

            case RepoID.R:
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

export default GitTerminal;



