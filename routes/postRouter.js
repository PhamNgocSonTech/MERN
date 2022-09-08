const router = require('express').Router();
const postCtrl =  require('../controllers/postCtrl')
const auth = require('../middleware/auth')

router.route('/posts')
    .post(auth, postCtrl.createPost)
    .get(auth, postCtrl.getPosts)
    
router.route('/post/:id')
    .patch(auth, postCtrl.updatePost)

router.patch('/post/:id/like', auth, postCtrl.likePost)
router.patch('/post/:id/unlike', auth, postCtrl.unLikePost)

module.exports = router