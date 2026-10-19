import styles from './page-title.module.css'

type PageTitleProps = {
    text: string
}

export default function PageTitle({text}: PageTitleProps) {
    return (
        <h1 className={styles['header']}>
            {text}
        </h1>
    )
}