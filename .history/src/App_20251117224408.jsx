import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './routes/Home'
import TasksPage from './routes/TasksPage'
import ApiPage from './routes/ApiPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="api" element={<ApiPage />} />
      </Route>
    </Routes>
  )
}
