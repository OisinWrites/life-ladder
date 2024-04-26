import React, { useState, useEffect } from 'react';
import '../static/borrowing-style.css';
import { handleNumericChange, handleFormattedDisplay, handleFormattedDisplayTwoDecimal } from '../utilities/FormatNumber'


const BorrowingCapacityCalculator = ({
        applicants,
        setApplicants,
        firstTimeBuyer,
        setFirstTimeBuyer, 
        salary1, 
        setSalary1, 
        salary2, 
        setSalary2,
        maxBorrowableAmount,
        setMaxBorrowableAmount,
        displaySwap,
        displayWarning,
        handleToggleComplete,
        estimatedPropertyValue 
        }) => {

    const multiplier = firstTimeBuyer === 'Yes' ? 4 : 3.5;
    const formattedMaxBorrowableAmount = maxBorrowableAmount !== null ? handleFormattedDisplayTwoDecimal(parseFloat(maxBorrowableAmount)) : null;
    const formattedEstimatedPropertyValue = estimatedPropertyValue !== null ? handleFormattedDisplayTwoDecimal(parseFloat(estimatedPropertyValue)) : null;

    const [showInput, setShowInput] = useState(false);

    return (
        <div>
            {displaySwap ? ( 
            <div>
                <h2>Borrowing Capacity Calculator</h2>
                <button onClick={handleToggleComplete}>Edit Section</button>
                <p>Number of Applicants: {applicants}</p>
                <p>{firstTimeBuyer === 'Yes' ? "First Time Buyer" : "Second Time Buyer"}</p>
                <p>Max Borrowable Amount: {formattedMaxBorrowableAmount}</p>
                <p>Property Value at max LTV of 90%: {formattedEstimatedPropertyValue}</p>
            </div>                
            ) : (
            <div>
                <h2>Borrowing Capacity Calculator</h2>
                {displayWarning && <p>Complete this section before moving on.</p>}
                
                <div className='applicants'>
                    <button
                        className={applicants === 1 ? 'active' : ''}
                        onClick={() => setApplicants(1)}
                    >
                        1 Applicant
                    </button>
                    <button
                        className={applicants === 2 ? 'active' : ''}
                        onClick={() => setApplicants(2)}
                    >
                        2 Applicants
                    </button>
                </div>
                <div className='salaries'>
                    <input
                        type="text"
                        placeholder="Applicant 1's Salary"
                        value={handleFormattedDisplay(salary1)}
                        onChange={(e) => handleNumericChange(e.target.value, setSalary1)}
                        />
                    {applicants === 2 && (
                        <input
                            type="text"
                            placeholder="Applicant 2's Salary"
                            value={handleFormattedDisplay(salary2)}
                            onChange={(e) => handleNumericChange(e.target.value, setSalary2)}
                        />
                    )}
                </div>
                <div className='first-time-buyers'>
                    <p>
                        {applicants === 2 ? 'Are you both first-time buyers?' : 'Are you a first-time buyer?'}
                    </p>
                    <div>
                        <button
                            className={firstTimeBuyer === 'Yes' ? 'active' : ''}
                            onClick={() => setFirstTimeBuyer('Yes')}
                        >
                            Yes
                        </button>
                        <button
                            className={firstTimeBuyer === 'No' ? 'active' : ''}
                            onClick={() => setFirstTimeBuyer('No')}
                        >
                            No
                        </button>
                    </div>
                </div>
                <div className='multiplier'>
                    <p>Mortgage Borrowing Multiplier: {multiplier}x</p>
                </div>
                <div className='max-borrowable'>
                    <p>Max Borrowable Amount: {formattedMaxBorrowableAmount}</p>
                    <p>Property Value at max LTV of 90%: {formattedEstimatedPropertyValue}</p>
                </div>
                <div className='manual-quote'>
                    <button onClick={() => setShowInput(!showInput)}>
                        {showInput ? 'Hide Input' : 'Update Max Borrowable Amount'}
                    </button>
                    {showInput && (
                        <input
                        type="text"
                        value={handleFormattedDisplay(maxBorrowableAmount)} // Handle null by replacing it with an empty string for input
                        onChange={(e) => handleNumericChange(e.target.value, setMaxBorrowableAmount)}
                        placeholder="Enter new amount"
                        />
                    )}
                </div>
            </div>
            )}
        </div>
    );
};

export default BorrowingCapacityCalculator;
