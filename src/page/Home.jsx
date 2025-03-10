import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import useAuth from "../context/AuthContext";
import { useNavigate } from "react-router";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [isDark, setIsDark] = useState(false);
  const [draggedTaskIndex, setDraggedTaskIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  const { user } = useAuth();
  const nav = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "https://task-management-app-ecci.onrender.com/tasks"
      );
      setTasks(res.data);
    } catch (err) {
      alert("❌ Lỗi khi tải danh sách task!");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async (task) => {
    if (!user || user.username !== "minq05") {
      alert("Bạn không có quyền Thêm dự án! Hãy đăng nhập !");
      nav("/login");
      return;
    } else {
      try {
        await axios.post(
          "https://task-management-app-ecci.onrender.com/tasks",
          task
        );
        alert("✅ Đã thêm task mới!");
        fetchTasks();
      } catch (err) {
        alert("❌ Lỗi khi thêm task!");
        console.error(err);
      }
    }
  };

  const handleDelete = async (id) => {
    if (!user || user.username !== "minq05") {
      alert("Bạn không có quyền Thêm dự án! Hãy đăng nhập !");
      nav("/login");
      return;
    } else {
      if (!window.confirm("Bạn có chắc chắn muốn xóa task này?")) return;
      try {
        await axios.delete(
          `https://task-management-app-ecci.onrender.com/tasks/${id}`
        );
        alert("🗑️ Đã xóa task!");
        fetchTasks();
      } catch (err) {
        alert("❌ Lỗi khi xóa task!");
        console.error(err);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    if (!user || user.username !== "minq05") {
      alert("Bạn không có quyền Thêm dự án! Hãy đăng nhập !");
      nav("/login");
      return;
    } else {
      try {
        const task = tasks.find((t) => t.id === id);
        await axios.put(
          `https://task-management-app-ecci.onrender.com/tasks/${id}`,
          {
            ...task,
            status: newStatus,
          }
        );
        alert("🔄 Cập nhật trạng thái thành công!");
        fetchTasks();
      } catch (err) {
        alert("❌ Lỗi khi cập nhật task!");
        console.error(err);
      }
    }
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  const handleDragStart = (index) => {
    setDraggedTaskIndex(index);
  };

  const handleDrop = (index) => {
    if (draggedTaskIndex === null) return;
    const updatedTasks = [...tasks];
    const [movedItem] = updatedTasks.splice(draggedTaskIndex, 1);
    updatedTasks.splice(index, 0, movedItem);
    setTasks(updatedTasks);
    setDraggedTaskIndex(null);
  };

  // Filtering & Searching
  const filteredTasks = tasks.filter((task) => {
    const matchStatus =
      filterStatus === "all" ? true : task.status === filterStatus;
    const matchSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  // Sorting
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const nameA = a.title.toLowerCase();
    const nameB = b.title.toLowerCase();
    return sortOrder === "asc"
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });

  // Pagination
  const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const currentTasks = sortedTasks.slice(startIndex, startIndex + tasksPerPage);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 px-4 py-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            📋 Task Management App
          </h1>
          <button
            onClick={toggleDarkMode}
            className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Form */}
        <TaskForm onAdd={handleAdd} />

        {/* Search */}
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="🔍 Tìm task theo tiêu đề..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full max-w-md px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          />
        </div>

        {/* Filter & Sort */}
        <div className="flex justify-between items-center mb-5 flex-wrap gap-2">
          <div className="flex gap-2">
            {["all", "todo", "doing", "done"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg border transition ${
                  filterStatus === status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                }`}
              >
                {status === "all"
                  ? "Tất cả"
                  : status === "todo"
                  ? "To Do"
                  : status === "doing"
                  ? "Doing"
                  : "Done"}
              </button>
            ))}
          </div>

          <select
            className="px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">🔼 A-Z</option>
            <option value="desc">🔽 Z-A</option>
          </select>
        </div>

        {/* Task List */}
        {currentTasks.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Không có task nào.
          </p>
        ) : (
          currentTasks.map((task, index) => (
            <div
              key={task.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(index)}
              className="mb-3"
            >
              <TaskCard
                task={task}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            </div>
          ))
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-lg border ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
