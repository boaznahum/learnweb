import * as React from 'react';
import {Component} from "react";

// @ts-ignore
// import Terminal from 'terminal-in-react';

import Console from 'react-console-component'


class GitTerminal extends Component<{}, {}> {

    // private showMsg: () => string;


    constructor(props: {}) {
        super(props);

        this.state = {};


      //   this.showMsg = () => 'Hello World'
    }


    public render():any {

        {/*
            <div
                style={{
                    alignItems: "center",
                    // display: "flex",
                    height: "10%",
                    justifyContent: "bottom"
                }}
            >
*/}
        const h = (text:string):any => {

            // noinspection TsLint
            //
        };

        // @ts-ignore
        // @ts-ignore
        return (
                <Console
                 handler ={ h }/>
            // </div>
        );
    }


}

export default GitTerminal;



