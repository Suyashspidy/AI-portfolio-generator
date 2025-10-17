"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, ExternalLink, CheckCircle2 } from "lucide-react"

interface DeployDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  portfolioData: any
  userAnswers: any
}

export function DeployDialog({ open, onOpenChange, portfolioData, userAnswers }: DeployDialogProps) {
  const [projectName, setProjectName] = useState("")
  const [isDeploying, setIsDeploying] = useState(false)
  const [deployUrl, setDeployUrl] = useState("")
  const [error, setError] = useState("")

  const handleDeploy = async () => {
    if (!projectName.trim()) {
      setError("Please enter a project name")
      return
    }

    setIsDeploying(true)
    setError("")

    try {
      const response = await fetch("/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName: projectName.trim(),
          portfolioData,
          userAnswers,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setDeployUrl(data.url)
      } else {
        setError(data.error || "Failed to deploy. Please try again.")
      }
    } catch (err) {
      setError("An error occurred during deployment.")
    } finally {
      setIsDeploying(false)
    }
  }

  const handleClose = () => {
    setProjectName("")
    setDeployUrl("")
    setError("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Deploy Your Portfolio</DialogTitle>
          <DialogDescription>
            {deployUrl
              ? "Your portfolio has been deployed successfully!"
              : "Choose a name for your portfolio project and deploy it to Vercel."}
          </DialogDescription>
        </DialogHeader>

        {!deployUrl ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                placeholder="my-awesome-portfolio"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                disabled={isDeploying}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>

            <Button onClick={handleDeploy} disabled={isDeploying} className="w-full">
              {isDeploying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deploying...
                </>
              ) : (
                "Deploy to Vercel"
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center py-6">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <div className="space-y-2 text-center">
              <p className="text-sm text-muted-foreground">Your portfolio is live at:</p>
              <a
                href={deployUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-primary hover:underline"
              >
                {deployUrl}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
