import prisma from '../config/db.js';

const DUPLICATE_WINDOW_MINUTES = 5;

export const createFeedback = async (data) => {
  const { name, rating, feedback, serviceId } = data;

  // 1. Verify service if provided
  if (serviceId) {
    const service = await prisma.service.findUnique({
      where: { id: serviceId }
    });
    if (!service) {
      const error = new Error('Service not found');
      error.code = 'NOT_FOUND';
      throw error;
    }
  }

  // 2. Check for duplicate submission
  const duplicateTimeThreshold = new Date(Date.now() - DUPLICATE_WINDOW_MINUTES * 60 * 1000);
  const duplicate = await prisma.feedback.findFirst({
    where: {
      name,
      rating,
      feedback,
      createdAt: {
        gte: duplicateTimeThreshold
      }
    }
  });

  if (duplicate) {
    const error = new Error('This feedback appears to have been submitted already.');
    error.code = 'DUPLICATE_FEEDBACK';
    throw error;
  }

  // 3. Create feedback
  const newFeedback = await prisma.feedback.create({
    data: {
      name,
      rating,
      feedback,
      serviceId,
      status: 'PENDING'
    }
  });

  return newFeedback;
};

export const getPublicFeedback = async (query) => {
  const { page, limit, rating, serviceId, sort } = query;
  
  const skip = (page - 1) * limit;

  // Build the where clause: ONLY APPROVED
  const where = {
    status: 'APPROVED'
  };

  if (rating) {
    where.rating = rating;
  }
  
  if (serviceId) {
    where.serviceId = serviceId;
  }

  // Determine sort order
  let orderBy = [];
  if (sort === 'highest') {
    orderBy = [{ rating: 'desc' }, { createdAt: 'desc' }];
  } else if (sort === 'lowest') {
    orderBy = [{ rating: 'asc' }, { createdAt: 'desc' }];
  } else {
    // newest
    orderBy = [{ createdAt: 'desc' }];
  }

  // Fetch paginated items and total count of APPROVED matching filters
  const [items, count, aggregations] = await Promise.all([
    prisma.feedback.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        rating: true,
        feedback: true,
        createdAt: true,
        service: {
          select: {
            slug: true,
            name: true
          }
        }
      }
    }),
    prisma.feedback.count({ where }),
    prisma.feedback.aggregate({
      where,
      _avg: {
        rating: true
      }
    })
  ]);

  return {
    items,
    count,
    averageRating: aggregations._avg.rating ? Number(aggregations._avg.rating.toFixed(1)) : null
  };
};
