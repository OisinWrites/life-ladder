import './App.css';

import BorrowingCapacityCalculator from './components/BorrowingCapacityCalculator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="display-1">Life Ladder</h1>
        <br></br>
        <h2>Mortgage and Savings Calculator</h2>

      </header>
      <main>
      <div>
      <BorrowingCapacityCalculator/>
      </div>
      </main>
    </div>
  );
}

export default App;
