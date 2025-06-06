"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function SignupPage() {
  const [step, setStep] = useState(1)

  return (
    <div className="container max-w-md mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>Join the InsideOut community</CardDescription>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="Enter your first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Enter your last name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Create a password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" placeholder="Confirm your password" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>How do you identify?</Label>
                <RadioGroup defaultValue="option-one">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label htmlFor="option-one">Lesbian</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label htmlFor="option-two">Gay</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-three" id="option-three" />
                    <Label htmlFor="option-three">Bisexual</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-four" id="option-four" />
                    <Label htmlFor="option-four">Transgender</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-five" id="option-five" />
                    <Label htmlFor="option-five">Queer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-six" id="option-six" />
                    <Label htmlFor="option-six">Asexual</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-seven" id="option-seven" />
                    <Label htmlFor="option-seven">Ally</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-eight" id="option-eight" />
                    <Label htmlFor="option-eight">Other</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-nine" id="option-nine" />
                    <Label htmlFor="option-nine">Prefer not to say</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pronouns">Pronouns</Label>
                <Input id="pronouns" placeholder="e.g. she/her, they/them" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>What brings you to InsideOut? (Select all that apply)</Label>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="interest-1" className="h-4 w-4 rounded border-gray-300" />
                    <Label htmlFor="interest-1">Shopping for products</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="interest-2" className="h-4 w-4 rounded border-gray-300" />
                    <Label htmlFor="interest-2">Finding healthcare providers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="interest-3" className="h-4 w-4 rounded border-gray-300" />
                    <Label htmlFor="interest-3">Therapy and counseling</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="interest-4" className="h-4 w-4 rounded border-gray-300" />
                    <Label htmlFor="interest-4">Housing and relocation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="interest-5" className="h-4 w-4 rounded border-gray-300" />
                    <Label htmlFor="interest-5">Legal support</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="interest-6" className="h-4 w-4 rounded border-gray-300" />
                    <Label htmlFor="interest-6">Research and education</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="interest-7" className="h-4 w-4 rounded border-gray-300" />
                    <Label htmlFor="interest-7">Community and support</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="referral">How did you hear about us?</Label>
                <Input id="referral" placeholder="Friend, social media, etc." />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {step < 3 ? (
            <Button className="w-full" onClick={() => setStep(step + 1)}>
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button className="w-full">Create Account</Button>
          )}

          {step > 1 && (
            <Button variant="outline" className="w-full" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          )}

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

function StepIndicator({ step, currentStep, label }) {
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

function StepDivider({ active }) {
  return <div className={`h-[2px] w-12 ${active ? "bg-primary" : "bg-muted-foreground"}`} />
}

