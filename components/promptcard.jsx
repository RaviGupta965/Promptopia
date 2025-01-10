'use client'
import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
const PromptCard = ({post,handleTagClick,handleEdit,handleDelete}) => {
  const [copied,setcopied]=useState("");
  const {data:session}=useSession();
  const pathName=usePathname();
  const router=useRouter();

  const handleCopy=()=>{
    setcopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    console.log(session)
    setTimeout(()=> setcopied(""),3000);
  }

  const getAuthorinfo = (id,name)=>{
    router.push(`/author?id=${id}&name=${name}`)
  }
  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center cursor-pointer gap-3'>
          <Image onClick={()=>getAuthorinfo(post.creator._id,post.creator.username)} src={post.creator.image} alt='user_image' height={40} width={40} className='rounded-full object-contain'/>
        </div>

        <div className='flex flex-col'>
          <h3 className='font-satoshi font-semibold text-gray-900'>
            {post.creator.username}
          </h3>
          <p className='font-inter text-sm text-gray-500'>
            {post.creator.email}
          </p>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
          <Image height={20} width={20} src={copied===post.prompt ?'/assets/icons/tick.svg' : '/assets/icons/copy.svg'}  alt='copy_text'/>
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p className='font-inter text-sm blue_gradient cursor-pointer' onClick={()=>handleTagClick(post.tag)} >#{post.tag}</p>

      {session?.user.id === post.creator._id && pathName==='/profile' && 
        (
          <div className='mt-4 flex-center gap-4 border-t border-gray-100 pt-3'>
            <p className='font-inter text-sm cursor-pointer green_gradient' onClick={handleEdit}>
              Edit
            </p>
            <p className='font-inter text-sm cursor-pointer orange_gradient' onClick={handleDelete}>
              Delete
            </p>
          </div>
        )
      }
    </div>
  )
}

export default PromptCard;
