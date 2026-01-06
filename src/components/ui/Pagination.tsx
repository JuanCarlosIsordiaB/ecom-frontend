import Link from "next/link";
import React from "react";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav className="flex justify-center py-10">
      {pages.map((page) => (
        <Link
          key={page}
          href={`/admin/products?page=${page}`}
          className={`mx-1 px-3 py-2 border rounded-md focus:outline-none ${
            currentPage === page
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          } `}
        >
          {page}
        </Link>
      ))}
    </nav>
  );
}
