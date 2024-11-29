'use client';

import { useState,useEffect } from "react";

import Promptcard from "./Promptcard.jsx";


const PromptCardList=({data,handleTagClick})=>{
  return (
    <div className="mt-16 prompt_layout">
      {
        Array.isArray(data) && data.map((post) => (
          <Promptcard key={post._id} post={post} handleTagClick={handleTagClick} />
        ))
      }
    </div>
  );
};
const Feed = () => {
  const [searchText,setsearchText]=useState('');
  const [posts,setposts]=useState([]);

  const fetchPost=async ()=>{
    const response = await fetch ('/api/prompt');
    const res=await response.json();
    setposts(res);
  }

    useEffect(()=>{
      fetchPost();
    },[])

    const filterPosts=(filter)=>{
      const filtered_post= posts.filter((post)=>(
          post.creator.username.toUpperCase().includes(filter.toUpperCase()) || post.tag.toUpperCase().includes(filter.toUpperCase()))
      );
        setposts(filtered_post);
    }
  const handleSearchchange=(e)=>{
    const filter=e.target.value;
    setsearchText(filter);
    if(filter!=='') filterPosts(filter);
    else fetchPost();
  }

  

  const handleTagClick=(value)=>{
    setsearchText(value);
    filterPosts(value);
  }

  return (
    <div className="feed">
      <form className="relative w-full flex-center" action="">
        <input type="text" placeholder="search for tag or username" value={searchText} onChange={handleSearchchange} className="search_input peer" />
      </form>

      <PromptCardList 
        data={posts}
        handleTagClick={handleTagClick}
      />
    </div>
  )
}

export default Feed;
