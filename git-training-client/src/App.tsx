import * as React from 'react';
import './App.css';
// @ts-ignore
import Repository from './Repository.tsx'

class App extends React.Component {
    public render() {
        return (


            <table className="App">
                <tr>
                    <td className="Remote" colSpan={2}>
                        <Repository repoID="remote" name="Remote" hasConsole={false}/>
                    </td>
                </tr>
                <tr>
                    <td className="Local">
                        <Repository repoID="local1" name="Local 1" hasConsole={true}/>
                    </td>

                    <td className="Local">
                        <Repository repoID="local2" name="Local 2" hasConsole={true}/>
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
