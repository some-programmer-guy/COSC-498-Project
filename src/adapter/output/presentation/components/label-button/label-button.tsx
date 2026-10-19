'use client';

import Link from 'next/link'
import styles from './label-button.module.css'

type LabelButtonProps = {
    text: string
    href?: string,
    action?: Function
}

export default function LabelButton({text, href, action}: LabelButtonProps) {
    if(href) {
        return (
            <Link className={styles['button']} href={href}>
                {text}
            </Link>
        )
    } else {
        return (
            <div className={styles['button']} onClick={() => {if(action) action();}}>
                {text}
            </div>
        )
    }
}