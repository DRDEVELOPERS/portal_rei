// app/admin/products/page.js

"use client";

import { FiEdit, FiTrash2, FiPlus, FiSearch, FiStar } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { formatCurrency } from "@/utils/helpers";
// import AdminPanelLayout from "../admin-panel/layout";

import AdminPanelLayout from "../layout";
import { deleteProduct } from "@/app/(admin)/actions/adminActions";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Dummy data for UI testing
  const dummyProducts = [
    {
      id: 1,
      title: "Furadeira 500W",
      price: 29990,
      category: "Ferramentas Elétricas",
      url: "https://placehold.co/400",
      rating: 4.5,
      reviews: [{}, {}, {}], // 3 dummy reviews
      combos: [{}], // 1 dummy combo
    },
    {
      id: 2,
      title: "Kit Chaves de Fenda",
      price: 7990,
      category: "Ferramentas Manuais",
      url: "https://placehold.co/400",
      rating: 4.2,
      reviews: [{}, {}], // 2 dummy reviews
      combos: [],
    },
    {
      id: 3,
      title: "Serra Circular",
      price: 45990,
      category: "Ferramentas Elétricas",
      url: "https://placehold.co/400",
      rating: null,
      reviews: [],
      combos: [{}, {}], // 2 dummy combos
    },
  ];

  const fetchProducts = async () => {
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Use dummy data instead of API call
    const filtered = dummyProducts.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setProducts(filtered);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [searchQuery]);

  const handleDelete = async (productId) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await deleteProduct(productId);
        toast.success("Produto excluído com sucesso!");
        fetchProducts();
      } catch (error) {
        toast.error("Erro ao excluir produto");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-primary-yellow">
          Gerenciar Produtos
        </h1>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-primary-yellow focus:ring-1 focus:ring-primary-yellow transition-colors"
            />
          </div>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 bg-primary-yellow text-primary-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
          >
            <FiPlus className="text-lg" />
            Novo Produto
          </Link>
        </div>
      </div>

      {isLoading ? (
        <ProductsSkeleton />
      ) : (
        <>
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gray-800 rounded-xl border border-gray-700 hover:border-primary-yellow/30 transition-all group relative"
              >
                <div className="p-4 space-y-4">
                  {/* Product Image */}
                  <div className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={product.url}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-primary-yellow truncate">
                      {product.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold">
                        {formatCurrency(product.price / 100)}
                      </span>
                      <span className="text-sm bg-gray-700 px-2 py-1 rounded">
                        {product.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <FiStar className="text-yellow-400" />
                      <span>{product.rating || "Sem avaliações"}</span>
                      <span>•</span>
                      <span>{product.reviews.length} avaliações</span>
                      <span>•</span>
                      <span>{product.combos.length} combos</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 border-t border-gray-700 pt-4">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <FiEdit className="text-primary-yellow" />
                      <span>Editar</span>
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-800/30 hover:bg-red-800/50 text-red-400 rounded-lg transition-colors"
                    >
                      <FiTrash2 />
                      <span>Excluir</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {products.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              Nenhum produto encontrado
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Skeleton Loader
export function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-gray-800 rounded-xl border border-gray-700 animate-pulse"
        >
          <div className="p-4 space-y-4">
            <div className="aspect-square bg-gray-700 rounded-lg" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-700 rounded w-3/4" />
              <div className="h-4 bg-gray-700 rounded w-1/2" />
            </div>
            <div className="flex gap-2 pt-4">
              <div className="h-10 bg-gray-700 rounded-lg flex-1" />
              <div className="h-10 bg-gray-700 rounded-lg flex-1" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
