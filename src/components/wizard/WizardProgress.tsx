import { cn } from "@/lib/utils";

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export function WizardProgress({ currentStep, totalSteps, stepTitles }: WizardProgressProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        {stepTitles.map((title, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col items-center flex-1",
              index < stepTitles.length - 1 && "relative"
            )}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                index + 1 < currentStep && "bg-primary text-primary-foreground",
                index + 1 === currentStep && "bg-primary text-primary-foreground ring-4 ring-primary/30",
                index + 1 > currentStep && "bg-muted text-muted-foreground"
              )}
            >
              {index + 1}
            </div>
            <span
              className={cn(
                "text-xs mt-2 text-center hidden md:block max-w-[100px]",
                index + 1 === currentStep ? "text-foreground font-medium" : "text-muted-foreground"
              )}
            >
              {title}
            </span>
            {index < stepTitles.length - 1 && (
              <div
                className={cn(
                  "absolute top-5 left-[60%] w-[80%] h-0.5 -translate-y-1/2",
                  index + 1 < currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
