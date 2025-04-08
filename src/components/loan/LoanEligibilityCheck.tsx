import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { checkEligibility } from '../../services/api';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

// Define the correct interface to match the API response
interface EligibilityResult {
  approved: boolean;  // Using approved instead of eligible to match API
  maxLoanAmount: number;
  reasons: string[];
  recommendedProducts: string[];
}

export const LoanEligibilityCheck: React.FC = () => {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [eligibilityResult, setEligibilityResult] = useState<EligibilityResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckEligibility = async () => {
    if (!income || !expenses) {
      toast.error('Please enter both income and expenses.');
      return;
    }

    const incomeValue = parseFloat(income);
    const expensesValue = parseFloat(expenses);

    if (isNaN(incomeValue) || isNaN(expensesValue)) {
      toast.error('Please enter valid numeric values for income and expenses.');
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await checkEligibility(incomeValue, expensesValue);
      // Use as to convert the result to match our component's expected format
      setEligibilityResult(result as unknown as EligibilityResult);
    } catch (error) {
      console.error("Error checking eligibility:", error);
      toast.error("Failed to check loan eligibility");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Check Your Loan Eligibility</CardTitle>
        <CardDescription>
          Enter your monthly income and expenses to see if you qualify for a loan.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="income">Monthly Income</Label>
          <Input
            type="number"
            id="income"
            placeholder="Enter your monthly income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="expenses">Monthly Expenses</Label>
          <Input
            type="number"
            id="expenses"
            placeholder="Enter your monthly expenses"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
          />
        </div>
        <Button onClick={handleCheckEligibility} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            "Check Eligibility"
          )}
        </Button>

        {eligibilityResult && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Eligibility Result</h3>
            {eligibilityResult.approved ? (
              <>
                <p className="text-green-500">Congratulations! You are eligible for a loan.</p>
                <p>Maximum Loan Amount: ₹{eligibilityResult.maxLoanAmount.toLocaleString()}</p>
                <p>Recommended Products: {eligibilityResult.recommendedProducts.join(', ')}</p>
              </>
            ) : (
              <>
                <p className="text-red-500">Sorry, you are not currently eligible for a loan.</p>
                <p>Reasons:</p>
                <ul>
                  {eligibilityResult.reasons.map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
                <p>Recommended Products: {eligibilityResult.recommendedProducts.join(', ')}</p>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
