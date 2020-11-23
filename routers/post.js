const express = require('express')
const router = new express.Router()
const Post = require('../models/post')

router.post('/post', async (req, res) => {
    const post = new Post(req.body)

    try {
        await post.save()
        res.status(201).send(post)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/post', async (req, res) => {
    try {
        const post = await Post.find({})
        res.send(post)
    } catch (e) {
        res.status(500).send()
    }
})


router.get('/post/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const post = await Post.findById(_id)

        if (!post) {
            return res.status(404).send()
        }

        res.send(post)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/post/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['question', 'answer1','answer2','answer3','answer4','answerC']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!post) {
            return res.status(404).send()
        }

        res.send(post)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/post/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)

        if (!post) {
            res.status(404).send()
        }

        res.send(preguntas)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router


