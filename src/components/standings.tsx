import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function Standings() {
  return (
    <div className="">
      <div className="grid grid-cols-5 gap-4 pt-3 items-center">
        <span className="text-primary text-2xl col-span-1 items-center pl-3">1.</span>
        <div className="col-span-3 flex flex-row items-center gap-4 justify-center">
        {/* <Avatar className="">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar> */}
        <h1 className="font-semibold text-l">Oliver Müller</h1>
        </div>
        <div className="col-span-1 items-center pr-3 text-right">
        <p className="text-primary">W:2</p>
        <p className="">L:1</p>
        </div>
      </div>



      <div className="grid grid-cols-5 gap-4 pt-3 items-center">
        <span className="text-primary text-2xl col-span-1 items-center pl-3">2.</span>
        <div className="col-span-3 flex flex-row items-center gap-4 justify-center">
        {/* <Avatar className="">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar> */}
        <h1 className="font-semibold">Sebastian Römer</h1>
        </div>
        <div className="col-span-1 items-center pr-3 text-right">
        <p className="text-primary">W:1</p>
        <p className="">L:2</p>
        </div>
      </div>
      
      <div className="flex flex-grow">
      </div>
    </div>
  );
}

export default Standings;
