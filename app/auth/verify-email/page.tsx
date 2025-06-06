"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Loader2, MailCheck, MailX } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { verifyEmail, resendVerificationEmail } from "@/lib/auth/actions"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const email = searchParams.get("email")

  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [status, setStatus] = useState<"idle" | "verifying" | "success" | "error">("idle")
  const [error, setError] = useState("")
  const [resendSuccess, setResendSuccess] = useState(false)

  // If a token is provided, verify the email automatically
  useEffect(() => {
    if (token) {
      verifyEmailWithToken(token)
    }
  }, [token])

  const verifyEmailWithToken = async (token: string) => {
    setIsLoading(true)
    setStatus("verifying")

    try {
      // In a real app, this would call your API to verify the email
      await verifyEmail(token)

      setStatus("success")

      // Redirect to sign in page after a delay
      setTimeout(() => {
        router.push("/auth/sign-in")
      }, 3000)
    } catch (error) {
      console.error("Email verification error:", error)
      setStatus("error")
      setError("The verification link is invalid or has expired.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendVerification = async () => {
    if (!email) {
      setError("Email address is missing")
      return
    }

    setIsResending(true)
    setResendSuccess(false)
    setError("")

    try {
      // In a real app, this would call your API to resend the verification email
      await resendVerificationEmail(email)

      setResendSuccess(true)
    } catch (error) {
      console.error("Resend verification error:", error)
      setError("Failed to resend verification email. Please try again.")
    } finally {
      setIsResending(false)
    }
  }

  // If a token is provided, show verification status
  if (token) {
    return (
      <div className="container max-w-md mx-auto px-4 py-12">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Email Verification</CardTitle>
            <CardDescription>
              {status === "verifying" && "Verifying your email address..."}
              {status === "success" && "Your email has been verified successfully!"}
              {status === "error" && "Email verification failed"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-4 text-center">
            {status === "verifying" && <Loader2 className="h-8 w-8 animate-spin text-primary" />}

            {status === "success" && (
              <>
                <div className="mb-4 rounded-full bg-green-100 p-3">
                  <MailCheck className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-medium">Email verified successfully</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your email has been verified. You will be redirected to the sign in page.
                </p>
              </>
            )}

            {status === "error" && (
              <>
                <div className="mb-4 rounded-full bg-destructive/10 p-3">
                  <MailX className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="font-medium">Verification failed</h3>
                <p className="mt-2 text-sm text-muted-foreground">{error}</p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link href="/auth/sign-up">Back to Sign Up</Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  // If no token is provided, show instructions to check email
  return (
    <div className="container max-w-md mx-auto px-4 py-12">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Verify your email</CardTitle>
          <CardDescription>We've sent a verification link to your email address</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-4 text-center">
          <div className="mb-4 rounded-full bg-primary/10 p-3">
            <MailCheck className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium">Check your email</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We've sent a verification link to <span className="font-medium">{email || "your email address"}</span>.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Click the link in the email to verify your account. If you don't see the email, check your spam folder.
          </p>

          {error && (
            <div className="mt-4 bg-destructive/10 text-destructive text-sm p-3 rounded-md w-full">{error}</div>
          )}

          {resendSuccess && (
            <div className="mt-4 bg-green-100 text-green-800 text-sm p-3 rounded-md w-full">
              Verification email has been resent successfully.
            </div>
          )}

          <div className="mt-6 space-y-2 w-full">
            <Button variant="outline" className="w-full" onClick={handleResendVerification} disabled={isResending}>
              {isResending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resending...
                </>
              ) : (
                "Resend verification email"
              )}
            </Button>

            <Button variant="link" className="w-full" asChild>
              <Link href="/auth/sign-in">Back to sign in</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

