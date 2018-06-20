import * as React from 'react';
import {Component} from "react";


import Console from 'react-console-component'

import 'react-console-component/main.css';

// https://github.com/autochthe/react-console/blob/master/docs/example/src/example.tsx

// noinspection TsLint
interface IEchoConsoleState {
    count: number;
}

class GitTerminal extends Component<{}, IEchoConsoleState> {



    private child: {
        console?: Console,
    } = {};

    constructor(props: {}) {
        super(props);

        this.state = {
            count: 0,
        };
    }

    public render(): any {


        // @ts-ignore
        return <Console ref={ref => this.child.console = ref}
                        handler={this.echo}
                        promptLabel={this.promptLabel}
                        welcomeMessage={"Welcome to the react-console demo!\nThis is an example of a simple echo console."}
                        autofocus={true}
        />;
    }

    private echo = (text: string) => {

        // @ts-ignore
        this.child.console.log(text);

        // @ts-ignore
        this.setState({
                count: this.state.count + 1,
            },
            // @ts-ignore
            this.child.console.return
        );
    };

    private promptLabel = () => {
        return this.state.count + "> ";
    };






}

export default GitTerminal;



