import { BookVM } from '@/application/actions.js'
import styles from './book-card.module.css'

type BookCardProps = {
    book: BookVM
}

export default function BookCard({ book }: BookCardProps) {
    return (
        <article className={styles['card']}>
            <div className={styles['cover']}></div>
            <div className={styles['details']}>
                <div className={styles['title']}>
                    
                </div>
                <div className={styles['author']}>

                </div>
                <div className={styles['genre']}>

                </div>
            </div>
        </article>
    )
}