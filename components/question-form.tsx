"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { Loader2, Sparkles } from "lucide-react"

type QuestionFormProps = {
  onSubmit: (answers: any) => void
  isLoading: boolean
}

const questions = [
  {
    id: "skills",
    label: "What are your top 3 skills?",
    placeholder: "e.g., React, Design, Product Strategy",
    type: "input" as const,
  },
  {
    id: "vibe",
    label: "Describe your vibe in 3 words",
    placeholder: "e.g., Creative, Bold, Minimalist",
    type: "input" as const,
  },
  {
    id: "quote",
    label: "What's your favorite quote or motto?",
    placeholder: "e.g., Make it work, make it right, make it fast",
    type: "textarea" as const,
  },
  {
    id: "projects",
    label: "What kind of projects define you?",
    placeholder: "e.g., AI tools, design systems, open source",
    type: "textarea" as const,
  },
  {
    id: "mission",
    label: "What's your dream role or mission?",
    placeholder: "e.g., Building products that empower creators",
    type: "textarea" as const,
  },
]

export function QuestionForm({ onSubmit, isLoading }: QuestionFormProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [creativity, setCreativity] = useState([0.7])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ ...answers, creativity: creativity[0] })
  }

  const isFormValid = questions.every((q) => answers[q.id]?.trim())

  return (
    <Card className="p-8 bg-card border-border/50">
      <form onSubmit={handleSubmit} className="space-y-8">
        {questions.map((question, index) => (
          <div key={question.id} className="space-y-3">
            <Label htmlFor={question.id} className="text-base font-medium text-foreground">
              {index + 1}. {question.label}
            </Label>
            {question.type === "input" ? (
              <Input
                id={question.id}
                placeholder={question.placeholder}
                value={answers[question.id] || ""}
                onChange={(e) => setAnswers((prev) => ({ ...prev, [question.id]: e.target.value }))}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                disabled={isLoading}
              />
            ) : (
              <Textarea
                id={question.id}
                placeholder={question.placeholder}
                value={answers[question.id] || ""}
                onChange={(e) => setAnswers((prev) => ({ ...prev, [question.id]: e.target.value }))}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground min-h-[100px] resize-none"
                disabled={isLoading}
              />
            )}
          </div>
        ))}

        <div className="space-y-3 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between">
            <Label htmlFor="creativity" className="text-base font-medium text-foreground">
              Make it weirder
            </Label>
            <span className="text-sm text-muted-foreground">{Math.round(creativity[0] * 100)}%</span>
          </div>
          <Slider
            id="creativity"
            min={0}
            max={1}
            step={0.1}
            value={creativity}
            onValueChange={setCreativity}
            disabled={isLoading}
            className="py-4"
          />
          <p className="text-xs text-muted-foreground">Higher values make Claude more creative and experimental</p>
        </div>

        <Button
          type="submit"
          disabled={!isFormValid || isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 text-base"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating your portfolio...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Portfolio
            </>
          )}
        </Button>
      </form>
    </Card>
  )
}
