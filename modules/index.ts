// Users Module
export { UsersService, usersService } from './users/users.service';

// Crops Module
export { CropsService, cropsService } from './crops/crops.service';

// Reports Module
export { ReportsService, reportsService } from './reports/reports.service';

// Export all services together for convenience
export const services = {
  users: require('./users/users.service').usersService,
  crops: require('./crops/crops.service').cropsService,
  reports: require('./reports/reports.service').reportsService,
};
