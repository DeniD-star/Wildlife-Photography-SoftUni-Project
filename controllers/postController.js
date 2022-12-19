const { isUser } = require('../middlewares/guards');
const { parseError } = require('../util/parse');
const router = require('express').Router();


router.get('/create', isUser(), (req, res) => {
    res.render('create')
})
router.post('/create', isUser(), async (req, res) => {
    try {
        const postData = {
            title: req.body.title,
            keyWord: req.body.keyWord,
            location: req.body.location,
            date: req.body.date.trim(),
            imageUrl: req.body.imageUrl,
            description: req.body.description,
            author: req.user._id,
            authorFirstName: req.user.firstName,
            authorLastName: req.user.lastName,
            votes: [],
            votesPlus: [],
            votesMinus: [],
            // rating: Number(req.body.rating),
        }

        await req.storage.createPost(postData)
        res.redirect('/posts/catalog')
    } catch (err) {
        let errors;
        if (err.errors) {
            errors = Object.values(err.errors).map(e => e.properties.message);
        } else {
            errors = [err.message]
        }

        const ctx = {
            errors,
            postData: {
                title: req.body.title,
                keyWord: req.body.keyWord,
                location: req.body.location,
                date: req.body.date,
                imageUrl: req.body.imageUrl,
                description: req.body.description,
                // rating: Number(req.body.rating)
            }
        }

        res.render('create', ctx)
    }
})

router.get('/catalog', async (req, res) => {
    const posts = await req.storage.getAllPosts()
    res.render('catalog', { posts })
})

router.get('/details/:id', async (req, res) => {
    try {

        const post = await req.storage.getPostById(req.params.id)
        post.hasUser = Boolean(req.user);
        post.isAuthor = req.user && req.user._id == post.author;
        post.voted = req.user && post.votes.find(x => x._id == req.user._id)
        post.plus = req.user && post.votesPlus && post.votesPlus.find(x => x._id == req.user._id)
        post.minus = req.user && post.votesMinus && post.votesMinus.find(x => x._id == req.user._id)
        res.render('details', { post })

    } catch (err) {
        console.log(err.message);
        res.redirect('/posts/404')
    }
})


router.get('/404', (req, res) => {
    res.render('404')
})

router.get('/edit/:id', isUser(), async (req, res) => {
    const post = await req.storage.getPostById(req.params.id);
    res.render('edit', { post })
})
router.post('/edit/:id', isUser(), async (req, res) => {
    try {

        const post = await req.storage.getPostById(req.params.id);
        if (post.author != req.user._id) {
            throw new Error('You cannot edit a post you have not created!')
        }

        await req.storage.editPost(req.params.id, req.body)
        res.redirect('/posts/details/' + req.params.id)
    } catch (err) {
        let errors;
        if (err.errors) {
            errors = Object.values(err.errors).map(e => e.properties.message);
        } else {
            errors = [err.message]
        }

        const ctx = {
            errors,
            post: {
                _id: req.params.id,//tuk da ne zabravq pri edit post da dobavq id to na hotela
                title: req.body.title,
                keyWord: req.body.keyWord,
                location: req.body.location,
                date: req.body.date,
                imageUrl: req.body.imageUrl,
                description: req.body.description,
            }
        }

        res.render('edit', ctx)
    }
})


router.get('/delete/:id', isUser(), async (req, res) => {
    try {
        const post = await req.storage.getPostById(req.params.id);
        if (post.author != req.user._id) {
            throw new Error('You cannot delete a post you have not created!')
        }

        await req.storage.deletePost(req.params.id)
        res.redirect('/posts/catalog')
    } catch (err) {
        console.log(err.message);
        res.redirect('/posts/404')
    }
})

module.exports = router;