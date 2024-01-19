import { db } from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req, context) {
    try {
        const body = await req.json();
        console.log({ body, context })
        if (body.filteredArray) {
            const res = await db.pokemon.findMany({
                include: {
                    types: true
                },
                where: {
                    name: {
                        in: body.filteredArray
                    }

                },
            });
            return res;
        }
        else {
            const newPokemon = await db.pokemon.findMany({
                include: {
                    types: true
                }
            });
            return NextResponse.json(newPokemon, { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Couldn't get Pokemons" }, { status: 500 });

    }
}