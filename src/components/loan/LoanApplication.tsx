import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { checkEligibility, submitLoanApplication } from '../../services/api';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export const LoanApplicationForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(10000);
  const [term, setTerm] = useState(36);
  const [purpose, setPurpose] = useState('');
  const [income, setIncome] = useState('');
  const [employment, setEmployment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eligibilityResult, setEligibilityResult] = useState<{ eligible: boolean; maxAmount?: number; reason?: string } | null>(null);
  const navigate = useNavigate();

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
        setStep(2);
      }
    } catch (error) {
      toast.error("Error checking eligibility");
    } finally {
      setIsChecking(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !purpose || !employment) {
      toast.error("Please fill out all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const application = {
        amount,
        term,
        purpose,
        income: parseFloat(income),
        employment,
        name,
        email
      };
      
      const result = await submitLoanApplication(application);
      
      if (result.success) {
        toast.success("Application submitted successfully");
        navigate('/loan-offers', { state: { applicationId: result.applicationId } });
      } else {
        toast.error("Error submitting application");
      }
    } catch (error) {
      toast.error("Error submitting application");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto glass">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Loan Application</CardTitle>
        <CardDescription className="text-center">
          {step === 1 ? "Let's check your eligibility first" : "Complete your application"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 ? (
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
                eligibilityResult.eligible 
                  ? "bg-green-50 border-green-200" 
                  : "bg-amber-50 border-amber-200"
              }`}>
                {eligibilityResult.eligible ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                )}
                <AlertTitle>
                  {eligibilityResult.eligible 
                    ? "You're eligible!" 
                    : "Unable to offer full amount"}
                </AlertTitle>
                <AlertDescription>
                  {eligibilityResult.eligible 
                    ? "Good news! You're eligible for this loan. Please continue with your application."
                    : eligibilityResult.reason + (eligibilityResult.maxAmount 
                      ? ` We can offer up to ₹${eligibilityResult.maxAmount.toFixed(0)}.`
                      : "")}
                </AlertDescription>
              </Alert>
            )}
            
            <Button 
              onClick={handleEligibilityCheck} 
              className="w-full"
              disabled={isChecking}>
              {isChecking ? "Checking..." : "Check Eligibility"}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="purpose">Loan Purpose</Label>
              <Select value={purpose} onValueChange={setPurpose} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home_improvement">Home Improvement</SelectItem>
                  <SelectItem value="debt_consolidation">Debt Consolidation</SelectItem>
                  <SelectItem value="major_purchase">Major Purchase</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="medical">Medical Expenses</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="employment">Employment Status</Label>
              <Select value={employment} onValueChange={setEmployment} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full_time">Full-time employed</SelectItem>
                  <SelectItem value="part_time">Part-time employed</SelectItem>
                  <SelectItem value="self_employed">Self-employed</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="input-focus"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-focus"
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        )}
      </CardContent>
      {step === 2 && (
        <CardFooter>
          <Button 
            variant="outline" 
            onClick={() => setStep(1)} 
            className="w-full">
            Back to Eligibility
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
