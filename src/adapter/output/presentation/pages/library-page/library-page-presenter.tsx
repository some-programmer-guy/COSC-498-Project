import { BookVM, getBooks } from "@/application/actions";

export type LibraryPageVM = {
    books: BookVM[]
}

export async function LibraryPagePresenter(): Promise<LibraryPageVM> {
    const books = await getBooks();

    return {
        books: books
    }
}