import { createAppointmentSchema } from './src/validators/appointments.validator.js';
import { isPastTimeToday, isPastDate, isWithinBusinessHours } from './src/utils/salonTime.js';

try {
  const result = createAppointmentSchema.parse({
    customerName: " Nikita ",
    mobile: " 9876543210 ",
    serviceId: "haircut",
    preferredDate: "2026-09-10",
    preferredTime: "15:30",
    message: "Test"
  });
  console.log("Valid result:", result);
} catch (e) {
  console.log(e.errors);
}

try {
  createAppointmentSchema.parse({
    customerName: "",
    mobile: "123",
    serviceId: "",
    preferredDate: "10/09/2026",
    preferredTime: "3:30 PM",
  });
} catch(e) {
  console.log("Invalid result correctly failed");
}

