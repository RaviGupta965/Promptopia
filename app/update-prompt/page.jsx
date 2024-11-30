'use client';

import { useEffect, useState } from 'react';
import { useRouter,useSearchParams } from 'next/navigation';
import Form from '@components/Form.jsx';
const EditPromptPage = () => {
    const router=useRouter();
    const searchparams=useSearchParams();
    const promptid=searchparams.get('id');

    const [submitting,setsubmitting]=useState(false);
    const [post,setpost]=useState({
        prompt:'',
        tag:'',
    })
    
    
    const fetchdata=async()=>{
      const res=await  fetch(`/api/prompt/${promptid}`);
      const data=await res.json();

      setpost({
        prompt:data.prompt,
        tag:data.tag
      })
    }

    useEffect(()=>{
      fetchdata();
    },[promptid])


    const updatePrompt=async (e)=>{
        e.preventDefault();
        setsubmitting(true);

        if(!promptid)  return  alert('Prompt ID is missing')
        try {
            const response = await fetch(`/api/prompt/${promptid}`,
                {
                    method:'PATCH',
                    body: JSON.stringify({
                        prompt:post.prompt,
                        tag:post.tag,
                    })
                }
            );

            if(response.ok){
                router.push('/');
            }

        } catch (error) {
            console.log(error);
        }
        finally{
            setsubmitting(false);
        }
    }

  return (
    <Form 
        type="Edit"
        post={post}
        setpost={setpost}
        submitting={submitting}
        handleSubmit={updatePrompt}
    />
  )
}

export default EditPromptPage;
