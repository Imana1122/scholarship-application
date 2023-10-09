import { Link } from '@inertiajs/react';

import React from 'react';
export default function ApplicationLogo(props) {
    return (
            <Link href='/'>
                <img {...props} viewBox="0 0 316 316" src='/storage/images/logo.png' alt='logo' className={`
            ${props.className}`} />
            </Link>

    );
}
