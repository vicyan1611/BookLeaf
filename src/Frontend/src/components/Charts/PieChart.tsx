'use client';

import { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

{/* Sample Data for the pie chart */}
const weeklyData = [
    { name: 'Book A', readingTime: 4.5 }, // 4 hours 30 minutes
    { name: 'Book B', readingTime: 3.0 }, // 3 hours
];
  
const monthlyData = [
    { name: 'Book A', readingTime: 14 }, 
    { name: 'Book B', readingTime: 13.2 }, 
    { name: 'Book C', readingTime: 12.25 }, 
    { name: 'Book D', readingTime: 11.75 }, 
];
  
const yearlyData = [
    { name: 'Book A', readingTime: 14.5 }, 
    { name: 'Book B', readingTime: 23.0 }, 
    { name: 'Book C', readingTime: 32.25 }, 
    { name: 'Book D', readingTime: 11.75 }, 
    { name: 'Book E', readingTime: 40.5 }, 
    { name: 'Book F', readingTime: 33.0 }, 
    { name: 'Book G', readingTime: 22.25 }, 
    { name: 'Book H', readingTime: 11.75 }, 
];

{/* Pastel colors for the pie chart (max 10 books) */}
const COLORS = ['#36B5B0', '#9DD8C8', '#2E5077', '#FCF5B0', '#4DA1A9', '#FFF574', '#A1D6CB', '#79D7BE', '#FF19D0', '#474E93'];

{/* Function to format the time (for the sake of consistency) */}
const formatTime = (time: number) => {
  const hours = Math.floor(time);
  const minutes = Math.round((time - hours) * 60);
  return `${hours}h ${minutes}m`;
};

const PieChartComponent = () => {
    const [timePeriod, setTimePeriod] = useState('Week'); // Default time period is 'Week'
    const data =
        timePeriod === 'Week'
        ? weeklyData 
        : timePeriod === 'Month'
        ? monthlyData
        : yearlyData;

    return (
    <div>
      {/* Dropdown to select the time period */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="timePeriod" style={{ marginRight: '10px' }}>
          View Data Period:
        </label>
        <select
          id="timePeriod"
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
        >
          <option value="Week">Week</option>
          <option value="Month">Month</option>
          <option value="Year">Year</option>
        </select>
      </div>

    {/* Pie Chart */}
    <ResponsiveContainer width={260} height={260}>
        <PieChart>
            <Pie
                data={data}
                dataKey="readingTime"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label={({ name, readingTime }) => `${name} (${formatTime(readingTime)})`}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip formatter={(value) => formatTime(value as number)} />
            <Legend verticalAlign="top" height={36} />
        </PieChart>
    </ResponsiveContainer>
    </div>
    );
}

export default PieChartComponent;