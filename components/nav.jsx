'use client'
import Link from "next/link"
import Image from "next/image"
import { useState,useEffect } from "react";
import {signIn,signOut,useSession,getProviders} from 'next-auth/react'
const Nav = () => {
  const {data:session}=useSession();
  const [provider,setprovider]=useState(null);
  const [toggledropdown,settoggledropdown]=useState(false);
  useEffect(()=>{
    const setProvider=async ()=>{
      const response=await getProviders();

      setprovider(response);
    }
    setProvider();
  },[])
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href='/' className="flex gap-2 flex-center">
        <Image height={30} width={30} alt="Logo" src='/assets/images/logo.svg'/>
        <p className="logo_text">Promptopia</p>
      </Link> 

      {/* Desktop nacvigation */}
      <div className="sm:flex hidden">
        { session?.user ? (
          <div className="flex  gap-3 md:gap-5 ">
              <Link href="/profile" className="black_btn" onClick={()=>settoggledropdown(false)}>My Profile</Link>
              <Link href="/create-prompt" className="black_btn">Create Post</Link>
              <button onClick={signOut} className="outline_btn">Signout</button>
              <Link href="/profile">
                <Image className="rounded-full" alt="profile" width={37} height={37} src={session?.user.image} />
              </Link>
          </div>
        ) : (
          <>
            {
              provider && Object.values(provider).map((provider)=>{
                return <button className="black_btn" type="button" key={provider.name} onClick={()=>signIn(provider.id)}>
                    Sign in
                </button>
              })
            }
          </>
        ) }
      </div>

      {/* Mobile view */}
      <div className="sm:hidden flex relative">
        {
          session?.user ?(
            <div className="flex">
              <Image onClick={()=>{settoggledropdown((prev)=>!prev)}} className="rounded-full" alt="profile" width={37} height={37} src="/assets/images/logo.svg"/>
              {toggledropdown &&
                <div className="dropdown">
                  <Link href="/profile" className="dropdown_link" onClick={()=>settoggledropdown(false)}>My Profile</Link>
                  <Link href="/create-prompt" className="dropdown_link" onClick={()=>settoggledropdown(false)}>createprompt</Link>
                  <button type="button" onClick={()=>{
                    settoggledropdown(false);
                    signOut();
                  }} className="mt-5 w-full black_btn">
                      Sign out
                  </button>
                </div>
              }
            </div>
          ):(
            <>
            {
              provider && Object.values(provider).map((provider)=>(
                <button className="black_btn" type="button" key={provider.name} onClick={()=>signIn(provider.id)}>
                    Sign in
                </button>
              ))
            }
          </>
          )
        }
      </div>
    </nav>
  )
}

export default Nav
