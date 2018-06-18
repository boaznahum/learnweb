import * as React from 'react';
import {Component} from "react";

const DATE_URL = "http://localhost:8080/greeting";
const IMAGE_URL = "http://localhost:8080/image";

// https://blog.hellojs.org/fetching-api-data-with-react-js-460fe8bbf8f2

interface IMyProps {
    hasConsole:boolean;
}

interface IData {
    id:string;
    content:string;
}
interface IMyState {
    data:IData;
    image:string
}


class Greeting extends Component<IMyProps, IMyState> {

    
    constructor(props:IMyProps) {
        super(props);

        this.state = {
          data: {id:"", content:""},
          image:""
        };
    }

    // https://developer.okta.com/blog/2017/12/06/bootiful-development-with-spring-boot-and-react
    public componentDidMount() {
        fetch(DATE_URL)
            .then(res => {
              return res.json();
            })
            .then(res => {
               // this.setState( {data:JSON.stringify(res) });
               this.setState( {data:res });
            })
            .catch(reason=>{
               throw TypeError("bad data" + reason.toString());
            });


        // https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api
        fetch(IMAGE_URL)
            .then(res => {
              return res.blob();
            })
            .then(res => {
               // this.setState( {data:JSON.stringify(res) });
               this.setState( {image:URL.createObjectURL(res) });
            });
        
    }

    public render() {

        let img = null;
        if (this.state.image) {
            img = <img  src={this.state.image}/>
        }

       return (
         <div className="Greeting">
             <header className="App-header">
             <h1 className="App-title">Got data</h1>
               <p>id={this.state.data.id}</p>
               <p>content={this.state.data.content}</p>


               {img}

             </header>

         </div>
       );
     }
}

export default Greeting;

