
import { connecttoDB } from "@utils/database"
import Prompt from '@models/prompt.model.js';

export const GET= async (req,{params})=>{
    try {
        await connecttoDB();
        const data = await params.id
        const prompts = await Prompt.find({creator:data}).populate({
            path: 'creator', // Populate the `creator` field
            select: 'username email image', // Fetch specific fields
        });
        return new Response(JSON.stringify(prompts),{status:200});
    } catch (error) {
       console.log('ERROR :: FETCHING PROMPTS',error); 
       return new Response('failed to fetch prompts',{status:500});
    }
}