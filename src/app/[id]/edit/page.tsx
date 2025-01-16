import EditImage from '@/components/EditImage';
import React from 'react';

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// The params prop comes directly from Next.js for dynamic routes
const Page = async ({ params }: Props) => {
  try {
    const id = (await params).id

    const response = await fetch(
      `https://api.unsplash.com/photos/${id}?client_id=P49MYBIkd9hKmWtkvaUI9TFls4IZ4c_vnJo1C0uS0B0`
    );

    if (!response.ok) {
      console.error("Failed to fetch the image");
      return <div>Error: Unable to fetch image details.</div>;
    }

    const data = await response.json();

    return <EditImage image={data?.urls?.small} />;
  } catch (error) {
    console.error("Error fetching the image:", error);
    return <div>Error: Something went wrong while fetching the image.</div>;
  }
};

export default Page;