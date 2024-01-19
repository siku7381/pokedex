'use client';
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import FormTypes from '../../components/FormTypes';
import BackButton from '../../components/BackButton';
import { useRouter } from 'next/navigation';

const AddTypePage = () => {
    const router = useRouter();

    const createType = async (data) => {
        console.log(data);
        submitType(data);

    }
    const { mutate: submitType, isPending } = useMutation({
        mutationFn: async (newType) => {
            const res = await axios.post('/api/types', newType);
            return res
        },
        onError: (error) => {
            console.log(error);
        },
        onSuccess: () => {
            router.push('/');
            router.refresh();
        }
    })
    return (
        <div className='mt-10'>
            <div className='flex justify-center items-center gap-5'>

                <BackButton />
                <span className='text-2xl font-semibold text-center shadow-2xl'>Add New Types</span>
            </div>
            <FormTypes submit={createType} isLoading={isPending} />
        </div>
    )
}

export default AddTypePage;