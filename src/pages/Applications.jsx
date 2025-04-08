
import React from 'react';
import { Layout } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useEffect } from 'react-router-dom';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListFilter, PlusCircle } from 'lucide-react';

const Applications = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const applications = [
    { 
      id: 1, 
      type: 'Personal Loan', 
      amount: '$5,000', 
      status: 'In Review', 
      submittedDate: '2025-04-01',
      statusColor: 'bg-yellow-500'
    },
    { 
      id: 2, 
      type: 'Auto Loan', 
      amount: '$15,000', 
      status: 'Approved', 
      submittedDate: '2025-03-28',
      statusColor: 'bg-green-500'
    },
    { 
      id: 3, 
      type: 'Home Improvement', 
      amount: '$10,000', 
      status: 'Denied', 
      submittedDate: '2025-03-22',
      statusColor: 'bg-red-500'
    }
  ];

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container mx-auto">
          <div className="mb-8 flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Loan Applications</h1>
              <p className="text-muted-foreground">
                Manage and track your loan applications
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ListFilter className="h-4 w-4" />
                Filter
              </Button>
              <Button onClick={() => navigate('/loan-application-dashboard')} className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                New Application
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            {applications.map((app) => (
              <Card key={app.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>{app.type}</CardTitle>
                    <CardDescription>Submitted on {app.submittedDate}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${app.statusColor}`}></span>
                    <span className="text-sm font-medium">{app.status}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-muted-foreground">Amount</div>
                      <div className="text-xl font-semibold">{app.amount}</div>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate(`/application-details/${app.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Applications;
