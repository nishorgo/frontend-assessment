"use client";

import Image from "next/image";
import { useRouter } from "next/router";

const SearchBar = () => {
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    const router = useRouter();

    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;

    if (search) {
        router.push(`/products?name=${search}`);
    }
  }

  return (
    <form
      action=""
      onSubmit={handleSearch}
      className="flex ic justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1"
    >
      <input
        type="text"
        name="search"
        placeholder="Search"
        className="flex-1 bg-transparent outline-none"
      />
      <button className="cursor-pointer">
        <Image src="/search.png" alt="" width={16} height={16} />
      </button>
    </form>
  );
};

export default SearchBar;
