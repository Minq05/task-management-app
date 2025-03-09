import React, { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("⚠️ Vui lòng nhập tên task!");
      return;
    }
    onAdd({ title, status: "todo" });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-5">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nhập task..."
        className="flex-1 border border-gray-300 text-black rounded-lg px-4 py-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-black px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Thêm
      </button>
    </form>
  );
}
