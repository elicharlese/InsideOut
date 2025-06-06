"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check, EyeIcon, EyeOffIcon, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { signUp } from "@/lib/auth/actions"

export default function SignUpPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    identity: "",
    pronouns: "",
    interests: [] as string[],
    referral: "",
    acceptTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))

    // Clear error when user checks
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleIdentityChange = (value: string) => {
    setFormData((prev) => ({ ...prev, identity: value }))
  }

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => {
      const interests = [...prev.interests]
      if (interests.includes(interest)) {
        return { ...prev, interests: interests.filter((i) => i !== interest) }
      } else {
        return { ...prev, interests: [...interests, interest] }
      }
    })
  }

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    // Step 2 validation is optional
    return true
  }

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
      window.scrollTo(0, 0)
    } else if (step === 2 && validateStep2()) {
      setStep(3)
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep3()) {
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would call your authentication API
      await signUp(formData)

      // Redirect to verification page
      router.push("/auth/verify-email?email=" + encodeURIComponent(formData.email))
    } catch (error) {
      console.error("Sign up error:", error)
      setErrors({
        form: "An error occurred during sign up. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setIsLoading(true)

    try {
      // In a real app, this would redirect to Google OAuth
      // window.location.href = "/api/auth/google"
      console.log("Redirecting to Google OAuth...")

      // Simulate redirect delay
      setTimeout(() => {
        router.push("/profile")
      }, 1500)
    } catch (error) {
      console.error("Google sign up error:", error)
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-12">
      <Card className="card-soft w-full max-w-md border-none shadow-soft">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl text-center">Create an account</CardTitle>
          <CardDescription className="text-center text-base">
            Join our community and start your journey with us
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <StepIndicator step={1} currentStep={step} label="Account" />
              <StepDivider active={step >= 2} />
              <StepIndicator step={2} currentStep={step} label="Profile" />
              <StepDivider active={step >= 3} />
              <StepIndicator step={3} currentStep={step} label="Interests" />
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full"
                type="button"
                onClick={handleGoogleSignUp}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Image src="/google-logo.svg" alt="Google" width={20} height={20} className="mr-2" />
                )}
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={errors.firstName ? "border-destructive" : ""}
                  />
                  {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={errors.lastName ? "border-destructive" : ""}
                  />
                  {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={errors.password ? "border-destructive pr-10" : "pr-10"}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
                {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>How do you identify?</Label>
                <RadioGroup value={formData.identity} onValueChange={handleIdentityChange}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lesbian" id="identity-lesbian" />
                    <Label htmlFor="identity-lesbian">Lesbian</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gay" id="identity-gay" />
                    <Label htmlFor="identity-gay">Gay</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bisexual" id="identity-bisexual" />
                    <Label htmlFor="identity-bisexual">Bisexual</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="transgender" id="identity-transgender" />
                    <Label htmlFor="identity-transgender">Transgender</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="queer" id="identity-queer" />
                    <Label htmlFor="identity-queer">Queer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="asexual" id="identity-asexual" />
                    <Label htmlFor="identity-asexual">Asexual</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ally" id="identity-ally" />
                    <Label htmlFor="identity-ally">Ally</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="identity-other" />
                    <Label htmlFor="identity-other">Other</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="prefer-not-to-say" id="identity-prefer-not-to-say" />
                    <Label htmlFor="identity-prefer-not-to-say">Prefer not to say</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pronouns">Pronouns</Label>
                <Input
                  id="pronouns"
                  name="pronouns"
                  placeholder="e.g. she/her, they/them"
                  value={formData.pronouns}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>What brings you to InsideOut? (Select all that apply)</Label>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="interest-products"
                      checked={formData.interests.includes("products")}
                      onCheckedChange={() => handleInterestToggle("products")}
                    />
                    <Label htmlFor="interest-products">Shopping for products</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="interest-healthcare"
                      checked={formData.interests.includes("healthcare")}
                      onCheckedChange={() => handleInterestToggle("healthcare")}
                    />
                    <Label htmlFor="interest-healthcare">Finding healthcare providers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="interest-therapy"
                      checked={formData.interests.includes("therapy")}
                      onCheckedChange={() => handleInterestToggle("therapy")}
                    />
                    <Label htmlFor="interest-therapy">Therapy and counseling</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="interest-housing"
                      checked={formData.interests.includes("housing")}
                      onCheckedChange={() => handleInterestToggle("housing")}
                    />
                    <Label htmlFor="interest-housing">Housing and relocation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="interest-legal"
                      checked={formData.interests.includes("legal")}
                      onCheckedChange={() => handleInterestToggle("legal")}
                    />
                    <Label htmlFor="interest-legal">Legal support</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="interest-research"
                      checked={formData.interests.includes("research")}
                      onCheckedChange={() => handleInterestToggle("research")}
                    />
                    <Label htmlFor="interest-research">Research and education</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="interest-community"
                      checked={formData.interests.includes("community")}
                      onCheckedChange={() => handleInterestToggle("community")}
                    />
                    <Label htmlFor="interest-community">Community and support</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="referral">How did you hear about us?</Label>
                <Input
                  id="referral"
                  name="referral"
                  placeholder="Friend, social media, etc."
                  value={formData.referral}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => handleCheckboxChange("acceptTerms", checked as boolean)}
                  />
                  <Label htmlFor="acceptTerms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                {errors.acceptTerms && <p className="text-xs text-destructive">{errors.acceptTerms}</p>}
              </div>

              {errors.form && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">{errors.form}</div>
              )}
            </form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {step < 3 ? (
            <Button className="w-full" onClick={handleContinue} disabled={isLoading}>
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button className="w-full" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          )}

          {step > 1 && (
            <Button variant="outline" className="w-full" onClick={handleBack} disabled={isLoading}>
              Back
            </Button>
          )}

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/sign-in" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

interface StepIndicatorProps {
  step: number
  currentStep: number
  label: string
}

function StepIndicator({ step, currentStep, label }: StepIndicatorProps) {
  const isActive = currentStep >= step
  const isComplete = currentStep > step

  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
          isActive
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted-foreground text-muted-foreground"
        }`}
      >
        {isComplete ? <Check className="h-4 w-4" /> : step}
      </div>
      <span className={`mt-1 text-xs ${isActive ? "text-primary" : "text-muted-foreground"}`}>{label}</span>
    </div>
  )
}

function StepDivider({ active }: { active: boolean }) {
  return <div className={`h-[2px] w-12 ${active ? "bg-primary" : "bg-muted-foreground"}`} />
}

