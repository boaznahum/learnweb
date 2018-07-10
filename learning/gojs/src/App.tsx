import * as React from 'react';
import './App.css';


import x from 'go-d'


import GojsDiagram from 'react-gojs'

class App extends React.Component {
  public render() {
    return (
      <div className="App">

          <GojsDiagram
              diagramId="myDiagramDiv"
              model={this.props.model}
              createDiagram={this.createDiagram}
              className="myDiagram"
              onModelChange={this.modelChangedhandler}
          />

      </div>
    );
  }
}

export default App;
