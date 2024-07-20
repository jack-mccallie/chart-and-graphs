import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface DataItem {
  name: string;
  amd: number;
  nvidia: number;
  amt: number;
}

const data: DataItem[] = [
  { name: '2018', amd: 84, nvidia: 9800, amt: 2290 },
  { name: '2019', amd: 2780, nvidia: 3908, amt: 2000 },
  { name: '2020', amd: 1890, nvidia: 4800, amt: 2181 },
  { name: '2021', amd: 2390, nvidia: 3800, amt: 2500 },
  { name: '2022', amd: 3490, nvidia: 4300, amt: 2100 },
  { name: '2023', amd: 4000, nvidia: 2400, amt: 2400 },
  { name: '2024', amd: 3000, nvidia: 1398, amt: 2210 },
];

const MyBarChart: React.FC = () => (
  <ResponsiveContainer width="90%" height={400}>
    <BarChart
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="amd" fill="#8884d8" />
      <Bar dataKey="nvidia" fill="#82ca9d" />
      <Bar dataKey="amt" fill="#573" />
    </BarChart>
  </ResponsiveContainer>
);

export default MyBarChart;