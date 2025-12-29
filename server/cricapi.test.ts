import { describe, expect, it } from "vitest";

describe("CricAPI Key Validation", () => {
  it("should have CRICAPI_KEY environment variable set", () => {
    const apiKey = process.env.CRICAPI_KEY;
    expect(apiKey).toBeDefined();
    expect(apiKey).not.toBe("");
    expect(typeof apiKey).toBe("string");
  });

  it("should be able to fetch matches from CricAPI", async () => {
    const apiKey = process.env.CRICAPI_KEY;
    if (!apiKey) {
      throw new Error("CRICAPI_KEY not set");
    }

    const response = await fetch(
      `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`
    );
    
    const data = await response.json();
    
    // Check that we got a valid response
    expect(response.ok).toBe(true);
    expect(data).toBeDefined();
    
    // CricAPI returns status field
    if (data.status === "failure") {
      // If API key is invalid or quota exceeded
      throw new Error(`CricAPI Error: ${data.reason || "Unknown error"}`);
    }
    
    // Valid response should have data array
    expect(data.status).toBe("success");
    console.log(`CricAPI returned ${data.data?.length || 0} matches`);
  }, 30000); // 30 second timeout for API call
});
