"use client"

import { useCartStore } from "@/stores/cartStore";
import Image from "next/image";
import React from "react";

const NavIcons = () => {
  const totalItems = useCartStore(s => s.totalItems)

  return (
    <div className="flex items-center gap-4 xl:gap-6">
      <div className="relative cursor-pointer">
        <Image
          src="/cart.png"
          alt=""
          width={22}
          height={22}
          className="cursor-pointer"
        />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-pink-400 rounded-full text-white text-sm flex items-center justify-center" >{totalItems}</div>
      </div>
    </div>
  );
};

export default NavIcons;
