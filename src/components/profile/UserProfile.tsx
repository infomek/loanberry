import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { getUserProfile, addBankDetails } from '../../services/api';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';
import { 
  User, 
  UserRound, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Building, 
  Shield, 
  Wallet, 
  FileText 
} from 'lucide-react';

export const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);
  const [isEditingBank, setIsEditingBank] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    ifscCode: '',
    accountName: '',
    bankName: ''
  });
  const [addingBank, setAddingBank] = useState(false);
  const bankForm = React.useRef(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfileData(data);
      } catch (error) {
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, []);
  
  const handleSaveBankDetails = async () => {
    if (!bankDetails.accountNumber || !bankDetails.ifscCode || 
        !bankDetails.accountName || !bankDetails.bankName) {
      toast.error("Please fill all bank details");
      return;
    }
    
    try {
      const result = await addBankDetails(user?.id || '1', bankDetails);
      if (result.success) {
        toast.success(result.message);
        setIsEditingBank(false);
        setProfileData({
          ...profileData,
          bankDetails
        });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to save bank details");
    }
  };

  const handleAddBankAccount = async () => {
    if (!bankForm.current) return;
    
    const formData = new FormData(bankForm.current);
    const accountNumber = formData.get('accountNumber') as string;
    const ifscCode = formData.get('ifscCode') as string;
    const accountName = formData.get('accountName') as string;
    const bankName = formData.get('bankName') as string;
    
    if (!accountNumber || !ifscCode || !accountName || !bankName) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setAddingBank(true);
    
    try {
      const result = await addBankDetails(userProfile!.id, {
        accountNumber,
        ifscCode,
        accountName,
        bankName,
        name: accountName,
        isPrimary: true
      });
      
      if (result.success) {
        toast.success('Bank account added successfully');
        setProfileData({
          ...profileData,
          bankDetails: {
            ...bankDetails,
            accountNumber,
            ifscCode,
            accountName,
            bankName
          }
        });
      }
    } catch (error) {
      toast.error('Failed to add bank account');
    } finally {
      setAddingBank(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information and bank details
        </p>
      </div>
      
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal Details</TabsTrigger>
          <TabsTrigger value="financial">Financial Profile</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserRound className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Your basic profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Full Name</Label>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{profileData?.name}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Email Address</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{profileData?.email}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Phone Number</Label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{profileData?.phone}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Address</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{profileData?.address}</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button variant="outline">Edit Profile</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="financial" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Civil Score
              </CardTitle>
              <CardDescription>
                Your credit worthiness score
              </CardDescription>
            </CardHeader>
            <CardContent>
              {profileData?.civilScore ? (
                <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-primary/5 rounded-lg">
                  <div>
                    <span className="text-3xl font-bold">{profileData.civilScore}</span>
                    <Badge className="ml-2 bg-green-500">Good</Badge>
                    <p className="text-sm text-muted-foreground mt-1">
                      Last updated: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <Button className="mt-4 sm:mt-0" variant="outline" size="sm" asChild>
                    <a href="/civil-score-check">Check Again</a>
                  </Button>
                </div>
              ) : (
                <div className="text-center p-6">
                  <p className="mb-4 text-muted-foreground">
                    You haven't checked your civil score yet
                  </p>
                  <Button asChild>
                    <a href="/civil-score-check">Check Now</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Bank Account Details
                </CardTitle>
                {profileData?.bankDetails && !isEditingBank && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsEditingBank(true)}
                  >
                    Update
                  </Button>
                )}
              </div>
              <CardDescription>
                Your bank account information for disbursements
              </CardDescription>
            </CardHeader>
            <CardContent>
              {profileData?.bankDetails && !isEditingBank ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Account Holder Name</Label>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{profileData.bankDetails.accountName}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Bank Name</Label>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{profileData.bankDetails.bankName}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Account Number</Label>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{profileData.bankDetails.accountNumber}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">IFSC Code</Label>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{profileData.bankDetails.ifscCode}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="accountName">Account Holder Name</Label>
                      <Input
                        id="accountName"
                        value={bankDetails.accountName}
                        onChange={(e) => setBankDetails({...bankDetails, accountName: e.target.value})}
                        placeholder="As per bank records"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Bank Name</Label>
                      <Input
                        id="bankName"
                        value={bankDetails.bankName}
                        onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
                        placeholder="e.g. State Bank of India"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input
                        id="accountNumber"
                        value={bankDetails.accountNumber}
                        onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                        placeholder="Your account number"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="ifscCode">IFSC Code</Label>
                      <Input
                        id="ifscCode"
                        value={bankDetails.ifscCode}
                        onChange={(e) => setBankDetails({...bankDetails, ifscCode: e.target.value.toUpperCase()})}
                        placeholder="e.g. SBIN0001234"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    {isEditingBank && (
                      <Button 
                        variant="outline" 
                        onClick={() => setIsEditingBank(false)}
                      >
                        Cancel
                      </Button>
                    )}
                    <Button onClick={handleSaveBankDetails}>
                      Save Bank Details
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documents
              </CardTitle>
              <CardDescription>
                Your KYC and loan-related documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center">
                <p className="text-muted-foreground">
                  No documents have been uploaded yet.
                </p>
                <Button className="mt-4" variant="outline">
                  Upload Documents
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
