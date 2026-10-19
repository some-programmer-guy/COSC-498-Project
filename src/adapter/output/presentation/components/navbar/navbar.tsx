'use client'

import styles from './navbar.module.css'
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import HomeIcon from '../icons/home-icon';
import CalendarIcon from '../icons/calendar-icon';
import LibraryIcon from '../icons/library-icon';
import SettingsIcon from '../icons/settings-icon';

type NavbarButtonsRef = {
    [route: string]: {
        element: HTMLElement | undefined,
        label: string,
        icon: React.ReactElement
    }
}

export default function Navbar() {
    const pathname = usePathname();

    const navbarButtonsRef = useRef<NavbarButtonsRef>({
       '/': {
            element: undefined,
            label: 'Home',
            icon: <HomeIcon></HomeIcon>
       },
       '/calendar': {
            element: undefined,
            label: 'Calendar',
            icon: <CalendarIcon></CalendarIcon>
       },
       '/library': {
            element: undefined,
            label: 'Library',
            icon: <LibraryIcon></LibraryIcon>
       },
       '/settings': {
            element: undefined,
            label: 'Settings',
            icon: <SettingsIcon></SettingsIcon>
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
                [...Object.entries(navbarButtonsRef.current)].map(([route, {label, icon}]) => (
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
                        {icon}
                    </Link>
                ))
            }
        </div>
    );
}