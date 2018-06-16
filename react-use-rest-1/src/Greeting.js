import React, { Component } from 'react';

const URL = "http://localhost:8080/greeting";

//https://blog.hellojs.org/fetching-api-data-with-react-js-460fe8bbf8f2

class Greeting extends Component {

    

    constructor(props) {
        super(props);

        this.state = {
          data:"no data yest"
        };


        
    }

    //https://developer.okta.com/blog/2017/12/06/bootiful-development-with-spring-boot-and-react
    componentDidMount() {
        fetch('http://localhost:8080/greeting')
            .then(res => {
              return res.json();
            })
            .then(res => {
               this.setState( {data:JSON.stringify(res) });
            })
            .catch(reason=>{
               throw TypeError("bad dataxx" + reason.toString());
            });
    }

    render() {
       return (
         <div className="Greeting">
           <header className="App-header">
             <h1 className="App-title">{this.state.data}</h1>
           </header>

         </div>
       );
     }
}

export default Greeting;

