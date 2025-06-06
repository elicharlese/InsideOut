// This file contains mock authentication actions
// In a real app, these would interact with your authentication API

/**
 * Sign up a new user
 */
export async function signUp(data: any): Promise<void> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Sign up data:", data)
      resolve()
    }, 1000)
  })
}

/**
 * Sign in a user
 */
export async function signIn(data: any): Promise<void> {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Sign in data:", data)

      // For demo purposes, reject if using test@example.com with wrong password
      if (data.email === "test@example.com" && data.password !== "password") {
        reject(new Error("Invalid credentials"))
        return
      }

      resolve()
    }, 1000)
  })
}

/**
 * Request a password reset
 */
export async function requestPasswordReset(email: string): Promise<void> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Password reset requested for:", email)
      resolve()
    }, 1000)
  })
}

/**
 * Reset a password with a token
 */
export async function resetPassword(token: string, password: string): Promise<void> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Password reset with token:", token, "New password:", password)
      resolve()
    }, 1000)
  })
}

/**
 * Verify an email with a token
 */
export async function verifyEmail(token: string): Promise<void> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Email verified with token:", token)
      resolve()
    }, 1000)
  })
}

/**
 * Resend a verification email
 */
export async function resendVerificationEmail(email: string): Promise<void> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Verification email resent to:", email)
      resolve()
    }, 1000)
  })
}

/**
 * Sign out a user
 */
export async function signOut(): Promise<void> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("User signed out")
      resolve()
    }, 500)
  })
}

