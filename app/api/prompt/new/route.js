import { connecttoDB } from "@utils/database"
import Prompt from '@models/prompt.model.js';
import mongoose from "mongoose"; 
export const POST=async(req,res)=>{
    const {userID,prompt,tag}=await req.json();

    try {
        await connecttoDB();
        const newPrompt=new Prompt({
            creator:userID,
            tag:tag,
            prompt:prompt
        })
        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt),{status:201})
    } catch (error) {
        console.log("ERROR :: CREATING PROMPT",error);
        return new Response("failed to create new prompt",{status:500});
    }
}