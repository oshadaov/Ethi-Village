import { Link } from "react-router-dom";
import Container from "../components/common/Container";
import Button from "../components/common/Button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-bg flex items-center justify-center py-24">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <div className="relative">
            <h1 className="text-[150px] md:text-[200px] font-bold text-primary/5 select-none leading-none">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-4xl md:text-5xl font-bold text-primary font-serif">Lost in the Jungle?</h2>
            </div>
          </div>
          
          <p className="text-muted text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            The page you are looking for might have been moved, deleted, or never existed in the first place. Let's get you back to safety.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Button to="/" className="inline-flex items-center gap-3 !px-10">
              <Home size={20} />
              Return Home
            </Button>
            <button 
              onClick={() => window.history.back()} 
              className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl font-bold text-primary hover:bg-white transition-all shadow-sm border border-border/10"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
          </div>
          
          <div className="pt-12">
            <div className="w-20 h-1 bg-accent/20 mx-auto rounded-full" />
          </div>
        </div>
      </Container>
    </main>
  );
}
