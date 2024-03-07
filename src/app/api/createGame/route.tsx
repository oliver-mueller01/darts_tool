import type { NextApiRequest, NextApiResponse } from "next";
import { Player } from "@prisma/client";
import { db } from "../../db"
import { NextResponse } from "next/server";



export async function POST(req: any) {
    const requestData = await req.json();
    console.log(requestData) 
    const game = await db.game.create({
        data:{
          player1Id: requestData.player1Id,
          player2Id: requestData.player2Id,
          player1Name: requestData.player1Name,
          player2Name: requestData.player2Name,
          player1Score: requestData.player1Score,
          player2Score: requestData.player2Score,
          player1InverseScore: requestData.player2Score,
          player2InverseScore: requestData.player1Score,
          player1Average: requestData.player1Average,
          player2Average: requestData.player2Average,
          player1Dq: requestData.player1Dq,
          player2Dq: requestData.player2Dq,
          player1Hundreds: requestData.player1Hundreds,
          player2Hundreds: requestData.player2Hundreds
        }
      }) 
   
    return NextResponse.json({}, { status: 201 });
}