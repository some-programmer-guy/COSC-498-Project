'use client'

import styles from './edit-book-page.module.css'

import PageTitle from "../../components/headers/page-title";
import PageHeader from "../../components/headers/page-header";
import LabelButton from "../../components/label-button/label-button";

import { EditBookPageVM } from "./edit-book-page-presenter";

import { useRef, useState } from 'react';
import { useImmer } from 'use-immer'
import { useEffect } from 'react';
import { addBook } from '@/application/actions';

import { useRouter } from 'next/navigation'

type EditBookPageProps = {
    viewModel: EditBookPageVM
    mode: 'new' | 'edit'
}

export default function EditBookPage({viewModel, mode}: EditBookPageProps) {
    // const viewModel = viewModel;
    const [viewModelI, setViewModelI] = useImmer(viewModel);

    const router = useRouter();

    // if mode edit, update on every change.
    // if mode new, don't. Done label will initiate update.

    function chapterUpdateHandler(chapter: Chapter) {
        // Go through, swap out.
        setViewModelI(draft => {
            const index = draft.book.chapters.findIndex(findChapter => {
                if(findChapter.id === chapter.id) {
                    return true;
                }
            });
            draft.book.chapters.splice(index, 1, chapter);

            // return draft;
        });
    }

    function chapterMoveHandler(id: number, command: 'up' | 'down') {
        // Find index of book with that id, splice move, etc.
        // Cause rerender by updating view model with set.
        const chapterIndex = viewModelI.book.chapters.findIndex(chapter => {
            if(chapter.id === id) {
                return true;
            } else {
                return false;
            }
        })

        const chapter = viewModelI.book.chapters.find(chapter => {
            if(chapter.id === id) {
                return true;
            } else {
                return false;
            }
        });

        console.log('id: ', chapter?.id, 'index: ', chapterIndex);

        if(!chapterIndex || !chapter) return;


        if(command === 'up') {
            if(chapterIndex > 0) {
                setViewModelI(draft => {
                    draft.book.chapters.splice(chapterIndex, 1);
                    draft.book.chapters.splice(chapterIndex - 1, 0, chapter);
                    // return draft;
                });
            }
        } else {
            console.log(viewModelI.book.chapters.length - 1);
            if(chapterIndex !== viewModelI.book.chapters.length - 1) {
                console.log('test')
                setViewModelI(draft => {
                    draft.book.chapters.splice(chapterIndex, 1);
                    draft.book.chapters.splice(chapterIndex + 1, 0, chapter);
                    // return draft;
                })
            }
        }
    }

    function chapterDeleteHandler(id: number) {
        // Cause rerender.
        // Ultimately, updates to a view model that cause a re-render.
        const removeIndex = viewModelI.book.chapters.findIndex(chapter => {
            if(chapter.id === id) {
                return true;
            } else {
                return false;
            }
        });

        if(removeIndex === undefined) return;

        setViewModelI(draft => {
            draft.book.chapters.splice(removeIndex, 1);
            // return draft;
        });
    }

    return (
        <>
            <div className='header-row'>
                {mode === 'new'
                    ?
                    <>
                        <LabelButton text='Back' action={() => {
                            history.back();
                        }}/>
                        <LabelButton text='Done' action={() => {
                            addBook(viewModelI.book);
                            router.push('/library');
                            // Send back to previous page when finished
                        }}/>
                    </>
                    :
                    <>
                    </>
                }
            </div>
            <PageTitle text='Add Book'/>
            <PageHeader text='Details'/>
            <article className={styles['book-card']}>
                <img className={styles['book-cover']} src={viewModelI.book.coverURL} alt=''/>
                <div className={styles['book-details']}>
                    <div className={styles['book-input-row']}>
                        <div className={styles['label']}>
                            Title
                        </div>
                        <input className={styles['input']} defaultValue={viewModelI.book.title} placeholder='Title' onChange={event => {
                            setViewModelI(draft => {
                                draft.book.title = event.target.value;
                                // return draft;
                            });
                        }}/>
                    </div>
                    <div className={styles['book-input-row']}>
                        <div className={styles['label']}>
                            Author
                        </div>
                        <input className={styles['input']} defaultValue={viewModelI.book.author} placeholder='Author' onChange={event => {
                            setViewModelI(draft => {
                                draft.book.author = event.target.value;
                                // return draft;
                            });
                        }}/>
                    </div>
                    <div className={styles['book-input-row']}>
                        <div className={styles['label']}>
                            Genre
                        </div>
                        <input className={styles['input']} defaultValue={viewModelI.book.genre} placeholder='Genre' onChange={event => {
                            setViewModelI(draft => {
                                draft.book.genre = event.target.value;
                                // return draft;
                            });
                        }}/>
                    </div>
                    <div className={styles['book-input-row']}>
                        <div className={styles['label']}>
                            Cover
                        </div>
                        <input className={styles['input']} defaultValue={viewModelI.book.coverURL}  placeholder='Cover URL...' onBlur={event => {
                            setViewModelI(draft => {
                                draft.book.coverURL = event.target.value;
                                // return draft;
                            });
                        }}/>
                    </div>
                </div>
            </article>
            <div className='header-row'>
                <PageHeader text='Chapters'/>
                <LabelButton text='Add' action={() => {
                    // Call hook here to create new chapter...
                    setViewModelI(draft => {
                        draft.book.chapters.push({
                            title: '',
                            dueDate: new Date("2026-10-18T18:00:00Z"),
                            id: viewModelI.book.lastChapterId + 1,
                            isComplete: false
                        });
                        draft.book.lastChapterId++;
                    });
                    // Add new chapter, reference it into a container
                }}/>
            </div>
            <div className={styles['chapters']}>
                {
                    /* If in add book mode, create chapter with id 1, add to view model. */
                    viewModelI.book.chapters.map(chapter => (
                        <EditableChapter
                            viewModel={{
                                title: chapter.title,
                                dueDate: chapter.dueDate,
                                isComplete: chapter.isComplete,
                                id: chapter.id,
                            }}
                            key={chapter.id}
                            updateHandler={chapterUpdateHandler}
                            moveHandler={chapterMoveHandler}
                            deleteHandler={chapterDeleteHandler}
                        />
                    ))
                }
            </div>
        </>
    );
}

interface Chapter {
    title: string
    dueDate: Date
    isComplete: boolean
    id: number
}

type EditableChapterProps = {
    viewModel: Chapter
    updateHandler: (chapter: Chapter) => void
    moveHandler: (id: number, command: 'up' | 'down') => void
    deleteHandler: (id: number) => void
}

function EditableChapter({viewModel, updateHandler, moveHandler, deleteHandler}: EditableChapterProps) {
    const [viewModelI, setViewModelI] = useImmer(viewModel);

    function checkboxHandler(isComplete: boolean) {
        setViewModelI(draft => {
            draft.isComplete = isComplete;
        });
    }

    useEffect(() => {
        updateHandler(viewModelI);
    }, [viewModelI])

    function moveChapter(id: number, command: 'up' | 'down') {
        moveHandler(viewModelI.id, command);
    }

    function deleteChapter(id: number) {
        deleteHandler(id);
    }

    return (
        <article className={styles['chapter']}>
            <div className={styles['close-icon']} onClick={() => {
                deleteChapter(viewModelI.id);
            }}>
                x
            </div>
            <div className={styles['chapter-details']}>
                <div className={styles['book-input-row']}>
                    <div className={styles['label']}>
                        Title
                    </div>
                    <input className={styles['input']} placeholder='Title' defaultValue={viewModelI.id} onChange={(event) => {
                        setViewModelI(draft => {
                            draft.title = event.target.value;
                            // return draft;
                        });
                        // viewModelI.title = event.target.value;
                    }}/>
                </div>
                <div className={styles['book-input-row']}>
                    <div className={styles['label']}>
                        Due
                    </div>
                    {/* ${viewModelI.dueDate.getFullYear()}-${viewModelI.dueDate.getMonth()}-${viewModelI.dueDate.getDate()} */}
                    <input className={styles['input']} placeholder='Date' defaultValue={`${viewModelI.dueDate.toISOString().split('T')[0]}`} onBlur={(event) => {
                        // viewModelI.dueDate = new Date(`${event.target.value}T12:00:00Z`);
                        setViewModelI(draft => {
                            draft.dueDate = new Date(`${event.target.value}T12:00:00Z`);
                            // return draft;
                        })
                    }}/>
                </div>
            </div>
            <ChapterCheckbox isComplete={false} updateHandler={checkboxHandler}/>
            <div className={styles['arrows']}>
                <div
                    className={styles['up']}
                    onClick={() => {
                        moveChapter(viewModelI.id, 'up');
                    }}
                >
                    ▲
                </div>
                <div
                    className={styles['down']}
                    onClick={() => {
                        moveChapter(viewModelI.id, 'down');
                    }}
                >
                    ▼
                </div>
            </div>
        </article>
    )
}

type ChapterCheckboxProps = {
    isComplete: boolean,
    updateHandler: (isComplete: boolean) => void
}

function ChapterCheckbox({isComplete, updateHandler}: ChapterCheckboxProps) {
    const [complete, setComplete] = useImmer<boolean>(isComplete);

    const checkbox = useRef<HTMLDivElement>(null);

    // complete change update handler...
    // Need reference to marker div
    
    // Need to pass in handler function
    useEffect(() => {
        updateHandler(complete);
    }, [complete])

    return (
        <div
            className={styles['checkbox']}
            onClick={() => {
                setComplete(!complete);
                if(complete === true) {
                    checkbox.current?.classList.remove(styles['complete']);
                } else {
                    checkbox.current?.classList.add(styles['complete']);
                }
            }}
            ref={(element) => {
                if(element) {
                    checkbox.current = element;
                    if(complete === true) {
                        checkbox.current.classList.add(styles['complete'])
                    }
                }
            }}
        >
            ✓
        </div>
    )
}