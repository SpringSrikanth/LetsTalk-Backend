const express = require('express');
const mongoose = require('mongoose');
const Blog = mongoose.model('Blog');

const router = express.Router();

router.get('/public/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(201).send({blogs,totalCount:blogs.length});
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            message: err.message
        })
    }
})

router.get('/public/blogs/:pageIndex/:pageSize/:published', async (req, res) => {
    try {
        const {pageIndex,pageSize,published}= req.params;
		const allBlogs = await Blog.find({published});
		const blogs = await Blog.find({published}).limit(parseInt(pageSize)).skip(parseInt(pageSize)*parseInt(pageIndex));
        res.status(201).send({blogs,totalCount:allBlogs.length});
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            message: err.message
        })
    }
})



module.exports = router;