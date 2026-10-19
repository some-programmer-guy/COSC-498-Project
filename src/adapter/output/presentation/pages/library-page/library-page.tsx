import styles from './library-page.module.css'

import PageTitle from "@/adapter/output/presentation/components/headers/page-title"
import LabelButton from '@/adapter/output/presentation/components/label-button/label-button'

import { LibraryPageVM } from './library-page-presenter';

type LibraryPageProps = {
    viewModel: LibraryPageVM
}

export default function LibraryPage({ viewModel }: LibraryPageProps) {
    const pageVM = viewModel;

    return (
        <>
            <div className='header-row'>
                <PageTitle text='Library'/>
                <LabelButton text='Add' href='/add-book'/>
            </div>
            {
                pageVM.books.map(book => (
                    <div key={book.id}>
                        <div>
                            {book.title}
                        </div>
                        <div>
                            {book.author}
                        </div>
                        <div>
                            {book.genre}
                        </div>
                        <br/>
                    </div>
                ))
            }
        </>
    );
}