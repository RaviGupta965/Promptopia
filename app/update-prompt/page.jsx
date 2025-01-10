'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '../../components/Form';

const EditPromptContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams ? searchParams.get('id') : null;

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  const fetchData = async () => {
    if (!promptId) return;

    try {
      const res = await fetch(`/api/prompt/${promptId}`);
      if (!res.ok) {
        throw new Error('Failed to fetch prompt data');
      }
      const data = await res.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    } catch (error) {
      console.error('Error fetching prompt data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) {
      alert('Prompt ID is missing');
      return;
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Error updating prompt:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

const EditPromptPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPromptContent />
    </Suspense>
  );
};

export default EditPromptPage;


