const express = require('express');

const router = express.Router();

const adminAuth = require('../adminAuth');

const {

    createBulkInquiry,

    getBulkInquiries,

    updateBulkInquiryStatus

} = require('../controller/bulkInquiryController');

router.post('/', createBulkInquiry);

router.get('/', adminAuth, getBulkInquiries);

router.put('/:id', adminAuth, updateBulkInquiryStatus);

module.exports = router;
