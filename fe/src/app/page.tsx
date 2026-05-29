"use client";

import axios from "axios";
import { useState } from "react";
import ShortenUrl from "./components/ShortenUrl";
import GetUrl from "./components/GetUrl";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_BASE_URL is not set");
}

export default function Home() {
  const [shortUrl, setShortUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [activeTab, setActiveTab] = useState("shorten");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.post(`${BASE_URL}/shorten`, {
      url: originalUrl,
    });
    setShortUrl(response.data.short_url);
  };

  const handleGetUrl = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/${shortUrl}`);
    const data = await response.json();
    setOriginalUrl(data.original_url);
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-row gap-2">
        <button
          onClick={() => setActiveTab("shorten")}
          className={`${activeTab === "shorten" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500"} rounded-md p-2`}
        >
          Shorten
        </button>
        <button
          onClick={() => setActiveTab("get")}
          className={`${activeTab === "get" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500"} rounded-md p-2`}
        >
          Get
        </button>
      </div>
      {activeTab === "shorten" ? (
        <ShortenUrl
          handleSubmit={handleSubmit}
          originalUrl={originalUrl}
          setOriginalUrl={setOriginalUrl}
          shortUrl={shortUrl}
        />
      ) : (
        <GetUrl
          handleGetUrl={handleGetUrl}
          shortUrl={shortUrl}
          setShortUrl={setShortUrl}
          originalUrl={originalUrl}
        />
      )}
    </div>
  );
}
