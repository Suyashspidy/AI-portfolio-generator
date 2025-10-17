"use client"

import { useState } from "react"
import { QuestionForm } from "@/components/question-form"
import { PortfolioPreview } from "@/components/portfolio-preview"
import { Sparkles } from "lucide-react"

export type PortfolioData = {
  tagline: string
  bio: string
  projects: Array<{
    title: string
    description: string
    link: string
  }>
  heroLayout: string
}

export default function Home() {
  const [portfolioData, setPortfolioData] = useState(null)
  const [userAnswers, setUserAnswers] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async (answers: any) => {
    setIsGenerating(true)
    setUserAnswers(answers)

    try {
      const response = await fetch("/api/generate-portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      })

      const data = await response.json()

      if (data.success) {
        setPortfolioData(data.portfolioData)
      } else {
        alert("Failed to generate portfolio. Please try again.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRegenerate = () => {
    setPortfolioData(null)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">Promptfolio</h1>
          </div>
          <p className="text-sm text-muted-foreground hidden sm:block">AI-Powered Portfolio Generator</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {!portfolioData ? (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-balance leading-tight">
                Your portfolio,{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  AI-generated
                </span>
              </h2>
              <p className="text-lg text-muted-foreground text-pretty">
                Answer five quick questions and watch AI craft your perfect portfolio in seconds
              </p>
            </div>
            <QuestionForm onSubmit={handleGenerate} isLoading={isGenerating} />
          </div>
        ) : (
          <PortfolioPreview portfolioData={portfolioData} userAnswers={userAnswers} onRegenerate={handleRegenerate} />
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-24">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Powered by Claude AI • Built with Next.js</p>
        </div>
      </footer>
    </main>
  )
}
