import type { APIRoute } from 'astro';

let books = [
  { id: 1, title: '1984', author: 'George Orwell' },
  { id: 2, title: 'Brave New World', author: 'Aldous Huxley' },
  { id: 3, title: 'The Catcher in the Rye', author: 'J.D. Salinger' },
];

export const GET: APIRoute = ({ url }) => {
  const searchParams = new URLSearchParams(url.search);
  const id = parseInt(searchParams.get('id') || '');

  const book = books.find(b => b.id === id);

  if (!book) {
    return new Response('Book not found', { status: 404 });
  }

  const html = `
    <h1>${book.title} by ${book.author}</h1>
    <p>Book ID: ${book.id}</p>
    <a href="/">Back to list</a>
  `;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
};
