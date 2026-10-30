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
- `POST /api/tailor/ironing-services`
- `PUT /api/tailor/ironing-services/:id`
- `DELETE /api/tailor/ironing-services/:id`
- `POST /api/tailor/stitching-speeds`
- `PUT /api/tailor/stitching-speeds/:id`
- `DELETE /api/tailor/stitching-speeds/:id`
- `GET /api/tailor/pickup-drop`
- `PUT /api/tailor/pickup-drop`
- `GET /api/tailor/working-hours`
- `PUT /api/tailor/working-hours`
- `GET /api/tailor/slots`
- `POST /api/tailor/slots`
- `PUT /api/tailor/slots/:id`
- `DELETE /api/tailor/slots/:id`
- `POST /api/slots/block`

An iron shop uses the ironing-service routes. A tailoring shop uses the stitching-speed routes. Pickup and drop is available to both.

## Run

```bash
cp .env.example .env
npm install
npm start
```
