"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSearch = async () => {
        setError("");
        setImages([])
        try {
            const response = await fetch(
                `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY || "P49MYBIkd9hKmWtkvaUI9TFls4IZ4c_vnJo1C0uS0B0"}`
            );
            const data = await response.json();

            if (data.results.length === 0) {
                setError("No images found. Please try another query.");
            } else {
                setImages(data.results);
            }
        } catch (err) {
            setError("An error occurred while fetching images. Please try again later.");
        }
    };

    return (
        <div className="w-full min-h-[100vh] bg-slate-400">
            <div className="px-10 py-5 text-2xl font-semibold">
                <div>Name: kanhaiya</div>
                <div>Email: kanhaiyanri43@gmail.com</div>
            </div>
            <div className="w-[60%] mx-auto py-24">
                <div className="w-full">
                    <input
                        type="text"
                        className="py-2 px-5 w-[80%] bg-zinc-900"
                        placeholder="Search for images"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className="shadow-lg px-5 py-2 w-[20%] bg-blue-600" onClick={handleSearch}>
                        Search
                    </button>
                </div>
                {error && 
                <div className="px-4 py-2 my-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                {error}
              </div> }
                {images?.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mt-10">
                        {images.map((img: any) => (
                            <div key={img.id} className="relative w-full h-[370px] bg-gray-100 overflow-hidden">
                                <img
                                    className="object-cover w-full h-full"
                                    src={img.urls.small}
                                    alt={img.alt_description || "Image"}
                                />
                                <button
                                    type="submit"
                                    className="absolute bottom-0 left-0 w-full px-5 py-2 bg-blue-600 text-white shadow-lg"
                                    onClick={() => router.push(`/${img.id}/edit`)}
                                >
                                    Add Captions
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
