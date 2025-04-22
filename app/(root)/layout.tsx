import Link  from 'next/link';
import {ReactNode }from 'react';
import Image from 'next/image';

const RootLayout =({children} :{children :ReactNode})=>{
    return (
        <div className='root-layout'>
            <nav>
                <Link href="/" className='flex items-center gap-2'>
                    <Image src="/logo.png" alt="logo" height={32} width={38} />
                    <h2 className='text-primary-100'>InterviewPrep</h2>
                
                </Link>
                {children}
            </nav>
        </div>
    )
}

export default RootLayout;
// This is a simple React component that serves as a layout for a web application.