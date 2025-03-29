
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const LoanDetailsForm = ({
  purpose,
  setPurpose,
  employment,
  setEmployment,
  name,
  setName,
  email,
  setEmail,
  onSubmit,
  isSubmitting,
  onBack
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="purpose">Loan Purpose</Label>
        <Select value={purpose} onValueChange={setPurpose} required>
          <SelectTrigger>
            <SelectValue placeholder="Select purpose" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="home_improvement">Home Improvement</SelectItem>
            <SelectItem value="debt_consolidation">Debt Consolidation</SelectItem>
            <SelectItem value="major_purchase">Major Purchase</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="medical">Medical Expenses</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="employment">Employment Status</Label>
        <Select value={employment} onValueChange={setEmployment} required>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full_time">Full-time employed</SelectItem>
            <SelectItem value="part_time">Part-time employed</SelectItem>
            <SelectItem value="self_employed">Self-employed</SelectItem>
            <SelectItem value="retired">Retired</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input-focus"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-focus"
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
      
      <Button 
        variant="outline" 
        onClick={onBack} 
        className="w-full">
        Back to Eligibility
      </Button>
    </form>
  );
};
