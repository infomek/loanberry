
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Loader2, Check, Star, ArrowRight } from 'lucide-react';
import { getLoanOffers, acceptLoanOffer } from '../../services/api';
import { toast } from 'sonner';

interface LoanOffer {
  id: string;
  name: string;
  rate: string;
  term: number;
  amount: number;
  monthlyPayment: string | number;
  totalPayment?: number;
  featured: boolean;
}

interface LoanOffersProps {
  applicationId?: string;
  amount?: number;
  term?: number;
  onOfferAccepted?: (offerId?: string, response?: any) => void;
}

export const LoanOffers: React.FC<LoanOffersProps> = ({ 
  applicationId,
  amount,
  term, 
  onOfferAccepted 
}) => {
  const [offers, setOffers] = useState<LoanOffer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [acceptingId, setAcceptingId] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setIsLoading(true);
        // Use applicationId if provided, otherwise generate mock offers based on amount and term
        let fetchedOffers;
        if (applicationId) {
          fetchedOffers = await getLoanOffers(applicationId);
        } else if (amount && term) {
          // Generate mock offers based on amount and term
          fetchedOffers = generateMockOffers(amount, term);
        } else {
          fetchedOffers = [];
        }
        setOffers(fetchedOffers);
      } catch (error) {
        console.error("Error fetching loan offers:", error);
        toast.error("Failed to fetch loan offers");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOffers();
  }, [applicationId, amount, term]);
  
  // Helper function to generate mock offers if no applicationId provided
  const generateMockOffers = (loanAmount: number, loanTerm: number) => {
    const baseRate = 8 + Math.random() * 4;
    return [
      {
        id: 'offer-1',
        name: 'Standard Loan',
        rate: baseRate.toFixed(2),
        term: loanTerm,
        amount: loanAmount,
        monthlyPayment: calculateMonthlyPayment(loanAmount, baseRate, loanTerm).toFixed(2),
        featured: false
      },
      {
        id: 'offer-2',
        name: 'Premium Loan',
        rate: (baseRate - 1).toFixed(2),
        term: loanTerm,
        amount: loanAmount,
        monthlyPayment: calculateMonthlyPayment(loanAmount, baseRate - 1, loanTerm).toFixed(2),
        featured: true
      },
      {
        id: 'offer-3',
        name: 'Basic Loan',
        rate: (baseRate + 1).toFixed(2),
        term: loanTerm,
        amount: loanAmount,
        monthlyPayment: calculateMonthlyPayment(loanAmount, baseRate + 1, loanTerm).toFixed(2),
        featured: false
      }
    ];
  };
  
  const calculateMonthlyPayment = (principal: number, rate: number, term: number) => {
    const monthlyRate = rate / 100 / 12;
    return principal * monthlyRate * Math.pow(1 + monthlyRate, term) / (Math.pow(1 + monthlyRate, term) - 1);
  };
  
  const handleAcceptOffer = async (offerId: string) => {
    try {
      setAcceptingId(offerId);
      const response = await acceptLoanOffer(offerId);
      
      toast.success(response.message || "Offer accepted successfully");
      
      if (onOfferAccepted) {
        onOfferAccepted(offerId, response);
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Error accepting offer:", error);
      toast.error("Failed to accept loan offer");
    } finally {
      setAcceptingId(null);
    }
  };
  
  const formatCurrency = (value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(numValue);
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <p>Loading loan offers...</p>
      </div>
    );
  }
  
  if (!offers || offers.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Offers Available</CardTitle>
          <CardDescription>We couldn't find any loan offers matching your application.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Try adjusting your loan amount or term and apply again.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offers.map(offer => {
          const monthlyPaymentNumber = typeof offer.monthlyPayment === 'string' ? 
            parseFloat(offer.monthlyPayment) : offer.monthlyPayment;
          
          return (
            <Card key={offer.id} className={`relative overflow-hidden ${offer.featured ? 'border-2 border-primary shadow-lg' : ''}`}>
              {offer.featured && (
                <div className="absolute top-0 right-0">
                  <div className="bg-primary text-primary-foreground px-3 py-1 rounded-bl-lg flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    <span className="text-xs font-medium">Best Value</span>
                  </div>
                </div>
              )}
              
              <CardHeader>
                <CardTitle>{offer.name}</CardTitle>
                <CardDescription>
                  {formatCurrency(offer.amount)} over {offer.term} months
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-2 py-2">
                  <span className="text-3xl font-bold">{offer.rate}%</span>
                  <span className="text-sm text-muted-foreground">Interest Rate</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Monthly Payment</span>
                    <span className="font-semibold">
                      {typeof monthlyPaymentNumber === 'number' ? 
                        formatCurrency(monthlyPaymentNumber) : 
                        monthlyPaymentNumber}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Payment</span>
                    <span className="font-semibold">
                      {formatCurrency(offer.totalPayment || (monthlyPaymentNumber * offer.term))}
                    </span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => handleAcceptOffer(offer.id)}
                  disabled={!!acceptingId}
                >
                  {acceptingId === offer.id ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : offer.featured ? (
                    <>
                      <Check className="mr-2 h-4 w-4" /> 
                      Accept Offer
                    </>
                  ) : (
                    <>
                      Select Offer 
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
