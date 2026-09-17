'use client'

import styles from './navbar.module.css'
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

type NavbarButtonsRef = {
    [route: string]: {
        element: HTMLElement | undefined,
        label: string
    }
}

export default function Navbar() {
    const pathname = usePathname();

    const navbarButtonsRef = useRef<NavbarButtonsRef>({
       '/': {
            element: undefined,
            label: 'Home'
       },
       '/calendar': {
            element: undefined,
            label: 'Calendar'
       },
       '/media': {
            element: undefined,
            label: 'Media'
       },
       '/settings': {
            element: undefined,
            label: 'Settings'
       },
    });

    function handleRouteChange() {
        if(!navbarButtonsRef.current[pathname]) {
            return;
        }

        for(const {element} of Object.values(navbarButtonsRef.current)) {
            if(!element) {
                continue;
            }

            element.classList.remove(styles['active']);
        }

        const activeElement = navbarButtonsRef.current[pathname].element;

        if(activeElement) {
            activeElement.classList.add(styles['active']);
        }
    }

    // On route change: Handle route change
    useEffect(() => {
        handleRouteChange();
    }, [pathname]);


    return (
        <div className={`${styles['navbar']}`}>
            {
                [...Object.entries(navbarButtonsRef.current)].map(([route, {label}]) => (
                    <Link
                        key={label}
                        href={route}
                        className={`${styles['button']}`}
                        ref={(element) => {
                            if(element) {
                                navbarButtonsRef.current[route].element = element;
                            }
                        }}
                    >
                        {label}
                    </Link>
                ))
            }
        </div>
    );
}