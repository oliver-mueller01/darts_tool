import { NextRequest, NextResponse } from "next/server"
import { db } from "../../db"

export async function GET(request: NextRequest, context: { params: { id: string } }) {
    const p_id = request.nextUrl.searchParams.get("playerId") as string
    if(p_id === null){
        const allGames = await db.game.findMany({})
        return new NextResponse(JSON.stringify({ allGames }), { status: 200 });
    }else{
    const gamesAsPlayerOne = await db.game.findMany({
        where: {
            player1Id: p_id
        }
    })

    const gamesAsPlayerTwo = await db.game.findMany({
        where: {
            player2Id: p_id
        }
    })
    
    const allGames = gamesAsPlayerOne.concat(gamesAsPlayerTwo)


    return new NextResponse(JSON.stringify({ allGames }), { status: 200 });
    }   
}