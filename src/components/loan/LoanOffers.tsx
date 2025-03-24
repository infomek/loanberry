
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { getLoanOffers, acceptLoanOffer } from '../../services/api';
import { Loader2 } from 'lucide-react';

interface LoanOffer {
  id: string;
  amount: number;
  term: number;
  interestRate: number;
  monthlyPayment: number;
  totalPayment: number;
}

export const LoanOffers: React.FC = () => {
  const [offers, setOffers] = useState<LoanOffer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAccepting, setIsAccepting] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const applicationId = location.state?.applicationId;

  useEffect(() => {
    if (!applicationId) {
      navigate('/loan-application');
      return;
    }

    const fetchOffers = async () => {
      setIsLoading(true);
      try {
        const offerData = await getLoanOffers(applicationId);
        setOffers(offerData);
      } catch (error) {
        toast.error("Error fetching loan offers");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, [applicationId, navigate]);

  const handleAcceptOffer = async (offerId: string) => {
    setSelectedOfferId(offerId);
    setIsAccepting(true);
    
    try {
      const result = await acceptLoanOffer(offerId);
      
      if (result.success) {
        toast.success("Loan offer accepted successfully");
        navigate('/dashboard');
      } else {
        toast.error("Error accepting loan offer");
      }
    } catch (error) {
      toast.error("Error accepting loan offer");
    } finally {
      setIsAccepting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Your Personalized Loan Offers</h2>
        <p className="text-muted-foreground">
          We've found {offers.length} loan offers based on your application. Select the one that best fits your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <Card key={offer.id} className={`glass overflow-hidden transition-all card-hover ${
            selectedOfferId === offer.id ? 'border-primary ring-2 ring-primary/20' : ''
          }`}>
            <CardHeader className="bg-primary/5 pb-2">
              <CardTitle className="text-xl text-center">${offer.amount.toLocaleString()}</CardTitle>
              <CardDescription className="text-center">
                {offer.term} month term
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Interest Rate</span>
                <span className="font-medium">{offer.interestRate}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Monthly Payment</span>
                <span className="font-medium">${offer.monthlyPayment.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Repayment</span>
                <span className="font-medium">${offer.totalPayment.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Interest</span>
                <span className="font-medium">${(offer.totalPayment - offer.amount).toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleAcceptOffer(offer.id)} 
                className="w-full"
                disabled={isAccepting}
              >
                {isAccepting && selectedOfferId === offer.id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : "Accept Offer"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" onClick={() => navigate('/loan-application')} className="mx-auto">
          Return to Application
        </Button>
      </div>
    </div>
  );
};
