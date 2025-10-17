import { type NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { answers, creativity } = await request.json()

    const prompt = `You are a creative portfolio designer. Based on the following user responses, generate a complete portfolio structure in JSON format.

User Responses:
- Top 3 Skills: ${answers.skills}
- Vibe (3 words): ${answers.vibe}
- Favorite Quote/Motto: ${answers.quote}
- Project Types: ${answers.projects}
- Dream Role/Mission: ${answers.mission}

Generate a JSON object with this exact structure:
{
  "tagline": "A short, punchy tagline (5-10 words)",
  "bio": "A compelling bio paragraph (2-3 sentences)",
  "projects": [
    {
      "title": "Project 1 Title",
      "description": "Brief project description (1-2 sentences)",
      "link": "https://example.com"
    },
    {
      "title": "Project 2 Title",
      "description": "Brief project description (1-2 sentences)",
      "link": "https://example.com"
    },
    {
      "title": "Project 3 Title",
      "description": "Brief project description (1-2 sentences)",
      "link": "https://example.com"
    }
  ],
  "heroLayout": "centered"
}

Make the content creative, professional, and aligned with their vibe. Use their skills and mission to craft compelling project ideas. Return ONLY the JSON object, no additional text.`

    const message = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      temperature: creativity,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== "text") {
      throw new Error("Unexpected response type from Claude")
    }

    // Extract JSON from response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("No JSON found in Claude response")
    }

    const portfolioData = JSON.parse(jsonMatch[0])

    return NextResponse.json(portfolioData)
  } catch (error) {
    console.error("[v0] Error in generate API:", error)
    return NextResponse.json({ error: "Failed to generate portfolio" }, { status: 500 })
  }
}
