import React from 'react'
import clsx from 'clsx' // optional; if not installed you can use template strings

export default function Button({ children, variant = 'primary', className = '', size = 'md', ...props }) {
  const base = 'inline-flex items-center gap-2 font-medium rounded-lg transition-transform active:scale-95'
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-5 py-3 text-lg'
  }
  const variants = {
    primary: 'bg-brand-500 text-white hover:bg-brand-700',
    secondary: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100 hover:opacity-90',
    danger: 'bg-red-500 text-white hover:bg-red-600'
  }
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
