"use client";
import { useFetch } from "@/hook/useFetch";
import { useState } from "react";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";

interface PostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Posts = () => {
  const { data, loading, error } = useFetch<PostData[]>(
    "https://jsonplaceholder.typicode.com/posts",
    "GET"
  );
  
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;
  const postsToShow = data?.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize) || [];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="posts-container p-4">
      <div className="posts-list">
        {postsToShow.length ? (
          postsToShow.map((post) => (
            <div key={post.id} className="post-card mb-4 p-4 border rounded shadow-sm dark:bg-gray-800">
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">{post.title}</h2>
              <p className="text-gray-700 dark:text-gray-300">{post.body}</p>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-700 dark:text-gray-300">No results.</div>
        )}
      </div>

      <div className="pagination mt-6 flex justify-end items-center space-x-4 p-4">
        <button
          type="button"
          onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
          disabled={pageIndex === 0}
          className="p-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded disabled:opacity-50"
        >
          <BiArrowToLeft />
        </button>
        <span className="text-gray-800 dark:text-gray-200">
          Page {pageIndex + 1}
        </span>
        <button
          type="button"
          onClick={() => setPageIndex((prev) => Math.min(prev + 1, Math.ceil((data?.length || 0) / pageSize) - 1))}
          disabled={pageIndex >= Math.ceil((data?.length || 0) / pageSize) - 1}
          className="p-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded disabled:opacity-50"
        >
          <BiArrowToRight />
        </button>
      </div>
    </div>
  );
};

export default Posts;
