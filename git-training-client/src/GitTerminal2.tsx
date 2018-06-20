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

    private handler = (text: string) => {


        // @ts-ignore
        // this.child.console.log(text);
        // @ts-ignore
        this.setState({},
            // @ts-ignore
            this.child.console.return
        );

        if (text === "1") {
            this.setState({currentRepo:RepoID.L1});
            return;
        } else if (text === "2") {
            this.setState({currentRepo:RepoID.L2});
            return;
        }
        if (text.toLowerCase() === "r") {
            this.setState({currentRepo:RepoID.R});
            return;
        } else {
            this.runCommand(text);
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

        const imageURL = RUN_COMMAND_URL + "?sessionID=1&repoID=" + repoID + "&command=" + encodeURIComponent(command);

        // https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api
        fetch(imageURL)
            .then(res => {
                return res.text();
            })
            .then(res => {
                // this.setState( {data:JSON.stringify(res) });

                // @ts-ignore
                this.child.console.log(res);
                this.setState({},
                    // @ts-ignore
                    this.child.console.return
                );
            });


    }
}

export default GitTerminal;



