import React, { Component } from "react";

class Product extends Component {
  state = {
    data: [],
    formData: { title: "", price: "", discount: 0 },
    editingIndex: null,
  };

  handleChange = (e) => {
    this.setState((prev) => ({
      formData: {
        ...prev.formData,
        [e.target.name]: e.target.value,
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { formData, data, editingIndex } = this.state;

    if (
      !formData.title ||
      !formData.price ||
      formData.price < 0 ||
      formData.discount < 0 ||
      formData.discount > 100
    )
      return;

    if (editingIndex !== null) {
      const updatedData = [...data];
      updatedData[editingIndex] = formData;
      this.setState({
        data: updatedData,
        editingIndex: null,
        formData: { title: "", price: "", discount: 0 },
      });
    } else {
      this.setState((prev) => ({
        data: [...prev.data, formData],
        formData: { title: "", price: "", discount: 0 },
      }));
    }
  };

  handleEdit = (ind) => {
    this.setState({
      editingIndex: ind,
      formData: this.state.data[ind],
    });
  };

  handleDelete = (ind) => {
    this.setState((prev) => ({
      data: prev.data.filter((_, i) => i !== ind),
    }));
  };

  handleCancel = () => {
    this.setState({
      formData: { title: "", price: "", discount: 0 },
      editingIndex: null,
    });
  };

  render() {
    const { data, formData, editingIndex } = this.state;

    return (
      <div className="container mx-auto py-38 flex flex-col md:flex-row gap-8">
        <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {editingIndex !== null ? "Update Product" : "Create Product"}
          </h2>

          <form onSubmit={this.handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={this.handleChange}
              placeholder="Enter product title"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={this.handleChange}
              placeholder="Enter product price"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={this.handleChange}
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
                onClick={this.handleCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {data.map((item, ind) => (
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
                <p>
                  Total Price: $
                  {(item.price - (item.price * item.discount) / 100).toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => this.handleEdit(ind)}
                  className="bg-yellow-500 rounded-full px-2 py-1 text-white"
                >
                  update
                </button>
                <button
                  type="button"
                  onClick={() => this.handleDelete(ind)}
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
  }
}

export default Product;
