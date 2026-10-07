class MediaStore {
    media: Media[];
    constructor(media: Media | Media[]) {
        const mediaItems = Array.isArray(media) ? media : [media];

        this.media = mediaItems;
    }
    getMedia(title?: string) {
        if(title) {
            return this.media.find(media => {
                if(media.title === title) {
                    return true;
                }
            });
        }
        return this.media;
    }
    addMedia(media: Media | Media[]) {
        const mediaItems = Array.isArray(media) ? media : [media];

        this.media.push(...mediaItems);
    }
    moveMedia(oldIndex: number, newIndex: number) {
        const media = this.media[oldIndex];

        if(media) {
            this.media.splice(oldIndex, 1);   
            this.media.splice(newIndex, 0, media);
        }
    }
    deleteMedia(title: string) {
        const index = this.media.findIndex(media => {
            if(media.title === title) {
                return true;
            }
        });

        if(index >= 0) {
            this.media.splice(index, 1);
        } else {
            return false;
        }
    }

}

interface MediaConstructor {
    title: string
    author: string
    description: string
    notes: string
    chapters: MediaChapter[]
}

class Media {
    title: string
    author: string
    description: string
    notes: string
    chapters: MediaChapter[] = []
    // constructor(title: string, author: string, description: string, chapters?: MediaChapter[]) {
    constructor(args: MediaConstructor) {
        this.title = args.title;
        this.description = args.description;
        this.author = args.author;
        this.notes = args.notes;
        if(args.chapters) {
            this.chapters = args.chapters;
        }
    }
    getChapter(number: number) {
        return this.chapters[number];
    }
    addChapter(chapter: MediaChapter | MediaChapter[], number?: number) {
        const chapters = Array.isArray(chapter) ? chapter : [chapter];
        
        if(number) {
            this.chapters.splice(number, 0, ...chapters);
        } else {
            this.chapters.push(...chapters);
        }
    }
    moveChapter(numberOld: number, numberNew: number) {
        const chapter = this.chapters[numberOld];

        this.removeChapter(numberOld);
        this.addChapter(chapter, numberNew);
    }
    removeChapter(number: number) {
        const removed = this.chapters.splice(number);
        if(removed.length === 0) {
            throw new Error(`Unable to remove chapter, does not exist.`)
        }
    }
    isComplete() {
        const hasIncomplete = this.chapters.some(chapter => {
            if(chapter.isComplete === false) {
                return true;
            }
        })

        if(hasIncomplete) {
            return false
        } else {
            return true;
        }
    }
}

class MediaChapter {
    name: string
    length: number
    lengthCompleted: number = 0;
    isComplete: boolean = false
    dueDate: Date | undefined
    constructor(name: string, length: number, dueDate?: Date) {
        this.name = name;
        this.length = length;
        if(dueDate) {
            this.dueDate = dueDate;
        }
    }
    // Add accessors to protect invariants later...
}