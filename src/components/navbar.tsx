"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

export default async function Navbar() {
  const router = useRouter()

  const openCreateForm = () => {
    router.push('/generateGamePage')
  }

  function goBackHome() {
    router.push("/")
  }

  function debug(){
    fetch("/api/getGameDayStandings")
  }

  return (
    <nav className='inset-x-0 w-full h-[80px] bg-[#111] border-b-2 
    border-b-primary flex items-center justify-between z-50 top-0 overflow-hidden fixed nav'>
        <div className='text-2xl font-semibold pl-[36px] cursor-pointer' onClick={goBackHome}>
            Seefahrer<span className='text-primary font-bold'>180</span>.
        </div>
        <div className='pr-[36px]'>
        <Button onClick={openCreateForm} className="text-white">Spiele erstellen</Button>
        </div>
    </nav>
  )
}
