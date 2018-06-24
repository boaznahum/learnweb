import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {IRepositoryProps, IRepositoryState} from "./Reducer";

import {RootState} from "../root/reducer";

import {Action, Dispatch} from "redux";
import * as Actions from "./Actions"
import {RepoID} from "./Actions"

const IMAGE_URL = "http://localhost:8080/image";
const IMAGE_ID_URL = "http://localhost:8080/imageID";

// https://blog.hellojs.org/fetching-api-data-with-react-js-460fe8bbf8f2

// https://github.com/reduxjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
// https://github.com/jaysoo/todomvc-redux-react-typescript/blob/master/client/main/components/App.tsx

type Sig = IRepositoryProps & IRepositoryState & { dispatch:Dispatch<Action> };

class Repository extends Component<Sig> {

    constructor(props: Sig) {
        super(props);
    }

    // https://developer.okta.com/blog/2017/12/06/bootiful-development-with-spring-boot-and-react
    public componentDidMount() {

        this.fetchImageID();

        setInterval(() => {
            this.fetchImageID();
        }, 3000);

    }


    public render() {

        const id = this.props.imageRefreshID;

        const imageURL = IMAGE_URL + "?sessionID=1&repoID=" + this.serverRepoID() + "&dummy=" + encodeURIComponent(id);


        return (
            <div className="HistoryImage">
                <h3>{this.props.name}</h3>

                <img  src={imageURL}/>

            </div>
        );
    }

    private fetchImageID() {

        const uniqueID = new Date().toTimeString();
        const imageURL = IMAGE_ID_URL + "?sessionID=1&repoID=" + this.serverRepoID() + "&dummy=" +
            encodeURIComponent(uniqueID);

        // https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api
        fetch(imageURL)
            .then(res => {
                return res.text();
            })
            .then(res => {

                const id: string = res.toString();

                this.props.dispatch(Actions.setImageID(this.props.repoID, id))

                // this.setState({imageRefreshID: id});
            });
    }

    /*
    private fetchImage() {

        const imageURL = IMAGE_URL + "?sessionID=1&repoID=" + this.props.repoID + "&dummy=" + encodeURIComponent(this.imageRefreshID);

        // https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api
        fetch(imageURL)
            .then(res => {
                return res.blob();
            })
            .then(res => {
                // this.setState( {data:JSON.stringify(res) });
                this.setState({image: URL.createObjectURL(res)});
            });
    }
    */

    private serverRepoID():string {
        switch (this.props.repoID) {
            case RepoID.LOCAL1:
                return "local1";
            case RepoID.LOCAL2:
                return "local2";
            case RepoID.REMOTE:
                return "remote";

            default:
                return "unknown;"
        }
    }

}

/**
 * // https://github.com/reduxjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
 * The way we define it, the props passed to constructor contains:
 *   IRepositoryState
 *   Props moved to component on creation (because we combine it)
 *   And because we didn't pass mapDispatchToProps then also we get a dispatcher (? is it true)
 *
 * @param state
 * @param ownProps
 */
const mapStateToProps = (state:RootState, ownProps:IRepositoryProps):IRepositoryState => {

    return state.repo[ownProps.repoID];

};

export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(Repository);

