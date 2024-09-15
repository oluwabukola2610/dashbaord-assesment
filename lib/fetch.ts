"use client";

export const fetchAPI = async (
  url: string,
  method?:string,
  options?: RequestInit
) => {
  try {
    const response = await fetch(url, {
      method,
      ...options, 
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};


