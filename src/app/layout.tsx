import Navbar from "@/adapter/output/presentation/components/navbar/navbar";
import "./globals.css"

import localFont from 'next/font/local'

type RootLayoutProps = {
    children: React.ReactNode
}

const defaultFont = localFont({
    src: '../assets/fonts/SourceSans3-VariableFont_wght.ttf',
    variable: '--font-default'
});

export default function RootLayout({children}: RootLayoutProps) {
    return (
        <html className={`${defaultFont.variable}`}>
            <head>
                <title>Application</title>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
            </head>
            <body lang='en'>
                <div className='app-layout'>
                    <div className='app-page-view'>
                        {children}
                    </div>
                    <Navbar/>
                </div>
            </body>
        </html>
    );
}