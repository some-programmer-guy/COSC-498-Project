import styles from './page-header.module.css'

type PageHeaderProps = {
    text: string
}

export default function PageHeader({text}: PageHeaderProps) {
    return (
        <h2 className={styles['header']}>
            {text}
        </h2>
    )
}