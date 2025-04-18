export const dynamic = "force-static";
import { NextResponse } from "next/server";

// API endpoint URL
const API_URL =
  "https://script.google.com/macros/s/AKfycbz8j2mEAYbOlsLHEIFwunY1ygxR0xqJeL0EPHdUYUpG_RcJYtXKe4_MyaOyBhB5LJFE/exec";

export async function GET() {
  try {
    // Fetch data from the Google Apps Script API
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Important: Use next.js cache settings
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Return the data
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching T-shirt data:", error);

    // Return mock data when the API call fails
    const mockData = {
      "3XS": { distributed: 5, stockReceived: 10, availability: 5 },
      "2XS": { distributed: 10, stockReceived: 20, availability: 10 },
      XS: { distributed: 20, stockReceived: 30, availability: 10 },
      S: { distributed: 40, stockReceived: 50, availability: 10 },
      M: { distributed: 80, stockReceived: 100, availability: 20 },
      L: { distributed: 70, stockReceived: 80, availability: 10 },
      XL: { distributed: 40, stockReceived: 50, availability: 10 },
      "2XL": { distributed: 20, stockReceived: 30, availability: 10 },
      "3XL": { distributed: 5, stockReceived: 10, availability: 5 },
    };

    return NextResponse.json(mockData, {
      status: 200,
      headers: {
        "X-Mock-Data": "true",
        "X-Error-Message": error.message,
      },
    });
  }
}
