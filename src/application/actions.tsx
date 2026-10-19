'use server';

import { library } from "@/composition/library-module";
import { Book, Chapter } from "@/domain/library";

export type LibraryVM = {
    books: BookVM
    lastBookId: number
}

export type BookVM = {
    title: string
    author: string
    genre: string
    coverURL: string
    chapters: ChapterVM[]
    id: number
    lastChapterId: number
}

export type ChapterVM = {
    title: string,
    dueDate: Date
    isComplete: boolean
    id: number
}

export async function addBook(book: BookVM) {
    library.addBook(new Book({
        id: 0,
        genre: book.genre,
        coverURL: book.coverURL,
        author: book.author,
        title: book.title,
        chapters: [
            ...book.chapters.map(chapter => {
                return new Chapter({
                    id: chapter.id,
                    dueDate: chapter.dueDate,
                    isComplete: chapter.isComplete,
                    title: chapter.title
                })
            })
        ]
    }));
}

export async function removeBook(id: number) {
    library.removeBook(id);
}

export async function getBook(id: number) {
    let bookVM: BookVM;

    const book = library.getBook(id);

    if(!book) return;

    bookVM = {
        title: book.title,
        author: book.author,
        genre: book.genre,
        coverURL: book.coverURL,
        chapters: book.chapters,
        id: book.id,
        lastChapterId: book.lastChapterId
    }

    return bookVM;
}

export async function getBooks() {
    let booksVM: BookVM[];

    const books = library.getBooks();

    booksVM = books.map(book => {
        return {
            title: book.title,
            author: book.author,
            genre: book.genre,
            coverURL: book.coverURL,
            chapters: book.chapters,
            id: book.id,
            lastChapterId: book.lastChapterId
        }
    });

    return booksVM;
}

export async function markChapter(bookId: number, chapterId: number, isComplete: boolean) {
    // TO THIS...
}

export async function updateBook(id: number, book: BookVM) {
    // const bookIndex = library.getBooks().findIndex(book => {
    //     if(book.id === id) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // });

    // if(!bookIndex) return;

    library.updateBook(id, new Book({
        id: 0,
        genre: book.genre,
        coverURL: book.coverURL,
        author: book.author,
        title: book.title,
        chapters: [
            ...book.chapters.map(chapter => {
                return new Chapter({
                    id: chapter.id,
                    dueDate: chapter.dueDate,
                    isComplete: chapter.isComplete,
                    title: chapter.title
                })
            })
        ]
    }));
}