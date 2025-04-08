
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, User, CreditCard, Building, Lock, Bell } from 'lucide-react';
import { toast } from 'sonner';
import { getUserProfile, addBankDetails } from '../../services/api';

interface BankDetailsInput {
  name: string;
  bankName: string;
  accountNumber: string;
  isPrimary: boolean;
  ifscCode?: string;
  accountName?: string;
}

interface UserProfileProps {
  userId?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    ifscCode: '',
    accountName: '',
    bankName: ''
  });
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getUserProfile();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, []);
  
  const handleAddBank = async () => {
    try {
      if (!bankDetails.accountNumber || !bankDetails.bankName) {
        toast.error('Please fill in all required fields');
        return;
      }
      
      const response = await addBankDetails(profile?.id || '', {
        name: bankDetails.accountName, // Using accountName for the name field
        accountNumber: bankDetails.accountNumber,
        bankName: bankDetails.bankName,
        isPrimary: true, // Default to primary
        ifscCode: bankDetails.ifscCode,
        accountName: bankDetails.accountName
      });
      
      toast.success(response.message || 'Bank account added successfully');
      
      // Update profile with new bank account
      setProfile(prev => ({
        ...prev,
        bankAccounts: [...(prev.bankAccounts || []), response.account]
      }));
      
      // Reset form
      setBankDetails({
        accountNumber: '',
        ifscCode: '',
        accountName: '',
        bankName: ''
      });
      
    } catch (error) {
      console.error('Error adding bank details:', error);
      toast.error('Failed to add bank details');
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <p>Loading profile...</p>
      </div>
    );
  }
  
  if (!profile) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error Loading Profile</CardTitle>
          <CardDescription>Could not load your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Please try refreshing the page or contact support if the issue persists.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <CardTitle>Profile Information</CardTitle>
          </div>
          <CardDescription>Your personal and contact details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Full Name</Label>
              <div className="font-medium">{profile.name}</div>
            </div>
            <div>
              <Label>Email</Label>
              <div className="font-medium">{profile.email}</div>
            </div>
            <div>
              <Label>Phone</Label>
              <div className="font-medium">{profile.phone}</div>
            </div>
            <div>
              <Label>Address</Label>
              <div className="font-medium">{profile.address}</div>
            </div>
            <div>
              <Label>Civil Score</Label>
              <div className="font-medium">{profile.civilScore}</div>
            </div>
            <div>
              <Label>KYC Status</Label>
              <div className="font-medium">{profile.kycStatus}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="bank">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="bank" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span className="hidden sm:inline">Bank Accounts</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Preferences</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="bank">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                <CardTitle>Bank Accounts</CardTitle>
              </div>
              <CardDescription>Manage your linked bank accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Display existing bank accounts */}
              {profile.bankAccounts && profile.bankAccounts.length > 0 ? (
                <div className="space-y-4">
                  {profile.bankAccounts.map((account: any) => (
                    <div key={account.id} className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <div className="font-medium">{account.name}</div>
                        <div className="text-sm text-muted-foreground">{account.bankName} - {account.accountNumber}</div>
                      </div>
                      {account.isPrimary && (
                        <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          Primary
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No bank accounts linked yet.</p>
              )}
              
              {/* Add new bank account */}
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-4">Add New Bank Account</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountName">Account Name</Label>
                    <Input 
                      id="accountName" 
                      value={bankDetails.accountName} 
                      onChange={(e) => setBankDetails({...bankDetails, accountName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input 
                      id="bankName" 
                      value={bankDetails.bankName} 
                      onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input 
                      id="accountNumber" 
                      value={bankDetails.accountNumber} 
                      onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ifscCode">IFSC Code</Label>
                    <Input 
                      id="ifscCode" 
                      value={bankDetails.ifscCode} 
                      onChange={(e) => setBankDetails({...bankDetails, ifscCode: e.target.value})}
                    />
                  </div>
                </div>
                <Button className="mt-4" onClick={handleAddBank}>Add Bank Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Loan Preferences</CardTitle>
              <CardDescription>Customize your loan communication and payment preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Communication Frequency</Label>
                    <div className="font-medium">{profile.loanPreferences?.communicationFrequency}</div>
                  </div>
                  <div>
                    <Label>Payment Date</Label>
                    <div className="font-medium">{profile.loanPreferences?.paymentDate}</div>
                  </div>
                  <div>
                    <Label>Auto Pay</Label>
                    <div className="font-medium">
                      {profile.loanPreferences?.autoPayEnabled ? 'Enabled' : 'Disabled'}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and authentication</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline">Change Password</Button>
                <Button variant="outline">Enable Two-Factor Authentication</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
