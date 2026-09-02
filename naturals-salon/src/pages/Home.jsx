import Hero from '../components/Hero';
import QuickActions from '../components/QuickActions';
import ServicesPreview from '../components/ServicesPreview';
import WhyChooseUs from '../components/WhyChooseUs';
import GalleryPreview from '../components/GalleryPreview';
import ReviewsPreview from '../components/ReviewsPreview';
import LocationSection from '../components/LocationSection';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <>
      <SEO 
        title="Naturals Salon Kalaburagi | Hair, Beauty & Bridal Services"
        description="Explore hair, beauty, bridal, grooming, waxing and nail services at Naturals Salon in Prime Mall, Kalaburagi. Request an appointment or get directions."
        url="/"
      />
      <Hero />
      <QuickActions />
      <ServicesPreview />
      <WhyChooseUs />
      <GalleryPreview />
      <ReviewsPreview />
      <LocationSection />
    </>
  );
}
