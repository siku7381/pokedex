'use client';
import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

const FormPokemon = ({ submit, isLoading }) => {
    const { register, handleSubmit } = useForm();
    const [filteredArray, setFilteredArray] = useState(null);

    const { data: typesList, isLoading: isTypeLoading } = useQuery({
        queryKey: ['types'],
        queryFn: async () => {
            const res = await axios.get('/api/types');
            return res.data
        }
    });
    // console.log(typesList, pokemons);
    return (
        <form onSubmit={handleSubmit(submit)} className='flex justify-center items-center flex-col gap-10 mt-10'>
            <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                placeholder='Name'
                className='w-full max-w-lg'
                {...register('name', { required: true })}
            />
            <TextField
                id="outlined-basic"
                label="Sprite"
                variant="outlined"
                placeholder='Sprite'
                className='w-full max-w-lg'
                {...register('sprite', { required: true })}
            />
            <FormControl fullWidth className='w-full max-w-lg'>
                <InputLabel id="demo-simple-select-label">Types</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="Types"
                    // onChange={handleChange}
                    {...register('typesId', { required: true })}
                >
                    {
                        typesList?.map((item) => {
                            return (
                                <MenuItem value={item?.id} key={item?.id}>{item?.name}</MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
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

export default FormPokemon;