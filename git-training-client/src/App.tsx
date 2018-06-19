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
                        <Repository repoID="remote" name="Remote" hasConsole={true}/>
                    </td>
                </tr>
                <tr>
                    <td className="Local">
                        <Repository repoID="local1" name="Local 1" hasConsole={false}/>
                    </td>

                    <td className="Local">
                        <Repository repoID="local2" name="Local 2" hasConsole={false}/>
                    </td>
                </tr>

            </table>

        );
    }
}

export default App;
