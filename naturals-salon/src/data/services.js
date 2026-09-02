import haircutImg from '../assets/salon/haircut-01.jpg';
import hairstylingImg from '../assets/salon/hairstyling-01.jpg';
import hairColoringImg from '../assets/salon/hair-coloring-01.jpg';
import balayageImg from '../assets/salon/balayage-01.jpg';
import blowDryImg from '../assets/salon/blow-dry-01.jpg';
import boxBraidsImg from '../assets/salon/box-braids-01.jpg';
import shampooImg from '../assets/salon/shampoo-01.jpg';

import acneImg from '../assets/salon/acne-01.jpg';
import beautyImg from '../assets/salon/beauty-01.jpg'; // for Facials
import skincareImg from '../assets/salon/skincare-01.jpg';
import tanningImg from '../assets/salon/tanning-01.jpg';
import eyebrowImg from '../assets/salon/eyebrow-01.jpg'; // for beautification and threading

import waxingImg from '../assets/salon/waxing-01.jpg';
import brazilianWaxingImg from '../assets/salon/brazilian-waxing-01.jpg';

import bridalImg from '../assets/salon/bridal-01.jpg';
import makeupImg from '../assets/salon/makeup-01.jpg';

import nailsImg from '../assets/salon/nails-01.jpg'; // for manicure
import pedicureImg from '../assets/salon/pedicure-01.jpg';

import groomingImg from '../assets/salon/grooming-01.jpg'; // for shaving

export const services = [
  {
    id: "haircut",
    name: "Haircut",
    category: "Hair",
    description: "Professional haircut and styling tailored to your preferred look.",
    image: haircutImg
  },
  {
    id: "hairstyling",
    name: "Hairstyling",
    category: "Hair",
    description: "Expert styling for any occasion.",
    image: hairstylingImg
  },
  {
    id: "hair-coloring",
    name: "Hair Coloring",
    category: "Hair",
    description: "Vibrant and professional hair coloring services.",
    image: hairColoringImg
  },
  {
    id: "balayage",
    name: "Balayage",
    category: "Hair",
    description: "Seamless, natural-looking highlights.",
    image: balayageImg
  },
  {
    id: "blow-dry",
    name: "Blow Dry",
    category: "Hair",
    description: "Smooth and voluminous blowout.",
    image: blowDryImg
  },
  {
    id: "box-braids",
    name: "Box Braids",
    category: "Hair",
    description: "Protective and stylish braiding.",
    image: boxBraidsImg
  },
  {
    id: "shampoo-conditioning",
    name: "Shampoo & Conditioning",
    category: "Hair",
    description: "Deep cleansing and nourishing treatment.",
    image: shampooImg
  },
  {
    id: "acne-treatments",
    name: "Acne Treatments",
    category: "Beauty & Skin",
    description: "Salon skin-care services for customers seeking acne-focused beauty care. Consult the salon about suitable options.",
    image: acneImg
  },
  {
    id: "facials",
    name: "Facials",
    category: "Beauty & Skin",
    description: "Salon facial care focused on cleansing, grooming and refreshing the skin.",
    image: beautyImg
  },
  {
    id: "skin-care",
    name: "Skin Care",
    category: "Beauty & Skin",
    description: "Comprehensive skincare routines.",
    image: skincareImg
  },
  {
    id: "tanning",
    name: "Tanning",
    category: "Beauty & Skin",
    description: "Safe and even tanning services.",
    image: tanningImg
  },
  {
    id: "eyebrow-beautification",
    name: "Eyebrow Beautification",
    category: "Beauty & Skin",
    description: "Enhance and define your eyebrows.",
    image: eyebrowImg
  },
  {
    id: "body-waxing",
    name: "Body Waxing",
    category: "Waxing",
    description: "Full body smooth waxing.",
    image: waxingImg
  },
  {
    id: "brazilian-waxing",
    name: "Brazilian Waxing",
    category: "Waxing",
    description: "Complete and precise hair removal.",
    image: brazilianWaxingImg
  },
  {
    id: "waxing",
    name: "Waxing",
    category: "Waxing",
    description: "Quick and gentle waxing services.",
    image: waxingImg
  },
  {
    id: "eyebrow-threading",
    name: "Eyebrow Threading",
    category: "Waxing",
    description: "Precise eyebrow shaping.",
    image: eyebrowImg
  },
  {
    id: "bridal-services",
    name: "Bridal Services",
    category: "Bridal & Makeup",
    description: "Complete bridal makeover packages.",
    image: bridalImg
  },
  {
    id: "make-up",
    name: "Make-up",
    category: "Bridal & Makeup",
    description: "Professional makeup for all events.",
    image: makeupImg
  },
  {
    id: "make-up-services",
    name: "Make-up Services",
    category: "Bridal & Makeup",
    description: "Customized makeup applications.",
    image: makeupImg
  },
  {
    id: "manicure",
    name: "Manicure",
    category: "Nails",
    description: "Classic and luxury hand care.",
    image: nailsImg
  },
  {
    id: "pedicure",
    name: "Pedicure",
    category: "Nails",
    description: "Relaxing foot and nail care.",
    image: pedicureImg
  },
  {
    id: "shaving",
    name: "Shaving",
    category: "Grooming",
    description: "Clean and sharp professional shaving.",
    image: groomingImg
  }
];

export const flatServices = services.map(s => s.name);
export const categories = [...new Set(services.map(s => s.category))];
