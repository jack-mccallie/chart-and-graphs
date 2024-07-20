import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BarChart } from 'recharts';
import MyBarChart from './models/BarChart';
import MyLineGraph from './models/MyLineGraph';

import ForceGraph from './models/ForceGraph';
import { link } from 'fs';

const nodes = [
  { id: '1', group: 1 },
  { id: '2', group: 1 },
  { id: '3', group: 2 },
  { id: '4', group: 2 },
];

const links = [
  { source: '1', target: '2' },
  { source: '2', target: '3' },
  { source: '3', target: '4' },
  { source: '4', target: '1' },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ForceGraph nodes={nodes} links= {links} />
      </header>
    </div>
  );
}

export default App;
