import React, { useEffect, useState } from 'react'
import PWABadge from './components/PWABadge'
import TodoItem from './components/TodoItems'

const STORAGE_KEY = 'pwa_todo_items_v1'

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2,7)
}

export default function App(){
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

  useEffect(() => {
    // load from localStorage
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try { setTodos(JSON.parse(raw)) } catch(e) { setTodos([]) }
    }
  }, [])

  useEffect(() => {
    // persist whenever todos change
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function addTodo(){
    const v = text.trim()
    if (!v) return
    const newTodo = { id: uid(), text: v, done: false, created_at: new Date().toISOString() }
    setTodos(prev => [newTodo, ...prev])
    setText('')
  }

  function toggleDone(id){
    setTodos(prev => prev.map(t => t.id===id ? {...t, done: !t.done} : t))
  }

  function removeTodo(id){
    if(!confirm('Hapus todo ini?')) return
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  function startEdit(id){
    const t = todos.find(x=>x.id===id)
    setEditingId(id); setEditingText(t.text)
  }

  function saveEdit(){
    const v = editingText.trim()
    if (!v) return
    setTodos(prev => prev.map(t => t.id===editingId ? {...t, text: v} : t))
    setEditingId(null); setEditingText('')
  }

  function clearAll(){
    if(!confirm('Hapus semua todo?')) return
    setTodos([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-8">
      <div className="max-w-xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">PWA Todo</h1>
          <p className="text-sm text-slate-600">Todo list kecil dengan PWA + offline (localStorage).</p>
        </header>

        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <div className="flex gap-2">
            <input value={text} onChange={e=>setText(e.target.value)} placeholder="Tambahkan todo..." className="flex-1 px-4 py-2 border rounded-lg" />
            <button onClick={addTodo} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Tambah</button>
          </div>

          <div className="flex gap-2 mt-3">
            <button onClick={() => setTodos(todos.map(t=>({...t, done: true})))} className="px-3 py-1 border rounded">Tandai semua selesai</button>
            <button onClick={() => setTodos(todos.map(t=>({...t, done: false})))} className="px-3 py-1 border rounded">Reset selesai</button>
            <button onClick={clearAll} className="px-3 py-1 text-red-600 border rounded">Hapus semua</button>
          </div>
        </div>

        <div className="space-y-3">
          {todos.length===0 && <div className="text-center text-slate-500">Belum ada todo</div>}
          {todos.map(todo => (
            <TodoItem key={todo.id}
              todo={todo}
              onToggle={() => toggleDone(todo.id)}
              onDelete={() => removeTodo(todo.id)}
              onEdit={() => startEdit(todo.id)}
            />
          ))}
        </div>

        {/* Edit modal inline */}
        {editingId && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-lg p-4 w-full max-w-md">
              <h3 className="font-medium mb-2">Edit Todo</h3>
              <input className="w-full px-3 py-2 border rounded" value={editingText} onChange={e=>setEditingText(e.target.value)} />
              <div className="flex gap-2 justify-end mt-3">
                <button onClick={()=>{setEditingId(null);setEditingText('')}} className="px-3 py-1 border rounded">Batal</button>
                <button onClick={saveEdit} className="px-3 py-1 bg-blue-600 text-white rounded">Simpan</button>
              </div>
            </div>
          </div>
        )}

        <PWABadge />
      </div>
    </div>
  )
}
