import { NextResponse } from "next/server"
import { put } from "@vercel/blob"

export async function POST(request: Request) {
  try {
    const { projectName, portfolioData, userAnswers } = await request.json()

    if (!projectName || !portfolioData || !userAnswers) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate the portfolio HTML/code
    const portfolioCode = generatePortfolioCode(portfolioData, userAnswers)

    // Store the portfolio code in Vercel Blob
    const blob = await put(`portfolios/${projectName}/index.html`, portfolioCode, {
      access: "public",
      contentType: "text/html",
    })

    // In a real implementation, this would trigger a Vercel deployment
    // For now, we'll return the blob URL as the "deployed" URL
    return NextResponse.json({
      success: true,
      url: blob.url,
      message: "Portfolio deployed successfully",
    })
  } catch (error) {
    console.error("Deployment error:", error)
    return NextResponse.json({ error: "Failed to deploy portfolio" }, { status: 500 })
  }
}

function generatePortfolioCode(portfolioData: any, userAnswers: any): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${userAnswers.name} - Portfolio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    body { font-family: 'Inter', sans-serif; }
  </style>
</head>
<body class="bg-gray-50">
  <!-- Hero Section -->
  <section class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
    <div class="max-w-3xl text-center">
      <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-4">${portfolioData.hero.title}</h1>
      <p class="text-xl md:text-2xl text-gray-700 mb-6">${portfolioData.hero.subtitle}</p>
      <p class="text-lg text-gray-600 mb-8">${portfolioData.hero.description}</p>
      <div class="flex flex-wrap gap-4 justify-center">
        ${userAnswers.github ? `<a href="${userAnswers.github}" class="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition">GitHub</a>` : ""}
        ${userAnswers.linkedin ? `<a href="${userAnswers.linkedin}" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">LinkedIn</a>` : ""}
        <a href="mailto:${userAnswers.email}" class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">Contact Me</a>
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section class="py-20 px-4">
    <div class="max-w-3xl mx-auto">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">${portfolioData.about.title}</h2>
      <div class="text-lg text-gray-700 space-y-4">
        ${portfolioData.about.content
          .split("\n\n")
          .map((p: string) => `<p>${p}</p>`)
          .join("")}
      </div>
    </div>
  </section>

  <!-- Skills Section -->
  <section class="py-20 px-4 bg-white">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">${portfolioData.skills.title}</h2>
      <div class="grid md:grid-cols-3 gap-6">
        ${portfolioData.skills.categories
          .map(
            (cat: any) => `
          <div class="p-6 border border-gray-200 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">${cat.name}</h3>
            <div class="flex flex-wrap gap-2">
              ${cat.items.map((skill: string) => `<span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">${skill}</span>`).join("")}
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  </section>

  <!-- Projects Section -->
  <section class="py-20 px-4">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">Featured Projects</h2>
      <div class="space-y-6">
        ${portfolioData.projects
          .map(
            (project: any) => `
          <div class="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 class="text-xl font-semibold text-gray-900 mb-3">${project.title}</h3>
            <p class="text-gray-700 mb-4">${project.description}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              ${project.technologies.map((tech: string) => `<span class="px-3 py-1 border border-gray-300 text-gray-700 rounded-full text-sm">${tech}</span>`).join("")}
            </div>
            <ul class="space-y-2">
              ${project.highlights.map((highlight: string) => `<li class="flex items-start gap-2 text-sm text-gray-600"><span class="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-600 flex-shrink-0"></span>${highlight}</li>`).join("")}
            </ul>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section class="py-20 px-4 bg-gradient-to-br from-indigo-50 to-blue-100">
    <div class="max-w-2xl mx-auto text-center">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">${portfolioData.contact.title}</h2>
      <p class="text-lg text-gray-700 mb-8">${portfolioData.contact.description}</p>
      <a href="mailto:${userAnswers.email}" class="inline-block px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-lg font-medium">Send me an email</a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-8 px-4 border-t border-gray-200 bg-white">
    <div class="max-w-4xl mx-auto text-center text-sm text-gray-600">
      <p>© ${new Date().getFullYear()} ${userAnswers.name}. Generated with Promptfolio.</p>
    </div>
  </footer>
</body>
</html>`
}
