//app/components/CartItem.js
"use client";
import { useState } from "react";
import { useCart } from "../../context/cart";
import { toast } from "react-toastify";
import { FiX, FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import Modal from "../../../components/ui/modal";

export default function CartItem({ product }) {
  const cart = useCart();
  const quantity = product.quantity || 1;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleRemove = () => {
    cart.removeFromCart(product.id);
    toast.info("Produto removido do carrinho com sucesso", { autoClose: 3000 });
    setShowDeleteModal(false);
  };

  const updateQuantity = (newQuantity) => {
    if (newQuantity < 1) {
      handleRemove(); // Remove item if quantity drops below 1
      return;
    }
    cart.updateQuantity(product.id, newQuantity);
  };

  return (
    <>
      <div>
        <div
          className="relative flex justify-start my-2 w-full p-6 
      bg-primary-black/10 dark:bg-primary-black/30
      border-2 border-primary-yellow/20
      rounded-xl hover:border-primary-yellow/40
      transition-all group"
        >
          {/* Remove Modal */}
          <Modal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            title="Remover Item"
            message={`Tem certeza que deseja remover "${product.title}" do carrinho?`}
            onConfirm={handleRemove}
          />
          {/* Top-right X icon */}
          <button
            // onClick={handleRemove}
            onClick={() => setShowDeleteModal(true)}
            className="absolute -top-3 -right-3 bg-primary-yellow text-primary-black
          p-1.5 rounded-full shadow-lg hover:scale-110
          transition-transform duration-200"
          >
            <FiX className="w-5 h-5" />
          </button>

          <div className="relative flex w-full gap-4">
            <img
              src={product?.url}
              className="rounded-md w-[150px] h-[150px] object-cover border-2 border-primary-yellow/20"
            />

            <div className="flex flex-col justify-between w-full overflow-hidden">
              <div>
                <h3 className="text-lg font-bold text-primary-black dark:text-primary-yellow truncate">
                  {product?.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {product?.description.substring(0, 150)}...
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-primary-black/20 rounded-lg p-1">
                    {/* <button
                      onClick={() => updateQuantity(quantity - 1)}
                      className="p-1.5 rounded-md hover:bg-primary-yellow/20 transition-colors"
                    >
                      {quantity > 1 ? (
                        <FiMinus className="w-5 h-5 text-primary-yellow" />
                      ) : (
                        <FiTrash2 className="w-5 h-5 text-primary-yellow" />
                      )}
                    </button> */}

                    <button
                      onClick={() => {
                        if (quantity > 1) {
                          updateQuantity(quantity - 1);
                        } else {
                          setShowDeleteModal(true);
                        }
                      }}
                      className="p-1.5 rounded-md hover:bg-primary-yellow/20 transition-colors"
                    >
                      {quantity > 1 ? (
                        <FiMinus className="w-5 h-5 text-primary-yellow" />
                      ) : (
                        <FiTrash2 className="w-5 h-5 text-primary-yellow" />
                      )}
                    </button>

                    <span className="w-8 text-center font-bold text-primary-yellow">
                      {quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(quantity + 1)}
                      className="p-1.5 rounded-md hover:bg-primary-yellow/20 transition-colors"
                    >
                      <FiPlus className="w-5 h-5 text-primary-yellow" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Valor unitário: R${(product?.price / 100).toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {product?.installments}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xl font-bold text-primary-yellow">
                    R${((product?.price * quantity) / 100).toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {quantity}x R${(product?.price / 100).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
