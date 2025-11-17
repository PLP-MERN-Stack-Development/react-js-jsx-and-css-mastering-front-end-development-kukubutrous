import React from 'react'
import Card from '../components/Card'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-2xl font-bold">Week 3 — React, JSX & Tailwind</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Build components, use hooks, integrate an API, and style with Tailwind.</p>
        <div className="mt-4 flex gap-2">
          <Link to="/tasks" className="px-4 py-2 rounded-lg bg-brand-500 text-white">Go to Tasks</Link>
          <Link to="/api" className="px-4 py-2 rounded-lg bg-accent-500 text-white">View API</Link>
        </div>
      </Card>
    </div>
  )
}
