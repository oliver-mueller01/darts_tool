"client side";
import React from "react";
import GameCard from "./GameCard";
import { Id } from "@/types";
import { db } from "@/app/db";

export default async function GamesList() {
  const first = await createGame("48f2db9e-a2b2-41e4-a15b-21e01be07546","4eecd79f-c738-4d6e-a075-974678f7bb64",1)
  const second = await createGame("4eecd79f-c738-4d6e-a075-974678f7bb64","672d95fd-988b-48af-ad98-a62503bf249a",2)
  const activeGames = await db.game.findMany({
    where: {
      active: true,
    },
  });

  const maxGameDay = Math.max.apply(
    Math,
    activeGames.map(function (o) {
      return o.gameday;
    })
  );
  var gameDayArraySplit = [];

  for (let i = 1; i <= maxGameDay; i++) {
    const gameDayObjects = await db.game.findMany({
      where: {
        gameday: i,
      },
    });
    gameDayArraySplit.push(gameDayObjects);
  }
  return (
    <div className="overflow-scroll">
      {gameDayArraySplit.map((gameDay) => {
        return(
        <div>
          <div className="w-full py-3 bg-gray-900">
            <h1 className="text-xl font-semibold text-white pl-[36px]">
              Spieltag
            </h1>
          </div>
          {gameDay.map(game => {
            return (<GameCard gameInfo={game}/>)
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

  function createGame(playerOneId: Id, playerTwoId: Id, gameday: number) {
    const playerOneIdString = playerOneId.toString();
    const playerTwoIdString = playerTwoId.toString();

    const match = db.game.create({
      data: {
        gameday: gameday,
        player1Id: playerOneIdString,
        player2Id: playerTwoIdString,
        player1Score: 3,
        player2Score: 3,
        active: true
      },
    });
    return match;
  }

  function disableAllActiveGames() {
    const updatedGames = db.game.updateMany({
      where: {
        finished: true,
      },
      data: {
        finished: false,
      },
    });
  }
}
