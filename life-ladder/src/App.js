import React, { useState, useEffect } from 'react';
import './App.css';

import { handleFormattedDisplay } from './utilities/FormatNumber'

import BorrowingCapacityCalculator from './components/BorrowingCapacityCalculator';

function App() {
  const [applicants, setApplicants] = useState(1);
  const [firstTimeBuyer, setFirstTimeBuyer] = useState(null);
  const [salary1, setSalary1] = useState(null);
  const [salary2, setSalary2] = useState(null);
  const [maxBorrowableAmount, setMaxBorrowableAmount] = useState(null);
  const [displaySwap, setDisplaySwap] = useState(false);  // State to control display logic
  const [displayWarning, setDisplayWarning] = useState(false);
  const [estimatedPropertyValue, setEstimatedPropertyValue] = useState(0);

  const handleHeaderClick = () => {
    if (borrowingSectionComplete) {
      setDisplaySwap(true);   // Allow swap if conditions are met
      setDisplayWarning(false); // Ensure warning is not shown if conditions are met
    } else {
      setDisplayWarning(true); // Show warning if conditions are not met
      setDisplaySwap(false);   // Prevent swap if conditions are not met
    }
  };

  const handleToggleComplete = () => {
    setDisplaySwap(false);
    setDisplayWarning(false);
  };

  const borrowingSectionComplete = salary1 !== null &&
                                   firstTimeBuyer !== null &&
                                   (applicants === 1 || (applicants === 2 && salary2 !== null));

  const multiplier = firstTimeBuyer === 'Yes' ? 4 : 3.5;

  useEffect(() => {
      let totalSalary = parseFloat(salary1) || 0;
      if (applicants === 2) {
          totalSalary += parseFloat(salary2) || 0;
      }
      const calculatedAmount = totalSalary * multiplier;
      setMaxBorrowableAmount(calculatedAmount);
  }, [salary1, salary2, applicants, multiplier]);
  
  useEffect(() => {
    if (maxBorrowableAmount) {
        const calculatedValue = (maxBorrowableAmount / 9) * 10;
        setEstimatedPropertyValue(calculatedValue);
    }
    }, [maxBorrowableAmount]);

  return (
    <div className="App">
      <header className="App-header" onClick={handleHeaderClick}>
        <h1 className="display-1">Life Ladder</h1>
        <br></br>
        <h2>Mortgage and Savings Calculator</h2>

      </header>
      <main>
      <div>
        <BorrowingCapacityCalculator
          applicants={applicants}
          setApplicants={setApplicants}
          firstTimeBuyer={firstTimeBuyer}
          setFirstTimeBuyer={setFirstTimeBuyer}
          salary1={salary1}
          setSalary1={setSalary1}
          salary2={salary2}
          setSalary2={setSalary2}
          maxBorrowableAmount={maxBorrowableAmount}
          setMaxBorrowableAmount={setMaxBorrowableAmount}
          displaySwap={displaySwap}
          displayWarning={displayWarning}
          handleToggleComplete={handleToggleComplete}
          estimatedPropertyValue={estimatedPropertyValue}
        />
      </div>
      </main>
    </div>
  );
}

export default App;
