import * as React from "react";
import {Component} from "react";
import {connect, Dispatch} from "react-redux";
import {RepoID, setImageID} from "./Actions";
import Helper from "./Helper";
import {IRepositoryProps} from "./Reducer";
import Repository from "./Repository";


const IMAGE_ID_URL = "http://localhost:8080/imageID";


function createRepoElement(ops: IRepositoryProps): React.ReactNode {
    return <Repository repoID={ops.repoID} name={ops.name}/>
}


interface IRepositoriesActions {

    setImageID(repoID: RepoID, imageID: string): void

}

// Repositories manager
type Sig = {} & {} & IRepositoriesActions;

const RepositoriesManager = class  extends Component<Sig> {
    constructor(ops: Sig) {
        super(ops)
    }


    public render(): React.ReactNode {
        return null;
    }

    public componentDidMount() {

        this.fetchImagesID();

        setInterval(() => {
            this.fetchImagesID();
        }, 3000);

    }

    private fetchImagesID() {

        this.fetchImageID(RepoID.LOCAL1);
        this.fetchImageID(RepoID.LOCAL2);
        this.fetchImageID(RepoID.REMOTE);

    }

    private fetchImageID(repoID: RepoID) {

        const uniqueID = new Date().toTimeString();
        const imageURL = IMAGE_ID_URL + "?sessionID=1&repoID=" +
            Helper.serverRepoID(repoID) + "&dummy=" +
            encodeURIComponent(uniqueID);

        // https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api
        fetch(imageURL)
            .then(res => {
                return res.text();
            })
            .then(res => {

                const id: string = res.toString();

                // notify repository about image id
                this.props.setImageID(repoID, id);
                // this.props.dispatch(Actions.setImageID(repoID, id))

                // this.setState({imageRefreshID: id});
            });
    }
};

function mapDispatchToProps(dispatch: Dispatch): IRepositoriesActions {
    return {

        setImageID: (repoID: RepoID, imageID) => {
            dispatch(setImageID(repoID, imageID));
        }

    };
}

const RepositoriesManagerConnected = connect<{},IRepositoriesActions, void> (
    null,
    mapDispatchToProps
)(RepositoriesManager);


const Repositories = {

    RepositoriesManager:RepositoriesManagerConnected,

    createRepoElement

};


export default Repositories;


// export declare const Repositories = {
//
//
//
//
// };

