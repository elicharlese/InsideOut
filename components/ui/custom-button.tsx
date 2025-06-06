import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-sand-600 text-white hover:bg-sand-700",
        clay: "bg-clay-600 text-white hover:bg-clay-700",
        olive: "bg-olive-600 text-white hover:bg-olive-700",
        outline: "border border-sand-300 bg-transparent hover:bg-sand-100 hover:text-sand-900",
        ghost: "hover:bg-sand-100 hover:text-sand-900",
        link: "text-sand-700 underline-offset-4 hover:underline hover:text-sand-900",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return <Button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
CustomButton.displayName = "CustomButton"

export { CustomButton, buttonVariants }

