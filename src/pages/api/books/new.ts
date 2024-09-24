import type { APIRoute } from "astro";
import fs from "fs/promises";
import path from "path";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const author = formData.get("author");

  if (!title || !author) {
    return new Response("Title and author are required", { status: 400 });
  }

  // Correct the file path using path.resolve to the root of the project
  const booksFilePath = path.resolve("src/data/books.json");

  const booksData = await fs.readFile(booksFilePath, "utf-8");
  const books = JSON.parse(booksData);

  // Create a new book
  const newBook = {
    id: books.length + 1, // Generate a new ID
    title: title.toString(),
    author: author.toString(),
  };

  // Add the new book to the array and save it
  books.push(newBook);
  await fs.writeFile(booksFilePath, JSON.stringify(books, null, 2));

  // Redirect back to the books list
  return new Response(null, {
    status: 302,
    headers: {
      location: "/", // Redirect to the books list page
    },
  });
};
