import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/product";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import Navbar from "./Navbar";

const HomePage = () => {
  const { fetchProduct, products } = useProductStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product

  const [productName, setProductName] = useState(""); // State for product name
  const [productPrice, setProductPrice] = useState(""); // State for product price
  const [imageUrl, setImageUrl] = useState(""); // State for image URL

  useEffect(() => {
    fetchProduct(); // Fetch product data on component mount
  }, []);

  const { deleteProduct, updateProduct } = useProductStore();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (success) {
      alert(message);
    } else {
      alert(message);
    }
  };

  const handleOpenDialog = (product) => {
    setSelectedProduct(product); // Store the product to edit
    setProductName(product.name); // Set name for editing
    setProductPrice(product.price); // Set price for editing
    setImageUrl(product.image); // Set image URL for editing
    setIsOpen(true); // Open the dialog
  };

  const handleCloseDialog = () => {
    setIsOpen(false); // Close the dialog
  };

  const handleUpdateProduct = async (productId) => {
    const updatedProduct = {
      name: productName,
      price: productPrice,
      image: imageUrl,
    };
    console.log(updatedProduct, productId); // Log the updated product data
    handleCloseDialog(); // Close the dialog after saving
    // Here you can add the logic for sending a PUT request later
    const { success, message } = await updateProduct(productId, updatedProduct);
    if (success) {
      alert(message);
    } else {
      alert(message);
    }
  };

  return (
    <>
      <Navbar page={"home"} buttonData={"Create New Product"} />
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 ">
        {/* Conditional rendering based on product availability */}
        {products.length === 0 ? (
          <div className="text-center text-gray-500">
            <h2 className="text-xl font-semibold">No Products Available</h2>
            <p className="mt-2">
              The inventory is currently empty. Please check back later after
              adding new products.
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-center text-3xl font-bold text-teal-600 sm:text-3xl mb-6">
              Product List
            </h1>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <a
                  key={product.id}
                  href="#"
                  className="group relative block overflow-hidden border rounded-lg shadow-lg"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                  />

                  <div className="relative border border-gray-100 bg-white p-6">
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      {product.name}
                    </h3>

                    <p className="mt-1.5 text-sm text-gray-700">
                      ${product.price}
                    </p>

                    <form className="mt-4">
                      <button
                        className="block w-full rounded bg-teal-600 p-4 text-sm font-medium transition hover:scale-105 text-white mb-3"
                        onClick={() => handleOpenDialog(product)} // Open dialog with selected product
                      >
                        Update Product Information
                      </button>
                      <button
                        className="block w-full rounded bg-red-500 p-4 text-sm font-medium transition hover:scale-105 text-white"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        Delete from Cart
                      </button>
                    </form>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}

        {/* Dialog Component */}
        {selectedProduct && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {/* Open/close controlled via isOpen */}
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Product Information</DialogTitle>
                <DialogDescription>
                  Make changes to the product information. Click save when
                  you're done.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="productName" className="text-right">
                    Product Name
                  </label>
                  <input
                    id="productName"
                    value={productName} // Track product name input
                    onChange={(e) => setProductName(e.target.value)} // Update state on change
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="productPrice" className="text-right">
                    Product Price
                  </label>
                  <input
                    id="productPrice"
                    value={productPrice} // Track product price input
                    onChange={(e) => setProductPrice(e.target.value)} // Update state on change
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="imageUrl" className="text-right">
                    Image URL
                  </label>
                  <input
                    id="imageUrl"
                    value={imageUrl} // Track image URL input
                    onChange={(e) => setImageUrl(e.target.value)} // Update state on change
                    className="col-span-3"
                  />
                </div>
              </div>

              <DialogFooter>
                <button
                  onClick={handleCloseDialog}
                  className="rounded bg-red-500 text-white px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateProduct(selectedProduct._id)} // Pass product ID to update function
                  className="rounded bg-teal-600 text-white px-4 py-2"
                >
                  Save changes
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  );
};

export default HomePage;
