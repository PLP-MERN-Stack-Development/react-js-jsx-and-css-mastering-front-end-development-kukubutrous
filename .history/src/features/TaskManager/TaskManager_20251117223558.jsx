import React, { useEffect, useMemo, useState } from 'react'
import useLocalStorage from './useLocalStorage'
import Card from '../../components/Card'
import Button from '../../components/Button'

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <input type="checkbox" checked={task.completed} onChange={()=>onToggle(task.id)} />
        <div className={task.completed ? 'line-through text-gray-400' : 'text-gray-800 dark:text-gray-100'}>
          {task.title}
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="danger" size="sm" onClick={() => onDelete(task.id)}>Delete</Button>
      </div>
    </div>
  )
}

export default function TaskManager() {
  const [tasks, setTasks] = useLocalStorage('tasks', [])
  const [title, setTitle] = useState('')
  const [filter, setFilter] = useState('all') // all, active, completed

  function addTask(e) {
    e.preventDefault()
    if (!title.trim()) return
    const newTask = { id: Date.now(), title: title.trim(), completed: false }
    setTasks(prev => [newTask, ...prev])
    setTitle('')
  }

  function toggleTask(id) {
    setTasks(prev => prev.map(t => t.id === id ? {...t, completed: !t.completed} : t))
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const filtered = useMemo(() => {
    if (filter === 'active') return tasks.filter(t => !t.completed)
    if (filter === 'completed') return tasks.filter(t => t.completed)
    return tasks
  }, [tasks, filter])

  useEffect(() => {
    // example side-effect: limit to 200 tasks
    if (tasks.length > 200) {
      setTasks(tasks.slice(0, 200))
    }
  }, [tasks, setTasks])

  return (
    <Card className="space-y-4">
      <h2 className="text-xl font-semibold">Task Manager</h2>

      <form onSubmit={addTask} className="flex gap-2">
        <input
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className="flex-1 rounded-lg border px-3 py-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          placeholder="Add a new task..."
        />
        <Button type="submit">Add</Button>
      </form>

      <div className="flex gap-2">
        <Button variant={filter==='all' ? 'primary' : 'secondary'} size="sm" onClick={()=>setFilter('all')}>All</Button>
        <Button variant={filter==='active' ? 'primary' : 'secondary'} size="sm" onClick={()=>setFilter('active')}>Active</Button>
        <Button variant={filter==='completed' ? 'primary' : 'secondary'} size="sm" onClick={()=>setFilter('completed')}>Completed</Button>
      </div>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-sm text-gray-500">No tasks</div>
        ) : (
          filtered.map(task => (
            <div key={task.id} className="p-2 rounded-md bg-gray-50 dark:bg-gray-800">
              <TaskItem task={task} onToggle={toggleTask} onDelete={deleteTask} />
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
