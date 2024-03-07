"use client"
import { useEffect, useState } from "react"
import { db } from "../db"
import { Button } from "@/components/ui/button"
import { Player } from "@prisma/client"
import { useRouter } from "next/navigation"



const Page = () => {
    const router = useRouter()
    const [players, setPlayers] = useState<Player[]>([])
    const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([])

    useEffect(() => {
    {
        setPlayers([])
        fetch('/api/getPlayers')
            .then((res) => res.json())
            .then((data) => {
                data.map((d: Player) => {
                    setPlayers(players => [...players, d])
                })
            })
        }
    }, [])

    function selectPlayer(e: React.MouseEvent<HTMLDivElement>) {
        if (e.target instanceof Element){
            const clickedComponentId = e.target.id
            const clickedPlayerObject: Player | undefined = players.find((p)=> p.id === clickedComponentId)
            if(clickedPlayerObject !== undefined){
                if(selectedPlayers.find((p) => clickedPlayerObject.id === p.id) === undefined){
                    setSelectedPlayers(selectPlayers => [... selectPlayers, clickedPlayerObject])
                }else {
                    const newList = selectedPlayers.filter((p) => p.id !== clickedPlayerObject.id)
                    setSelectedPlayers(newList)
                }
                
            }else{
                console.log("ERR: Didnt find Player to the clicked ID!")
            }
        }
    }

    async function submitPlayers() {
        const response = fetch('/api/createGameDay', {
            method: 'POST',
            body: JSON.stringify(selectedPlayers)
          })
        router.push("/")
        router.refresh()
    }
    /*  const createGames = async () => {
         try {
             const response = await axios.get('/api/submit');
             console.log('Form data saved:', response.data.result);
             // Handle success scenario
           } catch (error) {
             console.error('Error saving form data:', error);
             // Handle error scenario
           }
     } */
    /* const [clickedPlayers, setClickedPlayers] = useState<Player[]>([]) */
    return (
        <div className="mt-20 pt-10 overflow-clip">
            <div>
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-semibold">Spieltag erstellen</h1>
                    <div className="w-[75%] border-b-2 mt-4"></div>
                    <h3 className="text-lg mt-5">Wähle die Spieler aus, die an dem Spieltag teilnehmen werden.</h3>
                    <div className="mt-5 text-center">
                        {players.map((p) => {
                            if(selectedPlayers.find((p2) => p.id === p2.id)){
                                return (
                                <div key={p.id} id={p.id} className="text-lg font-semibold bg-primary rounded-full border-2 cursor-pointer mb-2 px-3 py-1" onClick={selectPlayer}>
                                    {p.name}
                                </div>)
                            }
                            return (
                                <div key={p.id} id={p.id} className="text-lg font-semibold cursor-pointer border-2 rounded-full mb-2 px-3 py-1" onClick={selectPlayer}>
                                    {p.name}
                                </div>)
                        })}
                    </div>
                </div>
                <footer>
                    <div className="absolute bottom-0 right-0 left-0 flex flex-row gap-4 mb-4 justify-center w-full">
                        <Button className="text-white w-52" onClick={submitPlayers}>Spiele generieren</Button>
                    </div>

                </footer>
            </div>
        </div>
    )
}

export default Page