const express = require('express');
const router = express.Router();
const { get_all_members, add_member, get_member_by_id, update_member, delete_member, change_status } = require('../controllers/team_controller');
const { validate_team } = require('../validators/team_validator');
const auth_middleware = require('../middlewares/auth_middleware');

// ✅ Team Management Routes
router.get('/', auth_middleware, get_all_members);
router.post('/add', auth_middleware, validate_team, add_member);
router.get('/:id', auth_middleware, get_member_by_id);
router.put('/:id', auth_middleware, validate_team, update_member);
router.delete('/:id', auth_middleware, delete_member);
router.patch('/:id/status', auth_middleware, change_status);

module.exports = router;
