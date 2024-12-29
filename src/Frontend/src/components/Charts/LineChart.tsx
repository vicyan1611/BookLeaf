'use client';

import { useState } from 'react';
import {
  LineChart,
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

{/* Sample Data for the line chart */}
const weeklyData = [
  { name: 'Week 1', readingTime: 2.5 },
  { name: 'Week 2', readingTime: 3.2 },
  { name: 'Week 3', readingTime: 4.0 },
  { name: 'Week 4', readingTime: 3.7 },
];

const monthlyData = [
  { name: 'January', readingTime: 10.0 },
  { name: 'February', readingTime: 8.0 },
  { name: 'March', readingTime: 12.5 },
];

const yearlyData = [
  { name: '2022', readingTime: 120 },
  { name: '2023', readingTime: 150 },
  { name: '2024', readingTime: 130 },
];

{/* Function to format the time (for the sake of consistency) */}
const formatTime = (time: number) => {
  const hours = Math.floor(time);
  const minutes = Math.round((time - hours) * 60);
  return `${hours}h ${minutes}m`;
};

const LineChartComponent = () => {
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

      {/* Line Chart */}
      <ResponsiveContainer width={260} height={260}>
        <LineChart data={data} margin={{ top: 40, right: 10, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" label={{ value: 'Time Period', position: 'insideBottom', offset: -5 }} />
          <YAxis
            label={{ value: 'Reading Time', angle: -90, position: 'insideLeft' }}
            tickFormatter={(tick) => `${tick}h`}
          />
          <Tooltip formatter={(value) => formatTime(value as number)} />
          <Legend verticalAlign="top" height={36} />
          <Line type="monotone" dataKey="readingTime" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
