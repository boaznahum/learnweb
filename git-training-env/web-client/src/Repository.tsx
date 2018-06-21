import * as React from 'react';
import {Component} from "react";


const IMAGE_URL = "http://localhost:8080/image";
const IMAGE_ID_URL = "http://localhost:8080/imageID";

// https://blog.hellojs.org/fetching-api-data-with-react-js-460fe8bbf8f2

interface IProps {
    hasConsole: boolean;
    name: string;
    repoID: string;
}

interface IData {
    id: string;
    content: string;
}

interface IState {
    data: IData;
    image: string;
    imageRefreshID: string;
}


class Repository extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            data: {id: "", content: ""},
            image: "",
            imageRefreshID: ""
        };


    }

    // https://developer.okta.com/blog/2017/12/06/bootiful-development-with-spring-boot-and-react
    public componentDidMount() {

        this.fetchImageID();

        setInterval(() => {
            this.fetchImageID();
        }, 3000);

    }


    public render() {

        const id = this.state.imageRefreshID;

        const imageURL = IMAGE_URL + "?sessionID=1&repoID=" + this.props.repoID + "&dummy=" + encodeURIComponent(id);


        return (
            <div className="HistoryImage">
                <h3>{this.props.name}</h3>

                <img  src={imageURL}/>

            </div>
        );
    }

    private fetchImageID() {

        const uniqueID = new Date().toTimeString();
        const imageURL = IMAGE_ID_URL + "?sessionID=1&repoID=" + this.props.repoID + "&dummy=" +
            encodeURIComponent(uniqueID);

        // https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api
        fetch(imageURL)
            .then(res => {
                return res.text();
            })
            .then(res => {

                const id: string = res.toString();

                this.setState({imageRefreshID: id});
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

}

export default Repository;

