import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/product/all`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        if (data.message === 'unauthorized') {
          navigate('/');
        }
        if (!data.success) throw new Error("Failed to fetch products");
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [navigate]);

  const openEditForm = (product) => {
    setEditingProduct(product);
    setUpdatedData({ ...product });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedData({
      ...updatedData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/product/update-product/${updatedData.productId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
         },
        body: JSON.stringify({ values: updatedData }),
      });
      const data = await response.json();
      if (data.message === 'unauthorized') {
        navigate('/');
      }
      if (!data.success) throw new Error("Failed to update product");
      window.location.reload();
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const confirmDeleteProduct = (productId) => {
    setConfirmDelete(productId);
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/product/delete-product/${confirmDelete}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
         },
      });
      const data = await response.json();
      if (data.message === 'unauthorized') {
        navigate('/');
      }
      if (!response.ok) throw new Error("Failed to delete product");
      setProducts(products.filter((product) => product.productId !== confirmDelete));
      setConfirmDelete(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const sortByRating = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/product/sort/rating`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.message === 'unauthorized') {
        navigate('/');
      }
      if (!data.success) throw new Error("Failed to sort products by rating");
      setProducts(data.products);
    } catch (error) {
      console.error("Error sorting products by rating:", error);
    }
  };

  const sortByFeatures = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/product/sort/features`, {
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.message === 'unauthorized') {
        navigate('/');
      }
      if (!data.success) throw new Error("Failed to sort products by features");
      setProducts(data.products);
    } catch (error) {
      console.error("Error sorting products by features:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Product List</h1>
      <div className="flex justify-between mb-4">
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.productId} className="bg-white p-4 shadow-md rounded-lg relative">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">Price: ₹{product.price}</p>
              <p className="text-gray-600">Company: {product.company}</p>
              <p className="text-gray-600">Rating: {product.rating.$numberDecimal}</p>
              <p className={`text-sm ${product.featured ? "text-green-500" : "text-red-500"}`}>
                {product.featured ? "Featured" : "Not Featured"}
              </p>
              
              <div className="absolute bottom-2 right-2 flex gap-2">
                <button className="text-blue-500" onClick={() => openEditForm(product)}>📝</button>
                <button className="text-red-500" onClick={() => confirmDeleteProduct(product.productId)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <button onClick={sortByRating} className="px-4 py-2 bg-blue-500 text-white rounded">Sort by Rating</button>
          <button onClick={sortByFeatures} className="px-4 py-2 bg-green-500 text-white rounded">Sort by Features</button>
        </div>
      </div>

      {editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#ffffff7e] backdrop-blur-[2px] bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            <div className="flex justify-between mb-4 bg-indigo-100 p-2 rounded-lg"> 
              <div>Product ID:</div>
              <div>{updatedData.productId}</div>
            </div>
            <label className="block mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={updatedData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block mb-2">Price:</label>
            <input
              type="number"
              name="price"
              value={updatedData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block mb-2">Rating:</label>
            <input
              type="number"
              step="0.1"
              name="rating"
              value={updatedData.rating.$numberDecimal}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="flex items-center mb-4">
              <input
                type="checkbox"
                name="featured"
                checked={updatedData.featured}
                onChange={handleChange}
                className="mr-2"
              />
              Featured
            </label>

            <div className="flex justify-end">
              <button onClick={() => setEditingProduct(null)} className="mr-2 px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button onClick={handleUpdate} className="px-4 py-2 bg-blue-500 text-white rounded">
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#ffffff69] backdrop-blur-md bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className="flex justify-end mt-4">
              <button onClick={() => setConfirmDelete(null)} className="mr-2 px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
