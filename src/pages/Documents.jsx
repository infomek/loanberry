
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
import { 
  FileText, 
  Download, 
  Upload,
  FileCheck,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const Documents = () => {
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

  const documents = [
    { 
      id: 1, 
      name: 'Loan Agreement - Personal Loan', 
      date: 'April 5, 2025',
      type: 'contract',
      iconColor: 'text-blue-500'
    },
    { 
      id: 2, 
      name: 'Payment Schedule', 
      date: 'April 5, 2025',
      type: 'schedule',
      iconColor: 'text-green-500'
    },
    { 
      id: 3, 
      name: 'Income Verification', 
      date: 'March 28, 2025',
      type: 'verification',
      iconColor: 'text-amber-500'
    },
    { 
      id: 4, 
      name: 'Identity Verification', 
      date: 'March 28, 2025',
      type: 'verification',
      iconColor: 'text-amber-500'
    },
    { 
      id: 5, 
      name: 'Terms & Conditions', 
      date: 'March 28, 2025', 
      type: 'terms',
      iconColor: 'text-purple-500'
    }
  ];

  const requestedDocuments = [
    { 
      id: 1, 
      name: 'Bank Statements (Last 3 months)', 
      status: 'Required',
      dueDate: 'April 15, 2025'
    },
    { 
      id: 2, 
      name: 'Proof of Address', 
      status: 'Required',
      dueDate: 'April 15, 2025'
    }
  ];

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Documents</h1>
            <p className="text-muted-foreground">
              Access and manage your loan-related documents
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/3">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Documents</h2>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search documents..." 
                    className="pl-8"
                  />
                </div>
              </div>

              {documents.map((doc) => (
                <Card key={doc.id} className="mb-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center p-4">
                    <div className={`p-2 mr-4 rounded-lg bg-muted ${doc.iconColor}`}>
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium">{doc.name}</h3>
                      <p className="text-sm text-muted-foreground">Added {doc.date}</p>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="w-full md:w-1/3">
              <Card>
                <CardHeader>
                  <CardTitle>Required Documents</CardTitle>
                  <CardDescription>
                    Please upload these documents to proceed with your application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {requestedDocuments.map((doc) => (
                    <div key={doc.id} className="p-3 border rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{doc.name}</h4>
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                          {doc.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Due by {doc.dueDate}
                      </p>
                      <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Document
                      </Button>
                    </div>
                  ))}

                  <div className="p-3 border border-dashed rounded-md bg-muted/30 flex flex-col items-center justify-center text-center py-6">
                    <FileCheck className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Drag & drop any additional documents here</p>
                    <p className="text-xs text-muted-foreground mt-1">or</p>
                    <Button variant="secondary" size="sm" className="mt-2">
                      Browse Files
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Documents;
