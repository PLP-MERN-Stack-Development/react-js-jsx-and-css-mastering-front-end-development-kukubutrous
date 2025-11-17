import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'
import Button from './Button'

export default function Navbar() {
    const { theme, toggleTheme } = useContext(ThemeContext)

    return (
        <nav className="w-full border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="text-xl font-bold text-brand-500">MyReactApp</div>
                    <div className="hidden md:flex gap-3">
                        <NavLink to="/" className={({ isActive }) => isActive ? 'text-brand-500' : 'text-gray-600 dark:text-gray-300'}>Home</NavLink>
                        <NavLink to="/tasks" className={({ isActive }) => isActive ? 'text-brand-500' : 'text-gray-600 dark:text-gray-300'}>Tasks</NavLink>
                        <NavLink to="/api" className={({ isActive }) => isActive ? 'text-brand-500' : 'text-gray-600 dark:text-gray-300'}>API</NavLink>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="secondary" size="sm" onClick={toggleTheme}>
                        {theme === 'dark' ? 'Light' : 'Dark'}
                    </Button>
                </div>
            </div>
        </nav>
    )
}
