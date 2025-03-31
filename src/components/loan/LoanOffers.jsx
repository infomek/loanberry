
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { getLoanOffers, acceptLoanOffer } from '../../services/api';
import { Loader2 } from 'lucide-react';

export const LoanOffers = () => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAccepting, setIsAccepting] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState(null);
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

  const handleAcceptOffer = async (offerId) => {
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
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading offers...</span>
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-lg font-medium">No offers available</h3>
            <p className="text-muted-foreground mt-2">
              We couldn't find any loan offers that match your criteria at this time.
            </p>
            <Button 
              onClick={() => navigate('/loan-application')} 
              className="mt-4">
              Apply Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {offers.map((offer) => (
        <Card key={offer.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>₹{offer.amount.toLocaleString()}</CardTitle>
            <CardDescription>
              {offer.term} months at {offer.interestRate}% APR
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Monthly payment</span>
                <span className="font-medium">₹{offer.monthlyPayment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total repayment</span>
                <span className="font-medium">₹{offer.totalPayment.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={() => handleAcceptOffer(offer.id)}
              disabled={isAccepting && selectedOfferId === offer.id}>
              {isAccepting && selectedOfferId === offer.id ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                "Accept Offer"
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
