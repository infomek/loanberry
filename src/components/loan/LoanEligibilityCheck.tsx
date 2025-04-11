
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import { checkEligibility } from '../../services/api';
import { toast } from 'sonner';

// Define the correct interface to match the API response
interface EligibilityResult {
  approved?: boolean;  
  eligible?: boolean;
  maxLoanAmount?: number;
  reasons?: string[];
  recommendedProducts?: string[];
  reason?: string;
  maxAmount?: number;
}

interface LoanEligibilityCheckProps {
  amount: number;
  term: number;
  income: string;
  onEligibilityConfirmed: () => void;
  setAmount?: (amount: number) => void;
  setTerm?: (term: number) => void;
  setIncome?: (income: string) => void;
}

export const LoanEligibilityCheck: React.FC<LoanEligibilityCheckProps> = ({
  amount,
  term,
  income,
  onEligibilityConfirmed,
  setAmount = () => {},
  setTerm = () => {},
  setIncome = () => {},
}) => {
  const [isChecking, setIsChecking] = useState(false);
  const [eligibilityResult, setEligibilityResult] = useState<EligibilityResult | null>(null);

  const handleEligibilityCheck = async () => {
    if (!income) {
      toast.error("Please enter your income");
      return;
    }

    setIsChecking(true);
    try {
      const result = await checkEligibility(amount, term, parseFloat(income));
      setEligibilityResult(result);
      
      if (result.eligible) {
        onEligibilityConfirmed();
      }
    } catch (error) {
      toast.error("Error checking eligibility");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Loan Amount</Label>
          <span className="text-sm font-medium">₹{amount.toLocaleString()}</span>
        </div>
        <Slider
          value={[amount]}
          min={1000}
          max={50000}
          step={1000}
          onValueChange={(values) => setAmount(values[0])}
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Loan Term</Label>
          <span className="text-sm font-medium">{term} months</span>
        </div>
        <Slider
          value={[term]}
          min={12}
          max={60}
          step={12}
          onValueChange={(values) => setTerm(values[0])}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="income">Annual Income</Label>
        <Input
          id="income"
          type="number"
          placeholder="e.g. 600000"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          required
          className="input-focus"
        />
      </div>
      
      {eligibilityResult && (
        <Alert className={`${
          (eligibilityResult.eligible || eligibilityResult.approved)
            ? "bg-green-50 border-green-200" 
            : "bg-amber-50 border-amber-200"
        }`}>
          {(eligibilityResult.eligible || eligibilityResult.approved) ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          )}
          <AlertTitle>
            {(eligibilityResult.eligible || eligibilityResult.approved)
              ? "You're eligible!" 
              : "Unable to offer full amount"}
          </AlertTitle>
          <AlertDescription>
            {(eligibilityResult.eligible || eligibilityResult.approved)
              ? "Good news! You're eligible for this loan. Please continue with your application."
              : (eligibilityResult.reason || eligibilityResult.reasons?.[0]) + 
                ((eligibilityResult.maxAmount || eligibilityResult.maxLoanAmount)
                ? ` We can offer up to ₹${(eligibilityResult.maxAmount || eligibilityResult.maxLoanAmount).toFixed(0)}.`
                : "")}
          </AlertDescription>
        </Alert>
      )}
      
      <Button 
        onClick={handleEligibilityCheck} 
        className="w-full"
        disabled={isChecking}>
        {isChecking ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Checking...
          </>
        ) : (
          "Check Eligibility"
        )}
      </Button>
    </div>
  );
};
