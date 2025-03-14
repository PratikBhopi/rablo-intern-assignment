import React, { useState } from "react";

const AddProduct = ({openAddProduct,setOpenAddProduct}) => {
  const [formData, setFormData] = useState({
    productId: "",
    name: "",
    rating: "",
    company: "",
    price: "",
    featured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please login.");
      return;
    }
    console.log(formData);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/product/add-product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            rating: parseFloat(formData.rating),
            price: parseFloat(formData.price),
          }),
        }
      );
      const data= await response.json();
      if(data.message=='unauthorized' || response.status==401){
        navigate('/')
      }
      if (data.sucess) {
        alert("Product added successfully!");
        setOpenAddProduct(!openAddProduct);
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-w-[500px] mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <div className="text-2xl font-semibold flex justify-between text-gray-700 mb-6">
       <h2>Add a Product</h2>
       <button onClick={()=>setOpenAddProduct(!openAddProduct)}> ❌</button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Product ID</label>
          <input
            type="text"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            placeholder="Enter Product ID"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Product Name"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Enter Company Name"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Rating</label>
          <input
            type="number"
            step="0.1"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Enter Rating"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter Price"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <label className="text-sm font-medium text-gray-600">Featured</label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
