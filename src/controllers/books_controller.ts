import { Request, Response } from "express";
import * as bookService from "../services/books";

export const getBooks = async (req: Request, res: Response) => {
	const books = await bookService.getBooks();
	res.json(books).status(200);
};

export const getBook = async (req: Request, res: Response) => {
	const bookId = req.params.bookId;
	const book = await bookService.getBook(Number(bookId));

	if (book) {
		res.json(book).status(200);
	} else {
		res.status(404).json({message: `Book of ID:${bookId} does not exist`});
	}
};

export const saveBook = async (req: Request, res: Response) => {
	const bookToBeSaved = req.body;
	try {
		const book = await bookService.saveBook(bookToBeSaved);
		res.status(201).json(book);
	} catch (error) {

		// not sure if this should go here, or in /services function 🤔
		const isValidationErr = (error as Error).message === 'Validation error'
		const errorMsg = isValidationErr ? `Error: ID:${req.body.bookId} already belongs to another book.`
			: (error as Error).message

		res.status(400).json({ message: errorMsg});
	}
};

// User Story 4 - Update Book By Id Solution
export const updateBook = async (req: Request, res: Response) => {
	const bookUpdateData = req.body;
	const bookId = Number.parseInt(req.params.bookId);

	const book = await bookService.updateBook(bookId, bookUpdateData);
	res.status(204).json(book);
};

// User Story 4 - Update Book By Id Solution
export const deleteBook = async (req: Request, res: Response) => {
	const bookId = Number.parseInt(req.params.bookId);
	try {
		const book = await bookService.deleteBook(bookId);
		
		// not sure if DELETE needs body
		res.status(200).json(book || { message: "Book deleted successfully" })
	} catch (error) {
		res.status(400).json({ message: (error as Error).message })
	}
};
