import express from "express";
import { Book } from "../models/bookmodel.js";
const bookRoute = express.Router();
import { StatusCodes } from "http-status-codes";
bookRoute.post("/book", async (req, res) => {
  try {
    const { title, author, year } = req.body;
    if (!title || !author || !year) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "please provide title, name and year" });
    }
    await Book.create(req.body);
    res.status(StatusCodes.CREATED).json({ msg: "Book added successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.BAD_GATEWAY)
      .json({ msg: "Interner server error,try again..." });
  }
});

bookRoute.get("/book", async (req, res) => {
  try {
    const books = await Book.find();
    if (!books)
      return res.status(StatusCodes.OK).json({ msg: "Books not available" });
    res.status(StatusCodes.OK).json({ count: books.length, data: books });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "internal server error" });
  }
});
bookRoute.get("/book/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `book not found with ${id}` });

    res.status(StatusCodes.OK).json({ data: book });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Internal Server Error" });
  }
});
// bookRoute.put("/book/:id", async (req, res) => {});
bookRoute.put("/book/:id", async (req, res) => {
  const { id } = req.params;
  const { author, title, year } = req.body;
  try {
    if (!author || !title || !year)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "please provide all fields" });
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `book with id${id} not found` });

    res.status(StatusCodes.OK).json({ msg: "book updated", data: req.body });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.OK).json({ msg: "internal server error" });
  }
});

bookRoute.delete("/book/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `book not found  with ${id}` });
    res
      .status(StatusCodes.OK)
      .json({ data: book, msg: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Internal Server Error" });
  }
});
export default bookRoute;