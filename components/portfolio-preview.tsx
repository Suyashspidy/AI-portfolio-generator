"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Twitter, Mail, Sparkles, Download } from "lucide-react"
import { DeployDialog } from "@/components/deploy-dialog"

interface PortfolioData {
  hero: {
    title: string
    subtitle: string
    description: string
  }
  about: {
    title: string
    content: string
  }
  skills: {
    title: string
    categories: Array<{
      name: string
      items: string[]
    }>
  }
  projects: Array<{
    title: string
    description: string
    technologies: string[]
    highlights: string[]
  }>
  contact: {
    title: string
    description: string
  }
}

interface UserAnswers {
  name: string
  email: string
  github?: string
  linkedin?: string
  twitter?: string
}

interface PortfolioPreviewProps {
  portfolioData: PortfolioData
  userAnswers: UserAnswers
  onRegenerate: () => void
}

export function PortfolioPreview({ portfolioData, userAnswers, onRegenerate }: PortfolioPreviewProps) {
  const [showDeployDialog, setShowDeployDialog] = useState(false)

  const handleDeploy = () => {
    setShowDeployDialog(true)
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        {/* Action Bar */}
        <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-semibold">Your Generated Portfolio</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={onRegenerate}>
                Regenerate
              </Button>
              <Button onClick={handleDeploy}>
                <Download className="mr-2 h-4 w-4" />
                Deploy
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="container py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-balance md:text-6xl">
              {portfolioData.hero.title}
            </h1>
            <p className="mb-6 text-xl text-muted-foreground text-balance md:text-2xl">{portfolioData.hero.subtitle}</p>
            <p className="mb-8 text-lg text-muted-foreground text-pretty">{portfolioData.hero.description}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {userAnswers.github && (
                <Button variant="outline" size="lg" asChild>
                  <a href={userAnswers.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    GitHub
                  </a>
                </Button>
              )}
              {userAnswers.linkedin && (
                <Button variant="outline" size="lg" asChild>
                  <a href={userAnswers.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-5 w-5" />
                    LinkedIn
                  </a>
                </Button>
              )}
              {userAnswers.twitter && (
                <Button variant="outline" size="lg" asChild>
                  <a href={userAnswers.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="mr-2 h-5 w-5" />
                    Twitter
                  </a>
                </Button>
              )}
              <Button size="lg" asChild>
                <a href={`mailto:${userAnswers.email}`}>
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Me
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="container py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-3xl font-bold tracking-tight">{portfolioData.about.title}</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              {portfolioData.about.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="container py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold tracking-tight">{portfolioData.skills.title}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {portfolioData.skills.categories.map((category, index) => (
                <Card key={index} className="p-6">
                  <h3 className="mb-4 text-lg font-semibold">{category.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="container py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold tracking-tight">Featured Projects</h2>
            <div className="grid gap-6">
              {portfolioData.projects.map((project, index) => (
                <Card key={index} className="p-6">
                  <h3 className="mb-3 text-xl font-semibold">{project.title}</h3>
                  <p className="mb-4 text-muted-foreground">{project.description}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="container py-16 pb-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">{portfolioData.contact.title}</h2>
            <p className="mb-8 text-lg text-muted-foreground text-pretty">{portfolioData.contact.description}</p>
            <Button size="lg" asChild>
              <a href={`mailto:${userAnswers.email}`}>
                <Mail className="mr-2 h-5 w-5" />
                Send me an email
              </a>
            </Button>
          </div>
        </section>
      </div>

      {/* Deploy Dialog */}
      <DeployDialog
        open={showDeployDialog}
        onOpenChange={setShowDeployDialog}
        portfolioData={portfolioData}
        userAnswers={userAnswers}
      />
    </>
  )
}
