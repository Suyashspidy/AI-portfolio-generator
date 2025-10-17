import { generateText } from "ai"
import { NextResponse } from "next/server"
import { put } from "@vercel/blob"

export async function POST(request: Request) {
  try {
    const answers = await request.json()

    // Generate portfolio content using Claude
    const { text } = await generateText({
      model: "anthropic/claude-sonnet-4",
      prompt: `You are a professional portfolio website generator. Based on the following information about a person, generate a complete, professional portfolio website content in JSON format.

User Information:
- Name: ${answers.name}
- Role/Title: ${answers.role}
- Bio: ${answers.bio}
- Skills: ${answers.skills}
- Projects: ${answers.projects}
- Contact Email: ${answers.email}
- GitHub: ${answers.github || "Not provided"}
- LinkedIn: ${answers.linkedin || "Not provided"}
- Twitter: ${answers.twitter || "Not provided"}

Generate a JSON object with the following structure:
{
  "hero": {
    "title": "A compelling headline",
    "subtitle": "A professional tagline",
    "description": "An engaging 2-3 sentence introduction"
  },
  "about": {
    "title": "About Me",
    "content": "A well-written 3-4 paragraph about section that expands on their bio and experience"
  },
  "skills": {
    "title": "Skills & Expertise",
    "categories": [
      {
        "name": "Category name (e.g., Frontend, Backend, Tools)",
        "items": ["skill1", "skill2", "skill3"]
      }
    ]
  },
  "projects": [
    {
      "title": "Project name",
      "description": "Detailed project description",
      "technologies": ["tech1", "tech2"],
      "highlights": ["achievement1", "achievement2"]
    }
  ],
  "contact": {
    "title": "Get In Touch",
    "description": "A friendly call-to-action message"
  }
}

Make the content professional, engaging, and tailored to their specific role and experience. Organize their skills into logical categories. Expand on their project descriptions to make them compelling. Return ONLY valid JSON, no markdown formatting.`,
    })

    // Parse the generated content
    let portfolioData
    try {
      // Remove markdown code blocks if present
      const cleanedText = text
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim()
      portfolioData = JSON.parse(cleanedText)
    } catch (parseError) {
      console.error("Failed to parse AI response:", text)
      throw new Error("Failed to parse generated content")
    }

    // Store the generated portfolio data in Vercel Blob
    const blob = await put(`portfolio-${Date.now()}.json`, JSON.stringify({ answers, portfolioData }), {
      access: "public",
      contentType: "application/json",
    })

    return NextResponse.json({
      success: true,
      portfolioData,
      blobUrl: blob.url,
    })
  } catch (error) {
    console.error("Error generating portfolio:", error)
    return NextResponse.json({ error: "Failed to generate portfolio" }, { status: 500 })
  }
}
