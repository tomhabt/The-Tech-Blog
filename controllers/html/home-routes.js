const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');

router.get('/', (req, res) => {
  console.log('======================');
  // console.log(req.session);
    Post.findAll({
        attributes: [
            'id',
            'post_title',
            'post_content',
            'created_at'
          ],
          order: [['created_at', 'DESC']],
          include: [
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'created_at'],
              include: {
                model: User,
                attributes: ['username']
              }
            },
            {
              model: User,
              attributes: ['username']
            }
          ]
        })
        .then(dbPostData => {
          
            console.log(dbPostData[1].get({plain:true}));
          // pass a multipe post object into the homepage template
          const postsArr =  dbPostData.map(post => post.get({plain:true}))
          // console.log(postsArr);
          res.render('homepage', {postsArr, loggedIn: req.session.loggedIn});
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });

    
    router.get('/login', (req, res) => {
      if (req.session.loggedIn) {
        res.redirect('/create');
        return;
      }
    
      res.render('login');
    });

    router.get('/signup', (req, res) => {
      // if (req.session.loggedIn) {
      //   res.redirect('/login');
      //   return;
      // }
    
      res.render('signup');
    });

    router.get('/post/:id', (req, res) => {
      Post.findOne({
        where: {
          id: req.params.id
        },
        attributes: [
            'id',
            'post_title',
            'post_content',
            'created_at'
          ],
          order: [['created_at', 'DESC']],
          include: [
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'created_at'],
              include: {
                model: User,
                attributes: ['username']
              }
            },
            {
              model: User,
              attributes: ['username']
            }
          ]
        })
        .then(dbPostData => {
          if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
          }
    
          // serialize the data
          const post = dbPostData.get({ plain: true });
    
          // pass data to template including session
          res.render('single-post', { post,loggedIn: req.session.loggedIn });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });


module.exports = router;