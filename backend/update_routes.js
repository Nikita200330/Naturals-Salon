import fs from 'fs';

const content = fs.readFileSync('src/routes/index.js', 'utf8');

const newImports = `
import adminAuthRoutes from './admin/auth.routes.js';
import adminAppointmentsRoutes from './admin/appointments.routes.js';
import adminFeedbackRoutes from './admin/feedback.routes.js';
`;

const newRoutes = `
router.use('/admin/auth', adminAuthRoutes);
router.use('/admin/appointments', adminAppointmentsRoutes);
router.use('/admin/feedback', adminFeedbackRoutes);
`;

const updatedContent = content.replace(
  "import feedbackRoutes from './feedback.routes.js';", 
  "import feedbackRoutes from './feedback.routes.js';\n" + newImports
).replace(
  "// router.use('/business', businessRoutes);",
  "// router.use('/business', businessRoutes);\n" + newRoutes
);

fs.writeFileSync('src/routes/index.js', updatedContent);
