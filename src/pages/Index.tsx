
import React from 'react';
import { Button } from '@/components/ui/button';
import { LoanCalculator } from '../components/loan/LoanCalculator';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '../components/Layout';
import { CheckCircle2, Shield, Clock, ArrowRight } from 'lucide-react';

const Hero = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="py-12 md:py-24 lg:py-32 space-y-8">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Fast & Simple
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Get the funds you need with
              <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent"> LoanBerry</span>
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Apply for a personal loan with competitive rates and flexible terms. Get funds as soon as the next business day.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Link to={isAuthenticated ? "/loan-application" : "/login"}>
                <Button size="lg" className="group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
          <div className="mx-auto lg:mr-0">
            <LoanCalculator />
          </div>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <div className="py-12 md:py-24 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter">Why Choose LoanBerry?</h2>
          <p className="text-muted-foreground md:text-xl max-w-[700px] mx-auto">
            We offer a streamlined experience with competitive rates and exceptional service
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="glass">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Simple Application</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Our straightforward online application takes just minutes to complete. No paperwork, no hassle.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="glass">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Quick Decisions</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get instant eligibility checks and receive your loan offers within minutes of applying.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="glass">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Secure & Trusted</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Your personal and financial information is protected with industry-leading security measures.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <div className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter">How It Works</h2>
          <p className="text-muted-foreground md:text-xl max-w-[700px] mx-auto">
            Get the funds you need in just a few simple steps
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3 lg:gap-12">
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl mx-auto">
              1
            </div>
            <h3 className="text-xl font-bold">Apply Online</h3>
            <p className="text-muted-foreground">
              Fill out our simple online application with your personal and financial details.
            </p>
          </div>
          
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl mx-auto">
              2
            </div>
            <h3 className="text-xl font-bold">Review Offers</h3>
            <p className="text-muted-foreground">
              Compare personalized loan offers with different terms and rates.
            </p>
          </div>
          
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl mx-auto">
              3
            </div>
            <h3 className="text-xl font-bold">Get Funded</h3>
            <p className="text-muted-foreground">
              Accept your preferred offer and receive funds directly to your bank account.
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/loan-application">
            <Button size="lg">
              Apply Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <HowItWorks />
    </Layout>
  );
};

export default Index;
