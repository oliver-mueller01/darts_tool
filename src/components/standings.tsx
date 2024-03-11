import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface GameData {
  playerId: string;
  playerName: string;
  gameWinCount: number;
  legsWon: number;
  legsLost: number;
  totalGames: number;
}

async function fetchStandings() {
  const res = await fetch("http://localhost:3000/api/getGameDayStandings", {
    cache: "no-store"
  }) 
  
  return res.json()
}

async function Standings() {
  const currentStandings: GameData[] = await fetchStandings()
  const sortedStandings = currentStandings.sort(function (a, b) {
    return a.gameWinCount - b.gameWinCount || a.legsWon - b.legsWon
  })
  sortedStandings.reverse()
  //console.log(sortedStandings)
  return (
    <div className="">
      {sortedStandings.map((p) => {
        return (
          <div className="grid grid-cols-5 gap-4 pt-3 items-center">
            <span className="text-primary text-2xl col-span-1 items-center pl-3">{sortedStandings.findIndex((fI) => fI.playerId === p.playerId) + 1 }</span>
            <div className="col-span-3 flex flex-row items-center gap-4 justify-center">
              {/* <Avatar className="">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar> */}
              <h1 className="font-semibold text-l">{p.playerName}</h1>
            </div>
            <div className="col-span-1 items-center pr-3 text-right">
              <p className="text-primary">W:{p.legsWon}</p>
              <p className="">L:{p.legsLost}</p>
            </div>
          </div>
        )
      })}
      <div className="flex flex-grow">
      </div>
    </div>
  );
}

export default Standings;
