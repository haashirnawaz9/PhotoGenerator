import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
    const user = currentUser();

    try {
        if(!user) {
            return NextResponse.json({message: "Not Authenticated"}, 
            {status: 500})
        }
    } catch (error) {
        return NextResponse.json({message: "Error", error})
    }
}