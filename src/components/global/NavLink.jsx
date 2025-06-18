import Link from 'next/link';
import React from 'react';

export default function NavLink({ href, children }) {

    return (
        <Link href={href} className="flex items-center justify-center px-8 h-full uppercase">
            {children}
        </Link>
    );
}
