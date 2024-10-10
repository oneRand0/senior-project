// app/api/search/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const page = searchParams.get("pageno") || "1"; 

  console.log(page);
  

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  try {
    // Replace with your own instance if necessary
    const searxInstance = "https://searx.be";

    const response = await axios.get(`http://localhost:8080/search?q=${query}&format=json&pageno=${page}`, {
      params: {
        q: query,
        format: "json",
        pageno: page,
      },
    });
    
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching data from SearxNG:", error);
    return NextResponse.json({ error: "Failed to fetch search results" }, { status: 500 });
  }
}
