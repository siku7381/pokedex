import { db } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { name, sprite, typesId } = await req.json();

        const newPokemon = await db.pokemon.create({
            data: {
                name: name,
                sprite: sprite,
                typesId: typesId
            }
        });
        return NextResponse.json(newPokemon, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Couldn't Create Pokemon" }, { status: 500 });

    }
}

