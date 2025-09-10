import React, { useState } from "react";

const User = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ name: "", age: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || formData.age < 0) return;

    if (editingIndex !== null) {
      const updatedData = [...data];
      updatedData[editingIndex] = formData;
      setData(updatedData);
      setEditingIndex(null);
    } else {
      setData((prev) => [...prev, formData]);
    }

    setFormData({ name: "", age: "" });
  };

  const handleEdit = (index) => {
    setFormData(data[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const filtered = data.filter((_, i) => i !== index);
    setData(filtered);
  };

  const handleCancel = (e) => {
    setFormData({ name: "", age: "" });
    setEditingIndex(null);

  };

  return (
    <div className="container mx-auto py-10 flex flex-col md:flex-row gap-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {editingIndex !== null ? "Update User" : "Create User"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter age"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <button
            type="submit"
            className={`${
              editingIndex !== null
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white py-2 px-4 rounded-lg transition`}
          >
            {editingIndex !== null ? "Update" : "Create"}
          </button>
          {editingIndex !== null && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {data?.map((item, ind) => (
          <div
            key={ind}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition w-full flex h-40 flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-gray-600">Age: {item.age}</p>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => handleEdit(ind)}
                className="bg-yellow-500 rounded-full px-2 py-1 text-white"
              >
                update
              </button>
              <button
                type="button"
                onClick={() => handleDelete(ind)}
                className="bg-red-600 rounded-full px-2 py-1 text-white"
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
