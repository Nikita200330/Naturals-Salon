export const createAppointment = async (appointmentData) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate success
  return {
    success: true,
    data: {
      id: `APT-${Math.floor(Math.random() * 10000)}`,
      status: 'pending',
      ...appointmentData
    }
  };
};

export const checkAvailability = async (serviceId, date) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock availability
  return {
    slots: [
      { time: '10:00', available: true },
      { time: '11:00', available: false },
      { time: '12:00', available: true },
      { time: '14:00', available: true },
      { time: '15:00', available: true },
      { time: '16:00', available: false },
    ]
  };
};
