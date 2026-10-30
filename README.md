# stitchbook-tailor

Shop service for StitchBook. It listens on port **3006**.

Tailor shops and iron shops both use this service. It handles shop sign-in, the shop booking list, and booking status updates.

Creating a booking stays in `stitchbook-customer`. This service sends status and payment-status changes to that service's internal route. The booking row stays in `stitchbook-core`.

## Public routes

- `POST /api/auth/register/tailor`
- `POST /api/auth/login/tailor`
- `GET /api/bookings/tailor/:tailorId`
- `PUT /api/bookings/:id/status`
- `PUT /api/bookings/:id/payment-status`

## Run

```bash
cp .env.example .env
npm install
npm start
```
