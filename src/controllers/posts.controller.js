const Post = require('../models/Post')
const User = require('../models/User')
const postController = {}

postController.newPost = async (req, res) => {
    try {
        const { title, description, image, user } = req.body
        const errors = []
        if(title.length <= 0 || description.length <= 0 || image.length <= 0 || user.length <= 0) {
            errors.push( { text: 'Please verify fields' })
        }
        if(errors.length > 0) {
            return res.json({ error_code: 500, msg: errors })
        }else {
            const post = new Post({ title, description, image, user })
            await post.save()
            return res.json({ code: 201, msg: 'post created', post })
        }
    } catch (err) {
        console.log(err)
        return res.json({ error_code: 500, err })
    }
}

postController.posts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createDate: 'asc' }).lean()
        if (posts) {
            return res.json({ 
                code: 200,
                posts: posts.map(post => ({ id: post._id, title: post.title, description: post.description, date: post.createDate, image: post.image, likes: post.likes })) 
            })
        }
    } catch (err) {
        console.log(err)
        return res.json({ error_code: 500, err })
    }
}

postController.like = async (req, res) => {
    try {
        const { userEmail } = req.body
        const idPost = req.params.id
        const errors = []
        if(userEmail.length <= 0) {
            errors.push( { text: 'Please verify fields' })
        }
        if(errors.length > 0) {
            return res.json({ error_code: 500, msg: errors })
        }else {
            const post = await Post.findOne({ _id: idPost })
            const user = await User.findOne({ email: userEmail })
            if (!post) return res.json({ error_code: 500, msg: 'post not found' })
            if (!user) return res.json({ error_code: 500, msg: 'user not found' })
            if (post.likes.length > 0) {
                const result = post.likes.find(({ userEmail }) => userEmail === userEmail);
                if (result) {
                    const likesUpdated = post.likes.filter(el => el.userEmail !== userEmail)
                    await Post.findOneAndUpdate(idPost, {
                        likes: likesUpdated
                    })
                }
            } else {
                await Post.findOneAndUpdate(idPost, {
                    likes: [{ ...post.likes, userEmail: user.email }]
                })
        }
            return res.json({ code: 201, msg: 'liked', post })
        }
    } catch (err) {
        console.log(err)
        return res.json({ error_code: 500, err })
    }
}

module.exports = postController
