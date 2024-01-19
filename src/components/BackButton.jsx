'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';

const BackButton = () => {
    const router = useRouter();
    return (
        <div>
            <Button
                color='primary'
                variant="outlined"
                className=''
                onClick={() => router.back()}
            >
                <ArrowBackIcon />Back
            </Button>
        </div>
    )
}

export default BackButton