import type { APIRoute } from "astro";
import fs from "fs/promises";
import path from "path";

export const POST: APIRoute = async ({ request, params }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const author = formData.get("author");

  // Load the existing books from the JSON file
  const booksFilePath = path.join(
    import.meta.env.SRC_DIR,
    "data",
    "books.json",
  );
  const booksData = await fs.readFile(booksFilePath, "utf-8");
  const books = JSON.parse(booksData);

  // Find the book by ID
  const bookId = Number(params.id);
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return new Response(null, { status: 404, statusText: "Book not found" });
  }

  // Update the book details
  book.title = title;
  book.author = author;

  // Save the updated books array back to the file
  // await fs.writeFile(booksFilePath, JSON.stringify(books, null, 2));

  try {
    await fs.writeFile(booksFilePath, JSON.stringify(books, null, 2));
    console.log("File saved successfully");
  } catch (error) {
    console.error("Failed to save file:", error);
  }

  // Redirect to the book's detail page
  return new Response(null, {
    status: 302,
    headers: {
      location: `/books/${bookId}`,
    },
  });
};
