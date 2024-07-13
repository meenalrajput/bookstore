import axios from "axios"; // to hit api of backend
import { useEffect, useState } from "react"; //to render the component/page/data
import SERVER_URL from "../ServerURL";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineAddBox } from "react-icons/md";
import { Link } from "react-router-dom";

// Home is a component
const Home = () => {
  const [books, setBooks] = useState([]); //can store array objects
  const [loading, setLoading] = useState(false); // to show loading of page
  const fetchBook = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(`${SERVER_URL}/book`);
      console.log(resp.data);
      setBooks(resp.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBook();
  }, []);
  return (
    <>
      <h1 className="text-3xl bg-sky-700 text-white p-4 text-center">
        Book Store
      </h1>
      <div className="p-4">
        <Link to="/books/create">
          <MdOutlineAddBox className="text-4xl text-blue-800" />
        </Link>
        <div className="flex justify-between items-center">
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            <table className="w-full border-separate border-spacing-2">
              <thead>
                <tr>
                  <th className="border border-slate-500 rounded-md">Sno</th>
                  <th className="border border-slate-500 rounded-md">Title</th>
                  <th className="border border-slate-500 rounded-md">Author</th>
                  <th className="border border-slate-500 rounded-md">Year</th>
                  <th className="border border-slate-500 rounded-md">
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => {
                  return (
                    <tr key={book._id}>
                      <td className="border border-slate-500 rounded-md text-center">
                        {index + 1}
                      </td>
                      <td className="border border-slate-500 rounded-md text-center">
                        {book.title}
                      </td>
                      <td className="border border-slate-500 rounded-md text-center">
                        {book.author}
                      </td>
                      <td className="border border-slate-500 rounded-md text-center">
                        {book.year}
                      </td>
                      <td className="border border-slate-500 rounded-md text-center">
                        <div className="flex justify-center gap-x-4">
                          <Link to={`/books/${book._id}`}>
                            <BsFillInfoSquareFill className="text-2xl text-green-800" />
                          </Link>
                          <Link to={`/books/edit/${book._id}`}>
                            <FaEdit className="text-2xl text-yellow-800" />
                          </Link>
                          <Link to={`/books/delete/${book._id}`}>
                            <AiFillDelete className="text-2xl text-red-800" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
export default Home;