import React from "react";
import { getBooks } from "../server.jsx";
import { Link, useSearchParams } from "react-router-dom";

export default function Books() {
  const [books, setBooks] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    async function loadBooks() {
      let data = await getBooks();
      setBooks(data);
    }
    loadBooks();
  }, []);

  const typeFilter = searchParams.get("type");
  const filteredBooks = typeFilter
    ? books.filter((book) => book.genre.toLowerCase() === typeFilter)
    : books;

  const displayedBooks = filteredBooks.map((book) => (
    <div key={book.id} className="book-card">
      <img src={book.imageURL} style={{ width: "200px" }}></img>
      <div className="book-info">
        <p style={{ fontWeight: "300" }}>{book.author}</p>
        <p style={{ fontWeight: "500" }}>{book.title}</p>
        <p style={{ fontWeight: "500" }}>{book.price} €</p>
        <button className="warenkorb-Btn">In den Warenkorb</button>
      </div>
    </div>
  ));

  return (
    <>
      <div className="search-buttons">
        <Link
          to="?type=fantasy"
          className={typeFilter === "fantasy" ? "link-active" : ""}
        >
          Fantasy
        </Link>
        <Link
          to="?type=klassiker"
          className={typeFilter === "klassiker" ? "link-active" : ""}
        >
          Klassiker
        </Link>
        <Link
          to="?type=sachbuch"
          className={typeFilter === "sachbuch" ? "link-active" : ""}
        >
          Sachbuch
        </Link>
        <Link
          to="?type=kinder und jugend"
          className={typeFilter === "kinder und jugend" ? "link-active" : ""}
        >
          Kinder und Jugend
        </Link>
        <Link
          to="?type=roman"
          className={typeFilter === "roman" ? "link-active" : ""}
        >
          Roman
        </Link>
        <Link
          to="?type=krimi"
          className={typeFilter === "krimi" ? "link-active" : ""}
        >
          Krimi
        </Link>
        {typeFilter != null && (
          <Link to="" className="link-remove">
            Filter entfernen
          </Link>
        )}
      </div>
      <div className="shop-display">
        <div className="book-display">{displayedBooks}</div>
      </div>
    </>
  );
}
