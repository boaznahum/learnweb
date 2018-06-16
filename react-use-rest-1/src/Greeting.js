import React, { Component } from 'react';

const DATE_URL = "http://localhost:8080/greeting";
const IMAGE_URL = "http://localhost:8080/image";

//https://blog.hellojs.org/fetching-api-data-with-react-js-460fe8bbf8f2

class Greeting extends Component {

    
    constructor(props) {
        super(props);

        this.state = {
          data:"no data yest",
          image:null
        };
    }

    //https://developer.okta.com/blog/2017/12/06/bootiful-development-with-spring-boot-and-react
    componentDidMount() {
        fetch(DATE_URL)
            .then(res => {
              return res.json();
            })
            .then(res => {
               //this.setState( {data:JSON.stringify(res) });
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
               //this.setState( {data:JSON.stringify(res) });
               this.setState( {image:URL.createObjectURL(res) });
            });
        
    }

    render() {

        var img = null;
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

