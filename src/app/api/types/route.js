import { db } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const types = await db.types.findMany({
            include: {
                Pokemon: true
            }
        });
        return NextResponse.json(types, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Couldn't get Types" }, { status: 500 });

    }
}
export async function POST(req) {
    try {
        const { name } = await req.json();

        const newType = await db.types.create({
            data: {
                name: name,
            }
        });
        return NextResponse.json(newType, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Couldn't Create Type" }, { status: 500 });

    }
}