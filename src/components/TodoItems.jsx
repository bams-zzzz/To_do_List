import React from 'react'

export default function TodoItem({ todo, onToggle, onDelete, onEdit }){
  return (
    <div className={`flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border ${todo.done? 'opacity-60': ''}`}>
      <div className="flex items-center gap-3">
        <input type="checkbox" checked={todo.done} onChange={onToggle} className="w-4 h-4" />
        <div>
          <div className={`text-sm ${todo.done ? 'line-through text-slate-500' : 'text-slate-800'}`}>{todo.text}</div>
          <div className="text-xs text-slate-400">{new Date(todo.created_at).toLocaleString()}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onEdit} className="text-sm px-2 py-1 border rounded">Edit</button>
        <button onClick={onDelete} className="text-sm px-2 py-1 text-red-600 border rounded">Hapus</button>
      </div>
    </div>
  )
}
