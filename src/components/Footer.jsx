import React from 'react'

export default function Footer() {
    return (
        <footer className="w-full border-t border-gray-200 dark:border-gray-700 mt-8">
            <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-3">
                <div className="text-sm">© {new Date().getFullYear()} MyReactApp. All rights reserved.</div>
                <div className="flex gap-4 text-sm">
                    <a href="#" className="hover:underline">Privacy</a>
                    <a href="#" className="hover:underline">Terms</a>
                </div>
            </div>
        </footer>
    )
}
