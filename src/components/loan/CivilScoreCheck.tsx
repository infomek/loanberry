
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { checkCivilScore } from '../../services/api';
import { Loader2, ShieldCheck, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Progress } from '@/components/ui/progress';

export const CivilScoreCheck: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [scoreResult, setScoreResult] = useState<{
    score: number;
    status: 'excellent' | 'good' | 'fair' | 'poor';
    message: string;
  } | null>(null);
  
  const handleCheck = async () => {
    if (!fullName || !email || !phone || !panNumber) {
      toast.error("Please fill all fields");
      return;
    }
    
    if (!validatePAN(panNumber)) {
      toast.error("Please enter a valid PAN number");
      return;
    }
    
    setIsChecking(true);
    try {
      const result = await checkCivilScore(
        user?.id || '1',
        fullName,
        email,
        phone,
        panNumber
      );
      
      setScoreResult(result);
      toast.success("Civil score checked successfully");
    } catch (error) {
      toast.error("Error checking civil score");
    } finally {
      setIsChecking(false);
    }
  };
  
  const validatePAN = (pan: string) => {
    // Simple validation - 10 character alphanumeric
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };
  
  const getScoreColor = (status: 'excellent' | 'good' | 'fair' | 'poor') => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-emerald-500';
      case 'fair': return 'bg-amber-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getScorePercentage = (score: number) => {
    // Convert score from 500-850 range to 0-100 percentage
    return ((score - 500) / (850 - 500)) * 100;
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto glass">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Check Your Civil Score</CardTitle>
        <CardDescription className="text-center">
          Your civil score affects your loan eligibility and interest rates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!scoreResult ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name (as per PAN)</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="input-focus"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="input-focus"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile number"
                required
                className="input-focus"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="panNumber">PAN Number</Label>
              <Input
                id="panNumber"
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                placeholder="ABCDE1234F"
                required
                className="input-focus"
              />
              <p className="text-xs text-muted-foreground">
                Your PAN number is used only for verification and is securely processed
              </p>
            </div>
            
            <Button
              onClick={handleCheck}
              className="w-full mt-4"
              disabled={isChecking}
            >
              {isChecking ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : (
                "Check Civil Score"
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              {scoreResult.status === 'excellent' || scoreResult.status === 'good' ? (
                <ShieldCheck className="mx-auto h-16 w-16 text-green-500" />
              ) : (
                <ShieldAlert className="mx-auto h-16 w-16 text-amber-500" />
              )}
              <h3 className="mt-4 text-2xl font-bold">{scoreResult.score}</h3>
              <p className="text-sm capitalize font-medium text-muted-foreground">
                {scoreResult.status} Credit Score
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Poor</span>
                <span>Fair</span>
                <span>Good</span>
                <span>Excellent</span>
              </div>
              <Progress value={getScorePercentage(scoreResult.score)} className={`h-2 ${getScoreColor(scoreResult.status)}`} />
              <p className="mt-2 text-center text-sm text-muted-foreground">
                {scoreResult.message}
              </p>
            </div>
            
            <div className="rounded-lg border p-4 bg-primary/5">
              <h4 className="font-medium mb-2">What affects your score?</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Payment history (35%)</li>
                <li>• Amounts owed (30%)</li>
                <li>• Length of credit history (15%)</li>
                <li>• New credit (10%)</li>
                <li>• Types of credit used (10%)</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {scoreResult && (
          <div className="w-full space-y-4">
            <Button 
              onClick={() => setScoreResult(null)} 
              variant="outline" 
              className="w-full">
              Check Again
            </Button>
            <Button 
              onClick={() => navigate('/loan-application')} 
              className="w-full">
              Continue to Loan Application
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
