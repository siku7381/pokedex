import { NextResponse } from 'next/server';
import { db } from '../../../../lib/db';

export async function GET(req) {
    try {
        const { pokemonArray } = await req.json();
        const newPokemon = await db.pokemon.findMany({
            where: {
                name: {
                    in: pokemonArray
                }
            },
            include: {
                types: true
            }
        });
        return NextResponse.json(newPokemon, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Couldn't get Pokemons" }, { status: 500 });

    }
}