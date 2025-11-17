import React from 'react'

export default function Card({ children, className = '' }) {
    return (
        <div className={`bg-white dark:bg-gray-800 rounded-2xl p-4 card-shadow ${className}`}>
            {children}
        </div>
    )
}
