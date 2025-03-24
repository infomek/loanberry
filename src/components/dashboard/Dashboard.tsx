
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { getUserLoans } from '../../services/api';
import { Loader2, CreditCard, CalendarClock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Payment {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
}

interface Loan {
  id: string;
  amount: number;
  term: number;
  interestRate: number;
  monthlyPayment: number;
  totalPayment: number;
  status: 'approved' | 'pending' | 'active' | 'completed' | 'rejected';
  startDate: string;
  nextPaymentDate: string;
  remainingPayments: number;
  paymentsMade: number;
  payments: Payment[];
}

export const DashboardContent: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      setIsLoading(true);
      try {
        const loansData = await getUserLoans();
        setLoans(loansData);
      } catch (error) {
        console.error("Error fetching loans:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoans();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  if (loans.length === 0) {
    return (
      <Card className="glass">
        <CardHeader>
          <CardTitle>No Loans Found</CardTitle>
          <CardDescription>You don't have any active loans at the moment.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <CreditCard className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-center text-muted-foreground mb-6">
            Apply for a loan to get started with your financial goals.
          </p>
          <Link to="/loan-application">
            <Button>Apply for a Loan</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {loans.map((loan) => (
        <div key={loan.id} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass md:col-span-2">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Loan Summary</CardTitle>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(loan.status)}`}>
                    {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                  </span>
                </div>
                <CardDescription>
                  ${loan.amount.toLocaleString()} loan at {loan.interestRate}% interest
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-6">
                <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                  <div>
                    <div className="text-sm text-muted-foreground">Monthly Payment</div>
                    <div className="text-2xl font-semibold">${loan.monthlyPayment.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Total Term</div>
                    <div className="text-2xl font-semibold">{loan.term} months</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Next Payment</div>
                    <div className="text-xl font-semibold">{formatDate(loan.nextPaymentDate)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Start Date</div>
                    <div className="text-xl font-semibold">{formatDate(loan.startDate)}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{loan.paymentsMade} of {loan.term} payments</span>
                  </div>
                  <Progress value={(loan.paymentsMade / loan.term) * 100} className="h-2" />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-primary/5 p-3 rounded-lg text-center">
                    <div className="text-xs text-muted-foreground">Total Paid</div>
                    <div className="font-semibold">
                      ${(loan.monthlyPayment * loan.paymentsMade).toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-primary/5 p-3 rounded-lg text-center">
                    <div className="text-xs text-muted-foreground">Remaining</div>
                    <div className="font-semibold">
                      ${(loan.monthlyPayment * loan.remainingPayments).toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-primary/5 p-3 rounded-lg text-center">
                    <div className="text-xs text-muted-foreground">Total Interest</div>
                    <div className="font-semibold">
                      ${(loan.totalPayment - loan.amount).toFixed(2)}
                    </div>
                  </div>
                </div>
                
                <Button className="w-full">Make a Payment</Button>
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <CalendarClock className="h-5 w-5 mr-2" />
                  <span>Upcoming Payment</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex flex-col items-center justify-center text-center p-4 space-y-4">
                  <div className="text-sm text-muted-foreground">Amount Due</div>
                  <div className="text-3xl font-bold">${loan.monthlyPayment.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">Due Date</div>
                  <div className="text-lg font-semibold">{formatDate(loan.nextPaymentDate)}</div>
                  <Button className="w-full">Pay Now</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="glass">
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>
                View your past and upcoming payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loan.payments.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No payment history available yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Payment Date</th>
                        <th className="text-left py-3 px-4 font-medium">Amount</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loan.payments.map((payment) => (
                        <tr key={payment.id} className="border-b last:border-b-0">
                          <td className="py-3 px-4">
                            {formatDate(payment.date)}
                          </td>
                          <td className="py-3 px-4">
                            ${payment.amount.toFixed(2)}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-block text-xs px-2 py-1 rounded-full ${getPaymentStatusColor(payment.status)}`}>
                              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};
