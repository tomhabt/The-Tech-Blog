const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all posts route to home page
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
              attributes: ['id', 'comment_text','user_id', 'post_id', 'created_at'],
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
         
            console.log(dbPostData[0].get({plain:true}));
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

// login page route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// signup page route
router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/dashboard', withAuth, (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'post_content',
      'post_title',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
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
      // serialize data before passing to template
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// user creating new post route
router.get('/dashboard/create', withAuth, (req, res) => {
  res.render('create-post', { loggedIn: true });
});

// single post view route
router.get('/posts/:id', (req, res) => {
  if (req.session.loggedIn)
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
          attributes: ['id', 'comment_text','user_id', 'post_id', 'created_at'],
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

// user to edit post route
router.get('/dashboard/edit/:id', withAuth, (req, res) => {
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
          attributes: ['id', 'comment_text','user_id', 'post_id', 'created_at'],
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
      res.render('update-post', { post,loggedIn: req.session.loggedIn });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;