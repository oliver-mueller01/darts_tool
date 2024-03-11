import { NextResponse } from "next/server";
import { db } from "../../db"

export async function GET() {
    const gameDayMatches = await db.gameDay.findMany()
    //console.log(gameDayMatches)

    const playerIDs: string[] = []

    gameDayMatches.map((match) => {
        if (!playerIDs.includes(match.player1Id)) {
            playerIDs.push(match.player1Id)
        }
        if (!playerIDs.includes(match.player2Id)) {
            playerIDs.push(match.player2Id)
        }
    })
    const players = await db.player.findMany()

    const playerData = playerIDs.map((id) => {
        const currentPlayer = players.find((p) => p.id === id)
        if (currentPlayer !== undefined) {
            return ({
                playerId: id,
                playerName: currentPlayer.name,
                gameWinCount: 0,
                legsWon: 0,
                legsLost: 0,
                totalGames: 0
            })
        }
    })

    gameDayMatches.forEach((game) => {
        //counting GameWins
        const gameWinnerId = game.winnerId
        const playerDataObjectWinner = playerData.find((p) => p?.playerId === gameWinnerId)
        if (playerDataObjectWinner !== undefined) {
            playerDataObjectWinner.gameWinCount = playerDataObjectWinner.gameWinCount + 1
        }

        //count player1Legs
        const player1Id = game.player1Id
        const player1DataObject = playerData.find((p) => p?.playerId === player1Id)


        //count player2Legs
        const player2Id = game.player2Id
        const player2DataObject = playerData.find((p) => p?.playerId === player2Id)
        if (player2DataObject !== undefined && player1DataObject !== undefined) {

            //console.log("adding for player:" + player1DataObject.playerName + " which is current score " + player1DataObject.legsWon + " the score of " + game.player1Score)
            player1DataObject.legsWon = player1DataObject.legsWon + game.player1Score
            player1DataObject.legsLost = player1DataObject.legsLost + game.player2Score
            // console.log("adding for player:" + player2DataObject.playerName + " which is current score " + player2DataObject.legsWon + " the score of " + game.player2Score)
            player2DataObject.legsWon = player2DataObject.legsWon + game.player2Score
            player2DataObject.legsLost = player2DataObject.legsLost + game.player1Score

            if (game.player2Score !== 0 && game.player1Score !== 0)
                player2DataObject.totalGames = player2DataObject.totalGames + 1
            player1DataObject.totalGames = player1DataObject.totalGames + 1
        }
    })
    /* 
    CONCEPT MARKINGS:
    [
        {
            playerId:
            playerName:
            gameWinCount:
            legsWon:
            legsLost:
        }
    ]
    ordered after gameWinCount, legsWon, legsLost
    */

    console.log(playerData)

    return NextResponse.json(playerData)
}