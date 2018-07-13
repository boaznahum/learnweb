import AppBar from 'material-ui/AppBar'
import Button from 'material-ui/FlatButton'
import IconButton from "material-ui/IconButton";
import IconMenu from 'material-ui/IconMenu'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Toolbar from "material-ui/Toolbar";
import * as React from 'react';

import {RepoID, setCurrentRepo} from "../repository/Actions";
import store from '../store'

// https://stackoverflow.com/questions/37186500/how-to-setup-material-ui-for-react-with-typescript

// @ts-ignore
const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

interface AppBarProps {

}

class TerminalBar extends React.Component<AppBarProps> {
    constructor(props: AppBarProps) {
        super(props);
    }

    public render(): React.ReactNode {

        return <MuiThemeProvider muiTheme={getMuiTheme()}>
            <AppBar>

                <Toolbar>
                    <IconMenu
                        iconButtonElement={<IconButton className="icon-menu" color="inherit" aria-label="Menu"/>}/>
                    <Button onClick={this.onItemClick(RepoID.LOCAL1)}>1</Button>
                    <Button onClick={this.onItemClick(RepoID.LOCAL2)}>2</Button>
                    <Button onClick={this.onItemClick(RepoID.REMOTE)}>R</Button>

                </Toolbar>

            </AppBar>
        </MuiThemeProvider>

    }

    private onItemClick(curRepo:RepoID) {

        return () => {
            store.dispatch(setCurrentRepo(curRepo));
        };
    }
}


// export default withStyles(styles)(TerminalBar);
export default TerminalBar;