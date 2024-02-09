"client side"
import { db } from '@/app/db'
import { Id } from '@/types'
import { Game } from '@prisma/client'
import { stringify } from 'querystring'
import React from 'react'

interface Props {
  gameInfo: Game
}
async function GameCard(props: Props) {
  const {gameInfo} = props

  const player1Name = await db.player.findFirst({
    where: {
      id: gameInfo.player1Id
    }
  })

  const player2Name = await db.player.findFirst({
    where: {
      id: gameInfo.player2Id
    }
  })

  const player1ScoreStr = gameInfo.player1Score.toString()
  const player2ScoreStr = gameInfo.player2Score.toString()
  return (
    <div className='grid grid-cols-9 px-3 border-y h-[100px] items-center text-center hover:bg-slate-950'>
      <h1 className='col-span-3 text-xl font-bold'>{player1Name?.name}</h1>
      <h2 className='col-span-1 text-3xl text-primary font-bold'>{player1ScoreStr !== "69" ? player1ScoreStr : " "}</h2>
      <h3 className='col-span-1'>vs</h3>
      <h2 className='col-span-1 text-3xl text-primary font-bold'>{player2ScoreStr !== "69" ? player2ScoreStr : " "}</h2>
      <h1 className='col-span-3 text-xl font-bold'>{player2Name?.name}</h1>
    </div>
  )
}

export default GameCard