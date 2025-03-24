
import React from 'react';
import { Button } from '@/components/ui/button';
import { LoanCalculator } from '../components/loan/LoanCalculator';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '../components/Layout';
import { CheckCircle2, Shield, Clock, ArrowRight, BadgeCheck, Banknote, LineChart } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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
          <div className="mx-auto lg:mr-0 relative">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <LoanCalculator />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <div className="py-12 md:py-24 bg-gradient-to-b from-secondary to-secondary/40">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter">Why Choose LoanBerry?</h2>
          <p className="text-muted-foreground md:text-xl max-w-[700px] mx-auto">
            We offer a streamlined experience with competitive rates and exceptional service
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="glass card-hover border-none shadow-lg">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Simple Application</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Our straightforward online application takes just minutes to complete. No paperwork, no hassle.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="glass card-hover border-none shadow-lg">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Quick Decisions</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Get instant eligibility checks and receive your loan offers within minutes of applying.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="glass card-hover border-none shadow-lg">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Secure & Trusted</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
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
    <div className="py-12 md:py-24 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter">How It Works</h2>
          <p className="text-muted-foreground md:text-xl max-w-[700px] mx-auto">
            Get the funds you need in just a few simple steps
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
          <div className="space-y-4 text-center bg-card/40 p-6 rounded-xl border border-border/50 shadow-sm card-hover">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl mx-auto">
              1
            </div>
            <h3 className="text-xl font-bold">Apply Online</h3>
            <p className="text-muted-foreground">
              Fill out our simple online application with your personal and financial details.
            </p>
            <img src="/placeholder.svg" alt="Apply Online" className="w-32 h-32 mx-auto opacity-75" />
          </div>
          
          <div className="space-y-4 text-center bg-card/40 p-6 rounded-xl border border-border/50 shadow-sm card-hover">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl mx-auto">
              2
            </div>
            <h3 className="text-xl font-bold">Review Offers</h3>
            <p className="text-muted-foreground">
              Compare personalized loan offers with different terms and rates.
            </p>
            <img src="/placeholder.svg" alt="Review Offers" className="w-32 h-32 mx-auto opacity-75" />
          </div>
          
          <div className="space-y-4 text-center bg-card/40 p-6 rounded-xl border border-border/50 shadow-sm card-hover">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl mx-auto">
              3
            </div>
            <h3 className="text-xl font-bold">Get Funded</h3>
            <p className="text-muted-foreground">
              Accept your preferred offer and receive funds directly to your bank account.
            </p>
            <img src="/placeholder.svg" alt="Get Funded" className="w-32 h-32 mx-auto opacity-75" />
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/loan-application">
            <Button size="lg" className="px-8">
              Apply Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <div className="py-12 md:py-24 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter">What Our Customers Say</h2>
          <p className="text-muted-foreground md:text-xl max-w-[700px] mx-auto">
            Don't just take our word for it. Here's what our happy customers have to say.
          </p>
        </div>
        
        <div className="mt-8">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {[1, 2, 3].map((index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <Card className="glass border-none shadow-md">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                            {['JD', 'SM', 'AK'][index - 1]}
                          </div>
                          <div>
                            <h4 className="font-semibold">
                              {['John Doe', 'Sarah Miller', 'Alex Kim'][index - 1]}
                            </h4>
                            <div className="flex text-yellow-500">
                              {[...Array(5)].map((_, i) => (
                                <BadgeCheck key={i} className="h-4 w-4" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground mt-4">
                          {[
                            "The loan application process was incredibly smooth. I got approved quickly and the funds were in my account the next day!",
                            "I was hesitant at first, but LoanBerry made getting a loan so easy. The rates were better than my bank offered.",
                            "Excellent customer service! They helped me every step of the way and found me the best interest rate possible."
                          ][index - 1]}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-6">
              <CarouselPrevious className="static transform-none rounded-full" />
              <CarouselNext className="static transform-none rounded-full" />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

const CallToAction = () => {
  return (
    <div className="py-12 md:py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/5 to-blue-400/5 -z-10"></div>
      
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
            Ready to Get the Funds You Need?
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-[700px] mx-auto">
            Join thousands of satisfied customers who have used LoanBerry to get the financial support they needed.
          </p>
          
          <div className="grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Banknote className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold">$10M+</p>
              <p className="text-sm text-muted-foreground">Loans Funded</p>
            </div>
            
            <div className="flex flex-col items-center p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <BadgeCheck className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold">5,000+</p>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </div>
            
            <div className="flex flex-col items-center p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold">4.8/5</p>
              <p className="text-sm text-muted-foreground">Customer Rating</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Link to="/loan-application">
              <Button size="lg" className="px-8 w-full sm:w-auto">
                Apply Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="lg" className="px-8 w-full sm:w-auto">
                Create Account
              </Button>
            </Link>
          </div>
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
      <Testimonials />
      <CallToAction />
    </Layout>
  );
};

export default Index;
