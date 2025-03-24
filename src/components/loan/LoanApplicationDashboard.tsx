import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { LoanApplicationProgress } from './LoanApplicationProgress';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Card } from '@/components/ui/card';
import { Home, Car } from 'lucide-react';

export const LoanApplicationDashboard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(3);
  const [loanAmount, setLoanAmount] = useState(25000);
  const [loanTerm, setLoanTerm] = useState(24); // 24 months
  const [loanPurpose, setLoanPurpose] = useState('home_improvement');
  
  // Calculate loan details based on amount and term
  const interestRate = 5.9;
  const monthlyPayment = (loanAmount * (interestRate / 100 / 12) * 
    Math.pow(1 + (interestRate / 100 / 12), loanTerm)) / 
    (Math.pow(1 + (interestRate / 100 / 12), loanTerm) - 1);
  const totalRepayment = monthlyPayment * loanTerm;

  return (
    <div className="flex flex-col md:flex-row w-full gap-8">
      <div className="md:w-1/4 w-full">
        <Card className="p-4 shadow-sm">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-primary font-medium">
              <div className="p-2 bg-primary/10 rounded">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <line x1="3" x2="21" y1="9" y2="9" />
                  <path d="m9 16 2 2 4-4" />
                </svg>
              </div>
              <span>Dashboard</span>
            </div>
            
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M8 13h2" />
                  <path d="M8 17h2" />
                  <path d="M14 13h2" />
                  <path d="M14 17h2" />
                </svg>
              </div>
              <span>Applications</span>
            </div>
            
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <path d="M12 2v10l2.5-1.5L17 12V2" />
                </svg>
              </div>
              <span>Payments</span>
            </div>
            
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <span>Documents</span>
            </div>
            
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <span>Settings</span>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="md:w-3/4 w-full space-y-8">
        <Card className="p-6 shadow-sm">
          <LoanApplicationProgress currentStep={currentStep} />
        </Card>
          
        <Card className="p-6 shadow-sm space-y-6">
          <h2 className="text-2xl font-semibold">Loan Details</h2>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Loan Amount</span>
            </div>
            <div className="space-y-2">
              <Slider 
                value={[loanAmount]} 
                min={1000} 
                max={50000} 
                step={1000}
                onValueChange={(values) => setLoanAmount(values[0])}
                className="my-4"
              />
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">₹1,000</span>
                <span className="text-lg font-medium text-primary">₹{loanAmount.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">₹50,000</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <span className="text-muted-foreground">Loan Term</span>
            <div className="grid grid-cols-3 gap-4">
              <Button 
                variant={loanTerm === 12 ? "default" : "outline"}
                onClick={() => setLoanTerm(12)}
                className="w-full justify-center"
              >
                12 Months
              </Button>
              <Button 
                variant={loanTerm === 24 ? "default" : "outline"}
                onClick={() => setLoanTerm(24)}
                className="w-full justify-center"
              >
                24 Months
              </Button>
              <Button 
                variant={loanTerm === 36 ? "default" : "outline"}
                onClick={() => setLoanTerm(36)}
                className="w-full justify-center"
              >
                36 Months
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <span className="text-muted-foreground">Purpose of Loan</span>
            <div className="grid grid-cols-2 gap-4">
              <Card 
                className={`p-4 cursor-pointer border-2 ${loanPurpose === 'home_improvement' 
                  ? 'border-primary' 
                  : 'border-transparent hover:border-gray-200'
                }`}
                onClick={() => setLoanPurpose('home_improvement')}
              >
                <div className="flex items-center gap-3">
                  <Home className="h-5 w-5 text-primary" />
                  <span>Home Improvement</span>
                </div>
              </Card>
              <Card 
                className={`p-4 cursor-pointer border-2 ${loanPurpose === 'vehicle_purchase' 
                  ? 'border-primary' 
                  : 'border-transparent hover:border-gray-200'
                }`}
                onClick={() => setLoanPurpose('vehicle_purchase')}
              >
                <div className="flex items-center gap-3">
                  <Car className="h-5 w-5 text-primary" />
                  <span>Vehicle Purchase</span>
                </div>
              </Card>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-8 py-4">
            <div>
              <h3 className="text-sm text-muted-foreground">Monthly Payment</h3>
              <p className="text-2xl font-semibold">₹{monthlyPayment.toFixed(0)}</p>
            </div>
            <div>
              <h3 className="text-sm text-muted-foreground">Interest Rate</h3>
              <p className="text-2xl font-semibold">{interestRate}% APR</p>
            </div>
            <div>
              <h3 className="text-sm text-muted-foreground">Total Repayment</h3>
              <p className="text-2xl font-semibold">₹{totalRepayment.toFixed(0)}</p>
            </div>
          </div>
          
          <Button size="lg" className="w-full">Continue Application</Button>
        </Card>
      </div>
    </div>
  );
};
