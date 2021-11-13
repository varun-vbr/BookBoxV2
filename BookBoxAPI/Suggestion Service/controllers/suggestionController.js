const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const BookPopularity = require('./../models/bookPopularityModel');
const BookPopularityTrend = require('./../models/bookPopularityTrendModel');
const AuthorPopularity = require('./../models/authorPopularityModel');
const PublisherPopularity = require('./../models/publisherPopularityModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const axios = require('axios');
const SEARCH_DELTA = 1;
const READ_DELTA = 2;
const REVIEW_FACTOR = 1;

exports.addBookPopularity = catchAsync(async (req, res, next) => {
    try{
        const bookPopularity = await BookPopularity.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                bookPopularity
            }
        });
    } catch(e){
        return next(
            new AppError(e.response.data.message, 500)
        );
    }
});

exports.addBookPopularityTrend = catchAsync(async (req, res, next) => {
    try{
        const bookPopularityTrend = await BookPopularityTrend.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                bookPopularityTrend
            }
        });
    } catch(e){
        return next(
            new AppError(e.message, 500)
        );
    }
});

exports.addAuthorPopularity = catchAsync(async (req, res, next) => {
    try{
        const authorPopularity = await AuthorPopularity.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                authorPopularity
            }
        });
    } catch(e){
        return next(
            new AppError(e.message, 500)
        );
    }
});

exports.addPublisherPopularity = catchAsync(async (req, res, next) => {
    try{
        const publisherPopularity = await PublisherPopularity.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                publisherPopularity
            }
        });
    } catch(e){
        return next(
            new AppError(e.message, 500)
        );
    }
});

exports.getPopularBooks = catchAsync(async (req, res, next) => {
    try{
        const categoryId = req.params.categoryId;
        const popularBooks = await BookPopularity.find({categoryId}).sort({cpp : 'desc'}).limit(10);
        res.status(200).json({
            status: 'success',
            data: {
                popularBooks
            }
        });
    } catch(e){
        return next(
            new AppError(e.message, 500)
        );
    }
});

exports.getMostPopularBooks = catchAsync(async (req, res, next) => {
    try{
        const popularBooks = await BookPopularity.find().sort({cpp : 'desc'}).limit(10);
        res.status(200).json({
            status: 'success',
            data: {
                popularBooks
            }
        });
    } catch(e){
        return next(
            new AppError(e.message, 500)
        );
    }
});

exports.getTrendyBooks = catchAsync(async (req, res, next) => {
    try{
        const trendingBooks = await BookPopularityTrend.find().sort({lastActivity : 'desc'}).limit(10);
        res.status(200).json({
            status: 'success',
            data: {
                trendingBooks
            }
        });
    } catch(e){
        return next(
            new AppError(e.message, 500)
        );
    }
});

exports.getPopularAuthors = catchAsync(async (req, res, next) => {
    try{
        const popularAuthors = await AuthorPopularity.find().sort({cpp : 'desc'}).limit(10);
        res.status(200).json({
            status: 'success',
            data: {
                popularAuthors
            }
        });
    } catch(e){
        return next(
            new AppError(e.message, 500)
        );
    }
});

exports.getPopularPublishers = catchAsync(async (req, res, next) => {
    try{
        const popularPublishers = await PublisherPopularity.find().sort({cpp : 'desc'}).limit(10);
        res.status(200).json({
            status: 'success',
            data: {
                popularPublishers
            }
        });
    } catch(e){
        return next(
            new AppError(e.message, 500)
        );
    }
});

exports.updateBookPopularity = catchAsync(async (req, res, next) => {
    let cppDelta = 0;
    try{
        let bookPopularity = await BookPopularity.findOne({bookId : req.body.bookId});
        if(!bookPopularity){
            return next(
                new AppError("Popularity data for the book is missing. Please check if the bookId is valid", 404)
            ); 
        }
        if(req.body.action === "Search"){
            cppDelta = SEARCH_DELTA;
        } else if(req.body.action == "Read"){
            cppDelta = READ_DELTA;
        } else if(req.body.action == "Review" && req.body.rating){
            cppDelta = REVIEW_FACTOR * req.body.rating;
        }
        bookPopularity.cpp = bookPopularity.cpp + cppDelta;
        await bookPopularity.save();
        res.status(200).json({
            status: 'success',
            data: {
                bookPopularity
            }
        });
    }catch(e){
        return next(
            new AppError(e.message, 500)
        );
    }
});

exports.updateBookPopularityTrend = catchAsync(async (req, res, next) => {
    try{
        let bookPopularityTrend = await BookPopularityTrend.findOne({bookId : req.body.bookId});
        if(!bookPopularityTrend){
            return next(
                new AppError("Popularity Trend data for the book is missing. Please check if the bookId is valid", 404)
            ); 
        }
        bookPopularityTrend.lastActivity = Date.now();
        await bookPopularityTrend.save();
        res.status(200).json({
            status: 'success',
            data: {
                bookPopularityTrend
            }
        });
    }catch(e){
        return next(
            new AppError(e.message, 500)
        );
    }
});

exports.updateAuthorPopularity = catchAsync(async (req, res, next) => {
    let cppDelta = 0;
    try{
        let authorPopularity = await AuthorPopularity.findOne({authorId : req.body.authorId});
        if(!authorPopularity){
            return next(
                new AppError("Popularity data for the author is missing. Please check if the authorId is valid", 404)
            ); 
        }
        if(req.body.action === "Search"){
            cppDelta = SEARCH_DELTA;
        } else if(req.body.action == "Read"){
            cppDelta = READ_DELTA;
        } else if(req.body.action == "Review" && req.body.rating){
            cppDelta = REVIEW_FACTOR * req.body.rating;
        }
        authorPopularity.cpp = authorPopularity.cpp + cppDelta;
        await authorPopularity.save();
        res.status(200).json({
            status: 'success',
            data: {
                authorPopularity
            }
        });
    }catch(e){
        return next(
            new AppError(e.message, 500)
        );
    }
});

exports.updatePublisherPopularity = catchAsync(async (req, res, next) => {
    let cppDelta = 0;
    try{
        let publisherPopularity = await PublisherPopularity.findOne({publisherId : req.body.publisherId});
        if(!publisherPopularity){
            return next(
                new AppError("Popularity data for the publisher is missing. Please check if the publisherId is valid", 404)
            ); 
        }
        if(req.body.action === "Search"){
            cppDelta = SEARCH_DELTA;
        } else if(req.body.action == "Read"){
            cppDelta = READ_DELTA;
        } else if(req.body.action == "Review" && req.body.rating){
            cppDelta = REVIEW_FACTOR * req.body.rating;
        }
        publisherPopularity.cpp = publisherPopularity.cpp + cppDelta;
        await publisherPopularity.save();
        res.status(200).json({
            status: 'success',
            data: {
                publisherPopularity
            }
        });
    }catch(e){
        return next(
            new AppError(e.message, 500)
        );
    }
});


