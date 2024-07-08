import Link from "next/link";
import React from "react";
import { format } from "date-fns/format";

async function getBookCategories() {
  const res = await fetch(
    `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${process.env.NEXT_PUBLIC_API_KEY}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch books categories");
  }

  return res.json();
}

export default async function Home() {
  const categories = await getBookCategories();

  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className="mb-8 text-center text-4xl font-bold">
        {categories.results.length} book categories
      </h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.results.map((category) => (
          <Link
            href={`/books/${category.list_name_encoded}`}
            key={category.list_name_encoded}
            className="rounded-lg border border-neutral-800 p-4 transition hover:bg-neutral-900"
          >
            <h2 className="mb-4 text-lg font-bold">{category.display_name}</h2>
            <p className="text-sm text-neutral-400">
              First published:{" "}
              {format(new Date(category.oldest_published_date), "do MMMM yyyy")}
            </p>
            <p className="my-2 text-sm text-neutral-400">
              Last published:{" "}
              {format(new Date(category.newest_published_date), "do MMMM yyyy")}
            </p>
            <p className="text-sm text-neutral-400">
              Updated: {category.updated}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
