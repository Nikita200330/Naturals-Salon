import fs from 'fs';

const oldPath = 'naturals-salon/src/pages/Appointment.jsx';
let content = fs.readFileSync(oldPath, 'utf8');

// I will just use sed or write a new one entirely.
