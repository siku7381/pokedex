'use client';
import React from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

const FormTypes = ({ submit, isLoading }) => {
    const { register, handleSubmit } = useForm();

    const { data: typesList, isLoading: isTypeLoading } = useQuery({
        queryKey: ['types'],
        queryFn: async () => {
            const res = await axios.get('/api/types');
            return res.data
        }
    });
    console.log(typesList);
    return (
        <form onSubmit={handleSubmit(submit)} className='flex justify-center items-center flex-col gap-10 mt-10'>
            <TextField
                id="outlined-basic"
                label="Type Name"
                variant="outlined"
                placeholder='Type Name'
                className='w-full max-w-lg'
                {...register('name', { required: true })}
            />

            <Button type='submit' color='primary' variant='outlined' className=' w-full max-w-lg shadow-2xl shadow-blue-500/50'>
                {
                    isLoading ?
                        <>
                            <CircularProgress size={25} />
                            <span className='mx-2'> Loading...</span>
                        </>
                        :
                        'Create'


                }
            </Button>
        </form>
    )
}

export default FormTypes;