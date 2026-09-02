import prisma from '../config/db.js';
import AppError from '../utils/AppError.js';

export const getFeedback = async (filters, page, limit) => {
  const { status, rating, serviceId, search } = filters;
  const skip = (page - 1) * limit;

  const where = {};
  
  if (status) {
    where.status = status;
  }
  
  if (rating) {
    where.rating = parseInt(rating, 10);
  }
  
  if (serviceId) {
    where.serviceId = serviceId;
  }
  
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { feedback: { contains: search, mode: 'insensitive' } }
    ];
  }

  // Default order: PENDING first, then newest
  const orderBy = [
    { status: 'asc' },
    { createdAt: 'desc' }
  ];

  const [feedbackList, total] = await Promise.all([
    prisma.feedback.findMany({
      where,
      include: {
        service: { select: { name: true, id: true } }
      },
      orderBy,
      skip,
      take: limit
    }),
    prisma.feedback.count({ where })
  ]);

  return {
    feedback: feedbackList,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};

export const getFeedbackById = async (id) => {
  const feedback = await prisma.feedback.findUnique({
    where: { id },
    include: {
      service: { select: { name: true, id: true } }
    }
  });

  if (!feedback) {
    throw new AppError('FEEDBACK_NOT_FOUND', 'Feedback not found', 404);
  }

  return feedback;
};

export const updateFeedbackStatus = async (id, status) => {
  const feedback = await prisma.feedback.findUnique({
    where: { id }
  });

  if (!feedback) {
    throw new AppError('FEEDBACK_NOT_FOUND', 'Feedback not found', 404);
  }

  const updatedFeedback = await prisma.feedback.update({
    where: { id },
    data: { status }
  });

  return updatedFeedback;
};
