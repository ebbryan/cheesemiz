# TODO: Implement User Registration/Login with OTP Email Sending

- [x] Update email-service-config.ts to export sendEmail function
- [x] Create server/src/modules/users/users.service.ts for OTP generation, user saving, and email sending
- [x] Create server/src/modules/users/users.controller.ts for handling requests
- [x] Create server/src/routes/users.ts for defining routes
- [x] Update server/src/main.ts to include user routes

# TODO: Fix JSON Error Handling in Middleware

- [x] Add middleware to handle JSON parsing errors and return JSON responses
- [x] Update error and 404 handlers to return JSON
- [x] Test endpoints with malformed JSON to ensure proper error responses
