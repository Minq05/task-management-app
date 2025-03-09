import React from "react";

export default function TaskCard({ task, onDelete, onStatusChange }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center mb-3">
      <div>
        <h3 className="font-semibold text-lg text-black">{task.title}</h3>
        <p className="text-sm text-black">Trạng thái: {task.status}</p>
      </div>
      <div className="flex items-center gap-2">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          className="border rounded px-2 py-1 dark:bg-gray-900"
        >
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-black px-3 py-1 rounded hover:bg-red-600"
        >
          Xóa
        </button>
      </div>
    </div>
  );
}
