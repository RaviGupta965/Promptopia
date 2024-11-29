
import { connecttoDB } from "@utils/database"
import Prompt from '@models/prompt.model.js';

// GET request for geting the prompt
export const GET= async (req,{params})=>{
    try {
        const data=params.id;
        await connecttoDB();
        const prompts = await Prompt.findById(data).populate({
            path: 'creator'
        });
        if(!prompts)    return new Response('Prompt not found',{status:404});
        return new Response(JSON.stringify(prompts),{status:200});
    } catch (error) {
       console.log('ERROR :: FETCHING PROMPTS',error); 
       return new Response('failed to fetch prompts',{status:500});
    }
}

// PATCH request for pushing the update

export const PATCH = async (req,{params})=>{
    const {prompt,tag}=await req.json();

    try {
        await connecttoDB();
        const prompt_id=params.id;
        const existing_prompt=await Prompt.findById(params.id);
        if(!existing_prompt)    return new Response('Prompt not exists',{status:404});

        existing_prompt.prompt=prompt;
        existing_prompt.tag=tag;

        await existing_prompt.save();

        return new Response(JSON.stringify(existing_prompt),{status:200});
    } catch (error) {
        console.log('ERROR :: UPDATING PROMPTS',error); 
        return new Response('failed to update prompts',{status:500});
    }
}

// DELETE request for deleting a post
export const DELETE = async (req,{params})=>{

    try {
        await connecttoDB();
        const prompt_id=params.id;
        await Prompt.findByIdAndDelete(prompt_id);
        await existing_prompt.save();

        return new Response(JSON.stringify(existing_prompt),{status:200});
    } catch (error) {
        console.log('ERROR :: DELETEING PROMPTS',error); 
        return new Response('failed to delete prompts',{status:500});
    }
}