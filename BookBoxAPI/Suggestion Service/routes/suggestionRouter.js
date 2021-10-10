const express = require('express');
const suggestionController = require('./../controllers/suggestionController');

const router = express.Router();

router.post('/popularity', suggestionController.addBookPopularity);
router.post('/trends', suggestionController.addBookPopularityTrend);
router.post('/author', suggestionController.addAuthorPopularity);
router.post('/publisher', suggestionController.addPublisherPopularity);

router.get('/popularity/:categoryId', suggestionController.getPopularBooks);
router.get('/popularity', suggestionController.getMostPopularBooks);
router.get('/trends', suggestionController.getTrendyBooks);
router.get('/author', suggestionController.getPopularAuthors);
router.get('/publisher', suggestionController.getPopularPublishers);

router.put('/popularity', suggestionController.updateBookPopularity);
router.put('/trends', suggestionController.updateBookPopularityTrend);
router.put('/author', suggestionController.updateAuthorPopularity);
router.put('/publisher', suggestionController.updatePublisherPopularity);

module.exports = router;