import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <>
      <SEO 
        title="Page Not Found | Naturals Salon Kalaburagi"
        description="The requested page was not found at Naturals Salon Kalaburagi."
      />
      <div className="pt-32 pb-24 min-h-[80vh] relative overflow-hidden bg-dark-950 flex flex-col items-center justify-center">
        <div className="absolute top-20 left-[-10%] w-[600px] h-[600px] bg-brand-700/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>

        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 text-center">
          <h1 className="text-8xl md:text-9xl font-serif font-bold text-brand-500 mb-6">404</h1>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Page Not Found</h2>
          <p className="text-brand-300/80 text-lg mb-10 max-w-xl mx-auto">
            We couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn't exist.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className="btn-secondary w-full sm:w-auto">
              Back Home
            </Link>
            <Link to="/services" className="btn-primary w-full sm:w-auto">
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
