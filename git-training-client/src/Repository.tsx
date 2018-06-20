import * as React from 'react';
import {Component} from "react";


const DATE_URL = "http://localhost:8080/greeting";
const IMAGE_URL = "http://localhost:8080/image";

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
}


class Repository extends Component<IProps, IState> {

    private imageRefreshID: string;


    constructor(props: IProps) {
        super(props);

        this.state = {
            data: {id: "", content: ""},
            image: ""
        };

        this.imageRefreshID = "";

    }

    // https://developer.okta.com/blog/2017/12/06/bootiful-development-with-spring-boot-and-react
    public componentDidMount() {
        fetch(DATE_URL)
            .then(res => {
                return res.json();
            })
            .then(res => {
                // this.setState( {data:JSON.stringify(res) });
                this.setState({data: res});
            })
            .catch(reason => {
                // throw TypeError("bad data" + reason.toString());
            });


        this.fetchImage();

        setInterval(() => {
            this.imageRefreshID = new Date().toTimeString();
            this.fetchImage();
        }, 3000);

    }


    public render() {

        let img = null;
        if (this.state.image) {
            img = <img  src={this.state.image}/>
        }

        return (
            <table className="Repository">
                <tr>
                    <td><h3>{this.props.name}</h3></td>
                </tr>
                <tr className="HistoryRow">
                    <td className="HistoryImage"> {img}</td>
                </tr>

            </table>
        );
    }

    private fetchImage() {

        const imageURL = IMAGE_URL + "?sessionID=1&repoID=" + this.props.repoID + "&dummy=" + this.imageRefreshID;

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

}

export default Repository;

