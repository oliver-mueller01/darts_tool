import { NextResponse } from "next/server";
import { Player } from "@prisma/client";
import { db } from "../../db"
export async function GET() {
    const test = await db.player.findMany()
    console.log(test)
   /*  const player: Player[] =
        [
            {
                id: "545454",
                name: "Oliver"
            },
            {
                id: "545453",
                name: "Olive2"
            },
        ] */
    return NextResponse.json(test)
}