import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import MouseEffectWrapper from "@/components/MouseEffectWrapper";
import AIChatbot from "@/components/AIChatbot";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import BookCall from "@/pages/BookCall";
import ClientIntake from "@/pages/ClientIntake";
import Resources from "@/pages/Resources";
import Article from "@/pages/Article";
import Testimonials from "@/pages/Testimonials";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/book-call" component={BookCall} />
      <Route path="/client-intake" component={ClientIntake} />
      <Route path="/resources" component={Resources} />
      <Route path="/resources/:slug" component={Article} />
      <Route path="/testimonials" component={Testimonials} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MouseEffectWrapper className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
          <Navigation />
          <Router />
          <AIChatbot />
          <Toaster />
        </MouseEffectWrapper>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
