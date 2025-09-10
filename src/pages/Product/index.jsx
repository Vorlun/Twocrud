import React, { useState, useCallback, useMemo } from "react";

const Product = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    discount: 0,
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (
        !formData.title ||
        !formData.price ||
        formData.discount < 0 ||
        formData.discount > 100
      )
        return;

      if (editingIndex !== null) {
        const updatedData = [...data];
        updatedData[editingIndex] = formData;
        setData(updatedData);
        setEditingIndex(null);
      } else {
        setData((prev) => [...prev, formData]);
      }

      setFormData({ title: "", price: "", discount: 0 });
    },
    [formData, data, editingIndex]
  );

  const handleEdit = useCallback(
    (ind) => {
      setEditingIndex(ind);
      setFormData(data[ind]);
    },
    [data]
  );

  const handleDelete = useCallback((ind) => {
    setData((prev) => prev.filter((_, i) => i !== ind));
  }, []);

  const handleCancel = useCallback(() => {
    setFormData({ title: "", price: "", discount: 0 });
    setEditingIndex(null);
  }, []);

  const productCards = useMemo(
    () =>
      data.map((item, ind) => (
        <div
          key={ind}
          className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition w-full flex h-40 flex-col justify-between"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {item.title}
            </h3>
            <p className="text-gray-600">Price: ${item.price}</p>
            <p className="text-gray-600">Discount: {item.discount}%</p>
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
      )),
    [data, handleEdit, handleDelete]
  );

  return (
    <div className="container mx-auto py-38 flex flex-col md:flex-row gap-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {editingIndex !== null ? "Update Product" : "Create Product"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter product title"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter product price"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            placeholder="Enter discount %"
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
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {productCards}
      </div>
    </div>
  );
};

export default React.memo(Product);
