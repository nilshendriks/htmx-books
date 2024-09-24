// src/pages/api/books.ts
import fs from "fs";
import path from "path";
import type { APIRoute } from "astro";

const dataFilePath = path.resolve("src/data/books.json");

const readBooks = () => {
  const jsonData = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(jsonData);
};

export const GET: APIRoute = () => {
  // const books = [
  //   { id: 1, title: "1984", author: "George Orwell" },
  //   { id: 2, title: "Brave New World", author: "Aldous Huxley" },
  //   { id: 3, title: "The Catcher in the Rye", author: "J.D. Salinger" },
  // ];
  const books = readBooks();

  // Respond with the list of books as HTML
  return new Response(
    `<ul class="list-books">
${books.map((book) => `<li>${book.title} by ${book.author} <a class="button" href="/books/${book.id}">View</a></li>`).join("")}
    </ul>`,
    { headers: { "Content-Type": "text/html" } },
  );
};
