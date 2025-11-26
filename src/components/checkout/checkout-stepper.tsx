
"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface CheckoutStepperProps {
  steps: { id: string; name: string }[];
  currentStep: string;
}

export default function CheckoutStepper({ steps, currentStep }: CheckoutStepperProps) {
  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={cn("relative", stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20 flex-1" : "")}>
            {stepIdx < currentStepIndex ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-primary" />
                </div>
                <div
                  className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
                >
                  <Check className="h-5 w-5" aria-hidden="true" />
                </div>
              </>
            ) : stepIdx === currentStepIndex ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-border" />
                </div>
                <div
                  className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background"
                  aria-current="step"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-border" />
                </div>
                <div
                  className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-border bg-background"
                >
                   <span className="h-2.5 w-2.5 rounded-full bg-transparent" aria-hidden="true" />
                </div>
              </>
            )}
             <p className="absolute mt-2 w-max max-w-[60px] sm:max-w-none text-center text-xs sm:text-sm font-medium text-muted-foreground -left-1/2 translate-x-1/4 sm:left-1/2 sm:-translate-x-1/2">{step.name}</p>
          </li>
        ))}
      </ol>
    </nav>
  );
}
