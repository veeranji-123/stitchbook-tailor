const express = require('express');
const { requireTailor } = require('../middleware/auth');
const { forwardCore, customerInternal, send } = require('../upstream');

const router = express.Router();

router.post('/auth/register/tailor', (req, res) => forwardCore(req, res));
router.post('/auth/login/tailor', (req, res) => forwardCore(req, res));

router.post('/tailor/ironing-services', (req, res) => forwardCore(req, res));
router.put('/tailor/ironing-services/:id', (req, res) => forwardCore(req, res));
router.delete('/tailor/ironing-services/:id', (req, res) => forwardCore(req, res));
router.post('/tailor/stitching-speeds', (req, res) => forwardCore(req, res));
router.put('/tailor/stitching-speeds/:id', (req, res) => forwardCore(req, res));
router.delete('/tailor/stitching-speeds/:id', (req, res) => forwardCore(req, res));
router.get('/tailor/pickup-drop', (req, res) => forwardCore(req, res));
router.put('/tailor/pickup-drop', (req, res) => forwardCore(req, res));
router.get('/tailor/working-hours', (req, res) => forwardCore(req, res));
router.put('/tailor/working-hours', (req, res) => forwardCore(req, res));
router.get('/tailor/slots', (req, res) => forwardCore(req, res));
router.post('/tailor/slots', (req, res) => forwardCore(req, res));
router.put('/tailor/slots/:id', (req, res) => forwardCore(req, res));
router.delete('/tailor/slots/:id', (req, res) => forwardCore(req, res));
router.post('/slots/block', (req, res) => forwardCore(req, res));
router.put('/tailors/:id', (req, res) => forwardCore(req, res));
router.get('/analytics/:tailorId/weekly', (req, res) => forwardCore(req, res));
router.get('/analytics/:tailorId/services', (req, res) => forwardCore(req, res));
router.get('/analytics/:tailorId/monthly', (req, res) => forwardCore(req, res));

router.get('/bookings/tailor/:tailorId', requireTailor, async (req, res) => {
  if (req.auth.id !== req.params.tailorId) {
    return res.status(403).json({ error: 'Cannot view another tailor\'s bookings' });
  }
  try {
    const response = await customerInternal(
      'GET',
      `/internal/shop-bookings/${encodeURIComponent(req.params.tailorId)}?actorId=${encodeURIComponent(req.auth.id)}`
    );
    return send(res, response);
  } catch (e) {
    return res.status(502).json({ error: 'Customer service unavailable' });
  }
});

router.put('/bookings/:id/status', requireTailor, async (req, res) => {
  try {
    const response = await customerInternal('PUT', `/internal/shop-bookings/${encodeURIComponent(req.params.id)}/status`, {
      actorId: req.auth.id,
      actorType: 'tailor',
      status: req.body.status,
      tailorNotes: req.body.tailorNotes,
    });
    return send(res, response);
  } catch (e) {
    return res.status(502).json({ error: 'Customer service unavailable' });
  }
});

router.put('/bookings/:id/payment-status', requireTailor, async (req, res) => {
  try {
    const response = await customerInternal('PUT', `/internal/shop-bookings/${encodeURIComponent(req.params.id)}/payment-status`, {
      actorId: req.auth.id,
      paymentStatus: req.body.paymentStatus,
    });
    return send(res, response);
  } catch (e) {
    return res.status(502).json({ error: 'Customer service unavailable' });
  }
});

module.exports = router;
