export class Library {
    lastBookId: number = 0
    books: Book[] = []
    constructor() {}
    addBook(book: Book) {
        const id = this.lastBookId + 1;

        this.books.push(book);

        this.lastBookId++;
    }
    removeBook(id: number) {
        const removeIndex = this.books.findIndex(book => {
            if(book.id === id) {
                return true;
            } else {
                return false;
            }
        });
        if(removeIndex) {
            this.books.splice(removeIndex, 1);
        }
    }
    updateBook(id: number, book: Book) {
        const index = this.books.findIndex(book => {
            if(book.id === id) {
                return true;
            } else {
                return false;
            }
        });
        book.id = id;
        if(index) {
            this.books.splice(index, 1, book);
        }
    }
    getBook(id: number) {
        return this.books.find(book => {
            if(book.id === id) {
                return true;
            } else {
                return false;
            }
        })
    }
    getBooks() {
        return this.books;
    }
}

type BookProps = {
    title: string
    author: string
    genre: string
    coverURL: string
    id: number
    chapters?: Chapter[]
}

export class Book {
    title: string
    author: string
    genre: string
    coverURL: string
    id: number
    lastChapterId: number = 0;
    chapters: Chapter[] = []
    constructor({title, author, genre, coverURL, id = 0, chapters}: BookProps) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.coverURL = coverURL;
        this.id = id;
        if(chapters) {
            this.chapters = chapters;
        }
    }
    addChapter(chapter: Chapter) {
        chapter.id = this.lastChapterId + 1;
        this.chapters.push(chapter);
        this.lastChapterId++;
    }
    removeChapter(id: number) {
        const removeIndex = this.chapters.findIndex(chapter => {
            if(chapter.id === id) {
                return true;
            } else {
                return false;
            }
        });

        if(removeIndex) {
            this.chapters.splice(removeIndex, 1);
        }
    }
    updateChapter(id: number, chapter: Chapter) {
        const removeIndex = this.chapters.findIndex(chapter => {
            if(chapter.id === id) {
                return true;
            } else {
                return false;
            }
        });
        chapter.id = id;
        this.chapters.splice(removeIndex, 1, chapter);
    }
    getChapter(id: number) {
        return this.chapters.find(chapter => {
            if(chapter.id === id) {
                return true;
            } else {
                return false;
            }
        });
    }
    getChapters() {
        return this.chapters;
    }
    moveChapter(id: number, command: 'up' | 'down') {
        const index = this.chapters.findIndex(chapter => {
            if(chapter.id === id) {
                return true;
            } else {
                return false;
            }
        });

        if(!index) return;

        const chapter = this.chapters[index];

        this.chapters.splice(index, 1);

        if(command === 'up') {
            if(index > 0) {
                this.chapters.splice(index - 1, 0, chapter);
            }
        } else {
            if(index !== this.chapters.length - 1) {
                this.chapters.splice(index + 1, 0, chapter);
            }
        }
    }
}

type ChapterProps = {
    title: string
    dueDate: Date
    isComplete: boolean
    id: number
}

export class Chapter {
    title: string
    dueDate: Date
    isComplete: boolean
    id: number
    constructor({title, dueDate, isComplete, id = 0}: ChapterProps) {
        this.title= title;
        this.dueDate = dueDate;
        this.isComplete = isComplete;
        this.id = id;
    }
}