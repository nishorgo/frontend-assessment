"use client";

import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { product_list } from "@/data/product-list";
import { useCartStore } from "@/stores/cartStore";
import {  } from "next/router";
import { useSearchParams } from "next/navigation";

const ProductList = () => {
  const [products, setProducts] = useState(product_list);
  const {addItem, loadProductListFromLocalStorage} = useCartStore();
  const searchParams = useSearchParams();
  const query = searchParams.get('search');

  useEffect(() => {
    const fetchData = () => {
      let data = product_list;

      if (query) {
        data = data.filter((item) =>
            item.Name.toLowerCase().includes(query.toLowerCase())
        );
      }
      setProducts(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <SearchBar />
      <div className="my-5">
        {products.map((product) => (
          <div
            key={product.Id}
            className="relative flex bg-clip-border rounded-md bg-white text-gray-700 shadow-md w-full max-w-[60rem] h-50 flex-row mb-5"
          >
            <div className="relative w-1/6 m-4 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
              <img
                src={product.FeaturedImageUrl}
                alt=""
                className="object-cover w-fit h-fit"
              />
            </div>
            <div className="p-6">
              <h4 className="font-sans antialiased leading-snug tracking-normal font-bold text-2xl text-gray-900">
                <Link href={`/products/${product.Id}`}>
                  {product.Name}
                </Link>
              </h4>
              <p className="font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                {product.ShortDescription}
              </p>
              <div className="block mb-4 font-sans antialiased font-medium leading-relaxed text-gray-700 text-xl">
                <p className=" text-gray-700">
                  Quantity: {product.Quantity}
                </p>

                <p className="">Tk. {product.ProductPrice.Price}</p>
              </div>

              <button
                type="button"
                className="bg-pink-400 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => {
                        if (product.Quantity > 0) {
                            addItem({
                                id: product.Id,
                                name: product.Name,
                                image: product.FeaturedImageUrl,
                                price: product.ProductPrice.Price,
                                quantity: 1
                            })
                        }

                        const updatedProducts = products.map((item) =>
                            item.Id === product.Id ? { ...item, Quantity: item.Quantity - 1 } : item
                          );
                        setProducts(updatedProducts);
                    }
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
