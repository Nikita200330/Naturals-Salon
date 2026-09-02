import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const servicesData = [
  { name: 'Acne Treatments', category: 'Beauty & Skin', slug: 'acne-treatments', active: true },
  { name: 'Balayage', category: 'Hair', slug: 'balayage', active: true },
  { name: 'Blow Dry', category: 'Hair', slug: 'blow-dry', active: true },
  { name: 'Body Waxing', category: 'Waxing', slug: 'body-waxing', active: true },
  { name: 'Box Braids', category: 'Hair', slug: 'box-braids', active: true },
  { name: 'Brazilian Waxing', category: 'Waxing', slug: 'brazilian-waxing', active: true },
  { name: 'Bridal Services', category: 'Bridal & Makeup', slug: 'bridal-services', active: true },
  { name: 'Eyebrow Beautification', category: 'Beauty & Skin', slug: 'eyebrow-beautification', active: true },
  { name: 'Eyebrow Threading', category: 'Waxing', slug: 'eyebrow-threading', active: true },
  { name: 'Facials', category: 'Beauty & Skin', slug: 'facials', active: true },
  { name: 'Haircut', category: 'Hair', slug: 'haircut', active: true },
  { name: 'Hairstyling', category: 'Hair', slug: 'hairstyling', active: true },
  { name: 'Make-up', category: 'Bridal & Makeup', slug: 'make-up', active: true },
  { name: 'Make-up Services', category: 'Bridal & Makeup', slug: 'make-up-services', active: true },
  { name: 'Manicure', category: 'Nails', slug: 'manicure', active: true },
  { name: 'Pedicure', category: 'Nails', slug: 'pedicure', active: true },
  { name: 'Shampoo & Conditioning', category: 'Hair', slug: 'shampoo-conditioning', active: true },
  { name: 'Shaving', category: 'Grooming', slug: 'shaving', active: true },
  { name: 'Skin Care', category: 'Beauty & Skin', slug: 'skin-care', active: true },
  { name: 'Tanning', category: 'Beauty & Skin', slug: 'tanning', active: true },
  { name: 'Waxing', category: 'Waxing', slug: 'waxing', active: true },
];

async function main() {
  console.log('Start seeding services...');
  
  for (const s of servicesData) {
    const service = await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        name: s.name,
        category: s.category,
        active: s.active,
      },
      create: {
        name: s.name,
        category: s.category,
        slug: s.slug,
        active: s.active,
      },
    });
    console.log(`Upserted service: ${service.name}`);
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
