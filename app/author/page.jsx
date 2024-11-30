'use client'
import React,{ Suspense } from "react";
import { useState , useEffect } from "react";
import { useSession  } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Profile from '@components/Profile'

const MyProfile = () => {
        const router=useRouter()
        const params=useSearchParams();
        const id=params.get('id');
        const name=params.get('name');
        const {data :session}=useSession();
        const [posts,setposts]=useState([]);
      
        const fetchPost=async ()=>{
          const response = await fetch (`/api/users/${id}/posts`);
          const res=await response.json();
          setposts(res);
        }
        
        useEffect(() => {
            fetchPost();
        }, []);

        const handleEdit = (post)=>{
            router.push(`/update-prompt?id=${post._id}`)
        }
        const handleDelete=async (post)=>{
            const isConfirm=confirm("Are you sure you want to delete this Post?");
            if(isConfirm){

              try {
                await fetch(`api/prompt/${post._id.toString()}`,{
                  method:'DELETE'
                })

                const filteredPost=posts.filter((p)=>  p._id!==post._id);
                setposts(filteredPost);
              } catch (error) {
                  console.log('ERROR :: WHILE DELETING POST!!',error);
                  return;
              }
            }
        }
  return (
    <div>
      <Profile name={name} desc='Welcome to your personalised profile page'
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  )
}
const SuspenseWrappedAuthorPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <MyProfile />
  </Suspense>
);

export default SuspenseWrappedAuthorPage;