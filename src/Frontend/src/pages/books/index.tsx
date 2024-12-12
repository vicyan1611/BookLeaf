import MainPageLogo from "../../assets/BookLeaf_Logo_cropped.svg";
import "./index.css";
import { IoSearchOutline } from "react-icons/io5";
import { LuBookOpen } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { useEffect, useState } from "react";

const SearchBar = () => {
  return (
    <div className="max-w-3xl w-full mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <IoSearchOutline />
        </div>
        <input
          type="text"
          className="w-full py-3 pl-10 pr-4 text-gray-700 border border-gray-300  focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors bg-white rounded-3xl"
          placeholder="Search for books..."
        />
      </div>
    </div>
  );
};

interface BookCardProps {
  book: Book;
}
interface Book {
  _id?: string;
  title: string;
  author: string;
  totalPages: number;
  pathToCover: string;
}

const fetchBooks = async (): Promise<Book[]> => {
  try {
    const response = await fetch("http://localhost:3000/api/books");
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const data: [] = await response.json();
    console.log("Fetched books:", data);
    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

const BookCard = ({ book }: BookCardProps) => {
  const read = () => {
    location.href = `/books/${book._id}`;
  };
  return (
    <div
      className="bg-white p-2 rounded-lg shadow hover:shadow-md transition-shadow flex flex-col cursor-pointer"
      onClick={read}
    >
      <div className="h-52 justify-center flex">
        <img
          src={book.pathToCover}
          alt={book.title}
          className="h-full object-cover rounded-lg"
        />
      </div>
      <h3 className="text-lg font-medium text-gray-900">{book.title}</h3>
      <p className="text-gray-600 h">{book.author}</p>
      <p className="text-gray-500 text-sm mt-2">{book.totalPages} pages</p>
    </div>
  );
};

const SideBar = () => {
  return (
    <div className="w-full border-r border-gray-200 p-4  shadow-md border-2 rounded-lg">
      {/* Recent Books Section */}
      <div className="mb-6">
        <div className="flex gap-2 text-gray-700 font-medium mb-3">
          <LuBookOpen size={20} />
          <span>Just Read</span>
        </div>
        <div className="ml-7 space-y-2">
          <div>
            <div className="text-left">Rừng Xà Nu</div>
            <div className="text-gray-800 font-extralight text-left text-sm">
              Reading Progress: 43%
            </div>
          </div>
          <div>
            <div className="text-left">Đắc Nhân Tâm</div>
            <div className="text-gray-800 font-extralight text-left text-sm">
              Reading Progress: 100%
            </div>
          </div>
        </div>
      </div>
      {/* Categories Section */}
      <div className="mb-6">
        <div className="flex gap-2 text-gray-700 font-medium mb-3">
          <LuBookOpen size={20} />
          <span>Shelves</span>
        </div>
        <div className="ml-7 space-y-2">
          <div className="text-left">Business</div>
          <div className="text-left">Science</div>
          <div className="text-left">Technology</div>
        </div>
      </div>
      {/* Tags Section */}
      <div className="mb-6">
        <div className="flex gap-2 text-gray-700 font-medium mb-2">
          <LuBookOpen size={20} />
          <span>Tags</span>
        </div>

        <div className="ml-7 space-y-2">
          <div className="text-left flex gap-2 items-center">
            <FaCheck size={16} />
            <span>tag1</span>
          </div>
          <div className="text-left">tag2</div>
          <div className="text-left flex gap-2 items-center">
            <FaCheck size={16} />
            <span>tag3</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function Books() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const fetchedBooks = await fetchBooks();
        setBooks(fetchedBooks);
      } catch (err) {
        console.error("Error loading books:", err);
      }
    };

    loadBooks();
  }, []);

  return (
    <div className="w-full p-10 h-full">
      <div className="flex justify-between mb-6 w-full h-12">
        <img src={MainPageLogo} alt="" />
        <div className="flex gap-3">
          <button className="font-semibold hover:bg-green-500 hover:text-white py-2 px-3 rounded">
            Books
          </button>
          <button className="font-semibold hover:bg-green-500 hover:text-white py-2 px-3 rounded">
            My Libraries
          </button>
          <button className="font-semibold hover:bg-green-500 hover:text-white py-2 px-3 rounded">
            Goals
          </button>
          <button className="font-semibold hover:bg-green-500 hover:text-white py-2 px-3 rounded">
            Friends
          </button>
        </div>
      </div>
      <SearchBar />
      <div className=" grid grid-cols-4 mt-6 gap-1">
        <div className=" col-start-1 col-span-1">
          <SideBar />
        </div>

        <div className="col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-fr">
            {books && books.length > 0 ? (
              books.map((book) => <BookCard key={book._id} book={book} />)
            ) : (
              <div className="flex justify-center items-center h-48 col-span-3">
                <p>No books found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Books;
