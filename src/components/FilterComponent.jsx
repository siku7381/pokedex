'use client';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Select from 'react-select';
import { getPokemonsFromArray } from '../app/page';
import PokemonRow from './PokemonRow';
import TabPanel from './TabPanel';

const FilterComponent = ({ pokemons }) => {
    const [filteredArray, setFilteredArray] = useState();


    // console.log({ pokemons });
    useEffect(() => {
        const func = async () => {
            console.log({ filteredArray })
            // await getPokemonsFromArray(filteredArray);
        };
        func();
    }, [filteredArray]);

    return (
        <div>
            <div className='flex justify-end items-end'>
                <Select
                    value={filteredArray}
                    placeholder='Filter by name'
                    onChange={(e) => setFilteredArray(e)}
                    isMulti
                    className='w-1/2'

                    options={pokemons?.map((item) => {
                        return {
                            label: item.name,
                            value: item.id,
                            data: item
                        }
                    })}
                />

            </div>
            <TabPanel pokemons={pokemons} />

        </div>
    )
}

export default FilterComponent;
