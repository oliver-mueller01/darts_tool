"use client"
import { db } from '@/app/db'
import { Id } from '@/types'
import { GameDay } from '@prisma/client'
import { stringify } from 'querystring'
import React, { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'

interface Props {
  gameInfo: GameDay
  player1Name: string | undefined
  player2Name: string | undefined
}

interface GameData {
  player1Score: number
  player2Score: number

  player1Average: number
  player2Average: number

  player1Dq: number
  player2Dq: number

  player1Hundreds: number
  player2Hundreds: number
}
function GameCard(props: Props) {
  const { gameInfo, player1Name, player2Name } = props
  const router = useRouter()

  const player1ScoreStr = gameInfo.player1Score.toString()
  const player2ScoreStr = gameInfo.player2Score.toString()

  const [gameData, setGameData] = useState<GameData>({
    player1Score: -1,
    player2Score: 0,

    player1Average: 0,
    player2Average: 0,

    player1Dq: 0,
    player2Dq: 0,

    player1Hundreds: 0,
    player2Hundreds: 0,
  })

  function handleSubmit() {
    const player1Score = (document.getElementById("player1Score") as HTMLInputElement).value
    const player1Average = (document.getElementById("player1Average") as HTMLInputElement).value
    const player1Dq = (document.getElementById("player1Dq") as HTMLInputElement).value
    const player1Hundreds = (document.getElementById("player1Hundreds") as HTMLInputElement).value

    const player2Score = (document.getElementById("player2Score") as HTMLInputElement).value
    const player2Average = (document.getElementById("player2Average") as HTMLInputElement).value
    const player2Dq = (document.getElementById("player2Dq") as HTMLInputElement).value
    const player2Hundreds = (document.getElementById("player2Hundreds") as HTMLInputElement).value


    setGameData({
      player1Score: parseInt(player1Score),
      player2Score: parseInt(player2Score),

      player1Average: parseFloat(player1Average),
      player2Average: parseFloat(player2Average),

      player1Dq: parseFloat(player1Dq),
      player2Dq: parseFloat(player2Dq),

      player1Hundreds: parseInt(player1Hundreds),
      player2Hundreds: parseInt(player2Hundreds)
    })
  }
  useEffect(() => {
    if (gameData.player1Score !== -1)
      createGame()
  }, [gameData]);

  function createGame() {
    const response = fetch('/api/createGame', {
      method: 'POST',
      body: JSON.stringify({
        gameDayId: gameInfo.id,
        player1Id: gameInfo.player1Id,
        player2Id: gameInfo.player2Id,
        player1Name: player1Name,
        player2Name: player2Name,
        player1Score: gameData.player1Score,
        player2Score: gameData.player2Score,
        player1InverseScore: gameData.player2Score,
        player2InverseScore: gameData.player1Score,
        player1Average: gameData.player1Average,
        player2Average: gameData.player2Average,
        player1Dq: gameData.player1Dq,
        player2Dq: gameData.player2Dq,
        player1Hundreds: gameData.player1Hundreds,
        player2Hundreds: gameData.player2Hundreds
      })}
    ).then(() => {
      router.refresh()
    })
    
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger className='grid grid-cols-9 px-3 border-y h-[100px] items-center text-center hover:bg-slate-950 w-full'>
      {gameInfo.winnerId === gameInfo.player1Id ? 
      <h1 className='col-span-3 text-xl font-bold text-green-700'>{player1Name}</h1>  :
      <h1 className='col-span-3 text-xl font-bold'>{player1Name}</h1>
      }
        <h2 className='col-span-1 text-3xl text-primary font-bold'>{gameInfo.finished ? player1ScoreStr : " "}</h2>
        <h3 className='col-span-1'>vs</h3>
        <h2 className='col-span-1 text-3xl text-primary font-bold'>{gameInfo.finished ? player2ScoreStr : " "}</h2>
      {gameInfo.winnerId === gameInfo.player2Id ? 
      <h1 className='col-span-3 text-xl font-bold text-green-700'>{player2Name}</h1>  :
      <h1 className='col-span-3 text-xl font-bold'>{player2Name}</h1>
      }
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Spielergebniss eintragen</AlertDialogTitle>
          <div className='border-b-2 mt-1 mb-1'></div>
          <div>
            <h1 className='font-bold mb-2 mt-2'>{player1Name}</h1>
            <div className='grid grid-cols-2 gap-4'>
              <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
                <Label >Score</Label>
                <Input type="text" id="player1Score" placeholder="0" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
                <Label >Average</Label>
                <Input type="number" id="player1Average" placeholder="0" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
                <Label >Doppelquote</Label>
                <Input type="number" id="player1Dq" placeholder="0" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
                <Label >100+</Label>
                <Input type="number" id="player1Hundreds" placeholder="0" />
              </div>
            </div>
          </div>
          <div>
            <h1 className='font-bold mb-2 mt-2'>{player2Name}</h1>
            <div className='grid grid-cols-2 gap-4'>
              <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
                <Label >Score</Label>
                <Input type="number" id="player2Score" placeholder="0" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
                <Label >Average</Label>
                <Input type="number" id="player2Average" placeholder="0" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
                <Label >Doppelquote</Label>
                <Input type="number" id="player2Dq" placeholder="0" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
                <Label >100+</Label>
                <Input type="number" id="player2Hundreds" placeholder="0" />
              </div>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Abbrechen</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Eintragen</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default GameCard