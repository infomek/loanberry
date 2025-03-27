
import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { calculateLoan } from '../../services/api';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export const LoanCalculator: React.FC = () => {
  const [amount, setAmount] = useState(10000);
  const [term, setTerm] = useState(36);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    const fetchCalculation = async () => {
      setIsCalculating(true);
      try {
        const result = await calculateLoan(amount, term);
        setMonthlyPayment(result.monthlyPayment);
        setTotalPayment(result.totalPayment);
        setInterestRate(result.interestRate);
        setTotalInterest(result.totalInterest);
      } catch (error) {
        console.error("Error calculating loan:", error);
      } finally {
        setIsCalculating(false);
      }
    };

    const delayCalculation = setTimeout(() => {
      fetchCalculation();
    }, 500);

    return () => clearTimeout(delayCalculation);
  }, [amount, term]);

  return (
    <Card className="glass w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Loan Calculator</CardTitle>
        <CardDescription>
          Adjust the sliders to calculate your potential loan payment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Loan Amount</span>
            <span className="text-sm font-medium">₹{amount.toLocaleString()}</span>
          </div>
          <Slider
            value={[amount]}
            min={1000}
            max={50000}
            step={1000}
            onValueChange={(values) => setAmount(values[0])}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹1,000</span>
            <span>₹50,000</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Loan Term</span>
            <span className="text-sm font-medium">{term} months</span>
          </div>
          <Slider
            value={[term]}
            min={12}
            max={60}
            step={12}
            onValueChange={(values) => setTerm(values[0])}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>12 months</span>
            <span>60 months</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-primary/5 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">Monthly Payment</div>
            <div className="text-2xl font-bold">
              {isCalculating ? 'Calculating...' : `₹${monthlyPayment.toFixed(2)}`}
            </div>
          </div>
          <div className="bg-primary/5 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">Interest Rate</div>
            <div className="text-2xl font-bold">
              {isCalculating ? 'Calculating...' : `${interestRate.toFixed(2)}%`}
            </div>
          </div>
          <div className="bg-primary/5 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">Total Interest</div>
            <div className="text-2xl font-bold">
              {isCalculating ? 'Calculating...' : `₹${totalInterest.toFixed(2)}`}
            </div>
          </div>
          <div className="bg-primary/5 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">Total Payment</div>
            <div className="text-2xl font-bold">
              {isCalculating ? 'Calculating...' : `₹${totalPayment.toFixed(2)}`}
            </div>
          </div>
        </div>

        <Button className="w-full mt-6" asChild>
          <Link to="/loan-application">Apply For This Loan</Link>
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-6">
        <Link to="/civil-score-check" className="text-sm flex items-center gap-1 text-primary hover:underline">
          <Shield className="h-4 w-4" />
          Check your civil score to get better interest rates
        </Link>
      </CardFooter>
    </Card>
  );
};
