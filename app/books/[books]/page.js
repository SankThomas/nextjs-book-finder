import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Books({ params }) {
  async function getBooks() {
    const res = await fetch(
      `https://api.nytimes.com/svc/books/v3/lists/current/${params.books}.json?api-key=${process.env.NEXT_PUBLIC_API_KEY}`,
    );

    if (!res.ok) {
      throw new Error("Failed to fetch books categories");
    }

    return res.json();
  }

  const books = await getBooks();

  return (
    <>
      <div className="container mx-auto px-6 py-20">
        <Link
          href="/"
          className="rounded-lg bg-neutral-900 px-4 py-2 transition hover:bg-neutral-800"
        >
          &larr; Go Back
        </Link>

        <h1 className="mb-8 text-center text-4xl font-bold">
          {books.results.display_name}
        </h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
          {books.results.books.map((book) => (
            <article
              key={book.description}
              className="rounded-lg border border-neutral-800 hover:bg-neutral-950"
            >
              <Image
                src={book.book_image}
                width={400}
                height={600}
                className="w-full rounded-t-lg object-cover"
              />

              <div className="space-y-4 p-4">
                <h2 className="font-bold">{book.title}</h2>
                <p className="text-sm text-neutral-400">By {book.author}</p>
                {book.description ? (
                  <p className="text-sm leading-6 text-neutral-400">
                    {book.description}
                  </p>
                ) : null}

                <div>
                  <h3 className="mb-4 font-semibold">Buy now</h3>

                  <ul className="flex flex-wrap items-center justify-start gap-6">
                    {book.buy_links.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.url}
                          className="rounded-lg bg-neutral-900 px-4 py-2 transition hover:bg-neutral-800"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
