import prisma from '../config/db.js';

export const findServices = async ({ q, category }) => {
  const where = { active: true };

  if (category) {
    where.category = {
      equals: category,
      mode: 'insensitive',
    };
  }

  if (q) {
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { category: { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } },
    ];
  }

  const services = await prisma.service.findMany({
    where,
    orderBy: [
      { category: 'asc' },
      { name: 'asc' },
    ],
    select: {
      id: true,
      slug: true,
      name: true,
      category: true,
      description: true,
      price: true,
      durationMinutes: true,
    },
  });

  return services;
};

export const findServiceBySlug = async (slug) => {
  return prisma.service.findFirst({
    where: {
      slug,
      active: true,
    },
    select: {
      id: true,
      slug: true,
      name: true,
      category: true,
      description: true,
      price: true,
      durationMinutes: true,
    },
  });
};
