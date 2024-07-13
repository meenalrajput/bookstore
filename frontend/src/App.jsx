import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import ShowBook from "./pages/ShowBook";
import { Link } from "react-router-dom";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/create" element={<AddBook />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
      <Route path="/books/delete/:id" element={<DeleteBook />} />
      <Route path="/books/:id" element={<ShowBook />} />
    </Routes>
  );
};
export default App;
