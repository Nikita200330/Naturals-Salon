import LocationSection from '../components/LocationSection';

export default function Contact() {
  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center mb-12">
         <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-white tracking-wide">Contact Us</h1>
         <p className="text-brand-300/80 max-w-2xl mx-auto text-lg leading-relaxed">
            We would love to hear from you. Reach out to us for any queries or to book an appointment.
         </p>
      </div>
      <LocationSection />
    </div>
  );
}
