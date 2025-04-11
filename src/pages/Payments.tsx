
import React, { useEffect } from 'react';
import { Layout } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { 
  Calendar, 
  CreditCard, 
  Download, 
  Filter 
} from 'lucide-react';

interface Payment {
  id: string;
  date: string;
  amount: string;
  method: string;
  status: string;
  loanType: string;
}

const Payments: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const payments: Payment[] = [
    { 
      id: 'PMT-1234', 
      date: '2025-04-01', 
      amount: '$350.00', 
      method: 'Credit Card (****4321)', 
      status: 'Completed',
      loanType: 'Personal Loan'
    },
    { 
      id: 'PMT-1235', 
      date: '2025-03-01', 
      amount: '$350.00', 
      method: 'Bank Transfer', 
      status: 'Completed',
      loanType: 'Personal Loan'
    },
    { 
      id: 'PMT-1236', 
      date: '2025-02-01', 
      amount: '$350.00', 
      method: 'Credit Card (****4321)', 
      status: 'Completed',
      loanType: 'Personal Loan'
    },
    { 
      id: 'PMT-1237', 
      date: '2025-05-01', 
      amount: '$350.00', 
      method: 'Credit Card (****4321)', 
      status: 'Scheduled',
      loanType: 'Personal Loan'
    }
  ];

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container mx-auto">
          <div className="mb-8 flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Payments</h1>
              <p className="text-muted-foreground">
                View and manage your loan payments
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Make a Payment
              </Button>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Next Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <Calendar className="h-10 w-10 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Due on May 1, 2025</div>
                    <div className="text-2xl font-bold">$350.00</div>
                    <div className="text-sm mt-1">Personal Loan (ID: LOAN-5678)</div>
                  </div>
                </div>
                <Button>Pay Now</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Loan Type</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.loanType}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          payment.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {payment.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {payment.status === 'Completed' && (
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Payments;
