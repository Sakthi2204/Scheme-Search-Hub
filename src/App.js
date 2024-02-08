// src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [employment, setEmployment] = useState('');
    const [annualIncome, setAnnualIncome] = useState('');
    const [community, setCommunity] = useState('');
    const [firstGraduate, setFirstGraduate] = useState('');
    const [result, setResult] = useState([]);

    const checkEligibility = async () => {
        const response = await fetch('http://localhost:5000/check-eligibility', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                age,
                gender,
                employment,
                annualIncome,
                community,
                firstGraduate,
            }),
        });
        if (!response.ok) {
          console.error(`Fetch error: ${response.statusText}`);
          return;
        }

        const data = await response.json();
        setResult(data);
    };

    return (
        <div className="App">
            <h1>Eligibility Criteria App</h1>
            <label htmlFor="age">Age:</label>
            <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
            <label htmlFor="gender">Gender:</label>
            <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="All">All</option>
            </select>
            <label htmlFor="employment">Employment:</label>
            <select id="employment" value={employment} onChange={(e) => setEmployment(e.target.value)}>
                <option value="">Select Employment</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
            <label htmlFor="annualIncome">Annual Income:</label>
            <input type="text" id="annualIncome" value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)} />
            <label htmlFor="community">Community:</label>
            <input type="text" id="community" value={community} onChange={(e) => setCommunity(e.target.value)} />
            <label htmlFor="firstGraduate">First Graduate:</label>
            <select id="firstGraduate" value={firstGraduate} onChange={(e) => setFirstGraduate(e.target.value)}>
                <option value="">Select First Graduate</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
            <button onClick={checkEligibility}>Check Eligibility</button>
            <div>
                <h2>Eligible Users:</h2>
                <ul>
                    {result.map((user) => (
                        <li key={user.Name}>{`Name: ${user.Name}, Age: ${user.Age}, Gender: ${user.Gender}, Employment: ${user.Employment}, Annual Income: ${user.AnnualIncome}, Community: ${user.Community}, First Graduate: ${user.FirstGraduate}`}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;

