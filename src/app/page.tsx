"client side";

import GamesList from "@/components/GamesList";
import Standings from "@/components/standings";

export default function Home() {
  return (
    <div className="flex flex-wrap mt-20 min-h-dvh overflow-hidden  ">
      <div className="w-2/3 bg-gray-900">
        <GamesList />
      </div>
      <div className="border-l-2 border-l-primary w-1/3 fixed right-0 min-h-dvh">
        <div className="w-full border-b-2 pt-[30px] ">
          <h1 className="text-xl text-center font-semibold pb-2">
            Standings - <span className="italic text-primary">Spieltag</span>
          </h1>
        </div>
        <Standings />
      </div>
    </div>
  );
}
