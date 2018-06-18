import * as React from 'react';
import './App.css';
// @ts-ignore
import Greeting from './Greeting'

class App extends React.Component {
    public render() {
        return (


            <table className="App">
                <tr>
                    <td className="Remote" colSpan={2}>
                        <h3>Remote</h3>


                    </td>
                </tr>
                <tr>
                    <td className="Local">
                        <h3>Local 1</h3>

                    </td>

                    <td className="Local">
                        <h3>Local 2</h3>

                    </td>
                </tr>

            </table>

            /*
                    <div className="App">
                    <header className="App-header">
                      <img src={logo} className="App-logo" alt="logo" />
                      <h1 className="App-title">Welcome to Type Script</h1>
                    </header>
                    <p className="App-intro">
                      To get started, edit <code>src/App.tsx</code> and save to reload.
                    </p>

                    <Greeting hasConsole={false}/>
                  </div>
            */
        );
    }
}

export default App;
