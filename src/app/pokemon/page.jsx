'use client';
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import FormPokemon from '../../components/FormPokemon';
import BackButton from '../../components/BackButton';
import { useRouter } from 'next/navigation';

const AddPokemonPage = () => {
    const router = useRouter();

    const createPokemon = async (data) => {
        console.log(data);
        submitPokemon(data);

    }
    const { mutate: submitPokemon, isPending } = useMutation({
        mutationFn: async (newPokemon) => {
            const res = await axios.post('/api/pokemon', newPokemon);
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
        <div>
            <div className='flex justify-center items-center gap-5'>

                <BackButton />
                <span className='text-2xl font-semibold text-center shadow-2xl'>Add New Pokemon</span>
            </div>
            <FormPokemon submit={createPokemon} isLoading={isPending} />
        </div>
    )
}

export default AddPokemonPage