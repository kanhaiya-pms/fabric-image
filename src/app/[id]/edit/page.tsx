import EditImage from '@/components/EditImage';
import React from 'react';

interface Params {
  id: string;
}

// The `params` prop comes directly from Next.js for dynamic routes
const Page = async ({ params }: { params: Params }) => {
  try {
    console.log("id =>", params.id);

    const response = await fetch(
      `https://api.unsplash.com/photos/${params.id}?client_id=P49MYBIkd9hKmWtkvaUI9TFls4IZ4c_vnJo1C0uS0B0`
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
