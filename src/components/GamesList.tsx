import React from "react";
import GameCard from "./GameCard";
import { db } from "@/app/db";

export default async function GamesList() {
  /* const first = await createGame("48f2db9e-a2b2-41e4-a15b-21e01be07546","4eecd79f-c738-4d6e-a075-974678f7bb64",1)
  const second = await createGame("4eecd79f-c738-4d6e-a075-974678f7bb64","672d95fd-988b-48af-ad98-a62503bf249a",2) */
  const gameDayGames = await db.gameDay.findMany();

  const maxGameDay = Math.max.apply(
    Math,
    gameDayGames.map(function (o) {
      return o.gameday;
    })
  );
  var gameDayArraySplit= [];

  for (let i = 1; i <= maxGameDay; i++) {
    const gameDayObjects = await db.gameDay.findMany({
      where: {
        gameday: i,
      },
    });
    gameDayArraySplit.push(gameDayObjects);
  }

  

  return (
    <div className="overflow-auto">
      {gameDayArraySplit.map((gameDay, index) => {
        return(
        <div>
          <div className="w-full py-3 bg-gray-900">
            <h1 className="text-xl font-semibold text-white pl-[36px]">
              Spieltag {index +1}
            </h1>
          </div>
          {gameDay.map(async game => {
            const player1Name = await db.player.findFirst({
              where: {
                id: game.player1Id
              }
            })
          
            const player2Name = await db.player.findFirst({
              where: {
                id: game.player2Id
              }
            })
            return (<div>
              <GameCard gameInfo={game} player1Name={player1Name?.name} player2Name={player2Name?.name}/>
              </div>)
          })}
        </div>)
      })}
      {/*  <div className="w-full py-3 bg-gray-900">
      <h1 className="text-xl font-semibold text-white pl-[36px]">Spieltag 1</h1>
      </div>
      <GameCard gameInfo={gameInfo}/>
      <GameCard gameInfo={gameInfo}/>
      <GameCard gameInfo={gameInfo}/>
      <GameCard gameInfo={gameInfo}/>
      <div className="w-full py-3 bg-gray-900">
      <h1 className="text-xl font-semibold text-white pl-[36px]">Spieltag 2</h1>
      </div>
      <GameCard gameInfo={gameInfo}/>
      <GameCard gameInfo={gameInfo}/>
      <GameCard gameInfo={gameInfo}/>
      <GameCard gameInfo={gameInfo}/>
      <GameCard gameInfo={gameInfo}/>
      <GameCard gameInfo={gameInfo}/>
      <GameCard gameInfo={gameInfo}/> */}
    </div>
  );
}
