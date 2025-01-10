'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Profile from '../../components/Profile';

const MyProfileContent = () => {
  const router = useRouter();
  const params = useSearchParams();
  const id = params ? params.get('id') : null;
  const name = params ? params.get('name') : 'User';
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    if (!id) return;
    try {
      const response = await fetch(`/api/users/${id}/posts`);
      const res = await response.json();
      setPosts(res);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const isConfirm = confirm('Are you sure you want to delete this post?');
    if (isConfirm) {
      try {
        await fetch(`api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        });
        setPosts((prev) => prev.filter((p) => p._id !== post._id));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  return (
    <Profile
      name={name}
      desc="Welcome to your personalised profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

const MyProfile = () => {
  return (
    <Suspense fallback={<div>Loading profile...</div>}>
      <MyProfileContent />
    </Suspense>
  );
};

export default MyProfile;
