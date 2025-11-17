import React, { useEffect, useState, useRef, useCallback } from 'react'
import Card from '../../components/Card'
import Button from '../../components/Button'

const API = 'https://jsonplaceholder.typicode.com/posts'

export default function ApiList() {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)

  const controllerRef = useRef(null)

  const fetchPage = useCallback(async (pageToLoad = 1, replace = false) => {
    setLoading(true)
    setError(null)
    try {
      if (controllerRef.current) controllerRef.current.abort()
      controllerRef.current = new AbortController()
      // JSONPlaceholder doesn't support real paging with start/limit query params but we can simulate via params _page &_limit
      const url = `${API}?_page=${pageToLoad}&_limit=${limit}${q ? `&q=${encodeURIComponent(q)}` : ''}`
      const res = await fetch(url, { signal: controllerRef.current.signal })
      if (!res.ok) throw new Error('Network error')
      const data = await res.json()
      // Pagination heuristics: if returned array length < limit => no more
      setItems(prev => replace ? data : [...prev, ...data])
      setHasMore(data.length >= limit)
      setLoading(false)
    } catch (err) {
      if (err.name === 'AbortError') return
      setError(err.message || 'Failed to load')
      setLoading(false)
    }
  }, [limit, q])

  useEffect(() => {
    // initial load or when search changes: replace
    setItems([])
    setPage(1)
    fetchPage(1, true)
  }, [q, fetchPage])

  useEffect(() => {
    if (page === 1) return
    fetchPage(page)
  }, [page, fetchPage])

  function handleSearch(e) {
    setQ(e.target.value)
  }

  // infinite scroll using IntersectionObserver
  const observer = useRef()
  const lastItemRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(p => p + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex gap-2">
          <input value={q} onChange={handleSearch} placeholder="Search posts (client-side)" className="flex-1 rounded-md px-3 py-2 bg-gray-50 dark:bg-gray-700" />
          <Button onClick={() => { setItems([]); setPage(1); fetchPage(1, true) }}>Search</Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, idx) => {
          if (items.length === idx + 1) {
            return (
              <Card key={item.id} className="animate-float" ref={lastItemRef}>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{item.body}</p>
              </Card>
            )
          }
          return (
            <Card key={item.id} className="animate-float">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{item.body}</p>
            </Card>
          )
        })}
      </div>

      <div className="flex items-center justify-center gap-4">
        {loading && <div className="text-sm">Loading...</div>}
        {error && <div className="text-sm text-red-500">{error}</div>}
        {!loading && !hasMore && <div className="text-sm text-gray-500">No more results</div>}
      </div>
    </div>
  )
}
