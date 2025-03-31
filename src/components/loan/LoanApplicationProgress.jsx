
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Check, CircleDot } from 'lucide-react';

export const LoanApplicationProgress = ({ 
  currentStep,
  onStepClick
}) => {
  const steps = [
    { id: 1, name: 'Personal Info' },
    { id: 2, name: 'Employment' },
    { id: 3, name: 'Documents' },
    { id: 4, name: 'Review' },
  ];

  const progressPercentage = Math.min(((currentStep) / steps.length) * 100, 75);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Loan Application Progress</h2>
        <span className="text-primary font-medium">{progressPercentage}% Complete</span>
      </div>

      <div className="space-y-8">
        <Progress value={progressPercentage} className="h-2" />

        <div className="flex justify-between">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="flex flex-col items-center gap-2"
              onClick={() => onStepClick && step.id <= currentStep && onStepClick(step.id)}
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center
                  ${step.id <= currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                  }
                  ${onStepClick && step.id <= currentStep ? 'cursor-pointer' : ''}
                `}
              >
                {step.id < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : step.id === currentStep ? (
                  <CircleDot className="h-5 w-5" />
                ) : (
                  <span className="h-5 w-5 flex items-center justify-center">{step.id}</span>
                )}
              </div>
              <span className="text-sm font-medium text-center">{step.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
