import { error } from "console";
import { Book } from "../models/book";

export const getBooks = async () => {
	return Book.findAll();
};

export const getBook = async (bookId: number) => {
	return Book.findOne({
		where: { bookId },
	});
};

export const saveBook = async (book: Book) => {
	return Book.create<Book>(book);
};

// User Story 4 - Update Book By Id Solution
export const updateBook = async (bookId: number, book: Book) => {
	try {
		Book.update(book, {
			where: {
				bookId,
			},
		})
		return getBook(bookId);
		
	} catch (err) {
		throw new Error((err as Error).message)
	}
};

export const deleteBook = async (bookId: number) => {
	try {
		return Book.destroy({
			where: {
				bookId,
			},
		})
	} catch (err) {
		throw new Error((err as Error).message)
	}
};