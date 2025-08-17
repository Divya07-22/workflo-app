import React, { useMemo } from 'react';
// Import React and useMemo hook for memoizing computed data

import { useSelector } from 'react-redux';
// useSelector to access Redux state

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// Import Recharts components for building Pie and Bar charts

import { selectAllTasks } from '../features/tasks/tasksSlice';
// Selector to get all tasks from Redux store

import ChartCard from '../components/specific/reports/ChartCard';
// Custom card component to display a chart

import Card from '../components/common/Card';
// Reusable card component for general UI

const ReportsPage = () => {
  const tasks = useSelector(selectAllTasks);
  // Get all tasks from Redux store

  // Compute tasks grouped by their status (To Do, In Progress, Done)
  const tasksByStatus = useMemo(() => {
    const counts = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});
    // Transform counts object into array suitable for Recharts
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [tasks]);

  // Compute tasks grouped by their priority (High, Medium, Low)
  const tasksByPriority = useMemo(() => {
    const counts = tasks.reduce((acc, task) => {
        acc[task.priority] = (acc[task.priority] || 0) + 1;
        return acc;
    }, {});
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [tasks]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  // Colors for Pie chart segments

  return (
    <div className="space-y-8">
      {/* Page title */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
      
      {tasks.length > 0 ? (
        // Display charts only if there is task data
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Pie chart: Tasks by Status */}
          <ChartCard title="Tasks by Status">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={tasksByStatus} 
                  cx="50%" cy="50%" 
                  labelLine={false} 
                  outerRadius={120} 
                  fill="#8884d8" 
                  dataKey="value" 
                  nameKey="name" 
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {tasksByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Bar chart: Tasks by Priority */}
          <ChartCard title="Tasks by Priority">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tasksByPriority} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700"/>
                <XAxis dataKey="name" tick={{ fill: 'rgb(156 163 175)' }}/>
                <YAxis allowDecimals={false} tick={{ fill: 'rgb(156 163 175)' }}/>
                <Tooltip cursor={{fill: 'rgba(128, 128, 128, 0.1)'}} contentStyle={{ backgroundColor: 'rgb(31 41 55)', border: '1px solid rgb(55 65 81)' }}/>
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

        </div>
      ) : (
        // If no task data is available, show a message inside a card
        <Card>
            <p className="text-center text-gray-500 dark:text-gray-400">
              No task data available to generate reports.
            </p>
        </Card>
      )}
    </div>
  );
};

export default ReportsPage;
// Export the ReportsPage component
