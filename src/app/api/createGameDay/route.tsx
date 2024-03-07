import type { NextApiRequest, NextApiResponse } from "next";
import { Player } from "@prisma/client";
import { db } from "../../db"
import { NextResponse } from "next/server";


interface GameTemp {
    player1: Player;
    player2: Player;
}

interface GameDayTemp {
    name: string;
    games: GameTemp[];
}


/* function generateGameDays(players: Player[]): GameDayTemp[] {
    const gameDays: GameDayTemp[] = [];
    const totalPlayers = players.length;

    // Calculate the number of game days needed
    const numGameDays = totalPlayers % 2 === 0 ? totalPlayers - 1 : totalPlayers;

    for (let i = 0; i < numGameDays; i++) {
        const games: GameTemp[] = [];
        const rotatedPlayers = [...players];
        rotatedPlayers.push(rotatedPlayers.shift()!);

        for (let j = 0; j < totalPlayers / 2; j++) {
            const game: GameTemp = {
                player1: players[j],
                player2: rotatedPlayers[j],
            };
            games.push(game);
        }

        const gameDay: GameDayTemp = {
            name: `Game Day ${i + 1}`,
            games: games,
        };
        gameDays.push(gameDay);
    }

    return gameDays;
}
 */

const roundRobin = (players: Player[]) => {
    let schedule: any[][] = []
    let league = players.slice()
    
    if (league.length % 2 !== 0) {
      league.push(
        {id: "0", name:"None"}
        )
    }
    
    let rounds = league.length
    
    for (let j=0; j<(rounds-1); j ++) {
      schedule[j] = []
      for (let i=0; i<rounds/2; i++) {
        if (league[i].name !== 'None' && league[rounds-1-i].name !== 'None') {
          if (j % 2 == 1) {
            schedule[j].push([league[i], league[rounds-1-i]])
          } else {
            schedule[j].push([league[rounds-1-i], league[i]])
          }
        }
      }
      const shiftedPlayer = league.pop();
      if(shiftedPlayer){
      league.splice(1, 0, shiftedPlayer)
      }
    }
    return schedule
  }
export async function POST(req: any) {
    const requestData = await req.json();

    const gameDays = roundRobin(requestData);
    let gd_count = 1
    gameDays.map((day) => {
      day.map(async (daygame) => {
        console.log("Creating Game -- GameDay:"+ gd_count + " player1Id:" +daygame[0].id +" player2Id:"+ daygame[1].id)
        await db.gameDay.create({
          data: {
            gameday: gd_count,
            player1Id: daygame[0].id,
            player2Id: daygame[1].id
          }
        })
      })
      gd_count++
    })
   
    return NextResponse.json({gameDays }, { status: 201 });
}