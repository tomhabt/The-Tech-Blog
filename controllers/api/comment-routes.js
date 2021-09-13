const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll({

    }).then(dbCommentData => res.json(dbCommentData))
    .catch (err => {
        console.log(err);
        res.status(400).json(err);
    });
});


router.get('/:id', (req, res) => {
    Comment.findOne({
        where: {
            id:req.params.id
        }

    }).then(dbCommentData => res.json(dbCommentData))
    .catch (err => {
        console.log(err);
        res.status(400).json(err);
    });
});


router.post('/', (req, res) => {
    // check the session
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      // use the id from the session
      user_id: req.session.user_id,
      post_id:req.body.post_id
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

router.put('/:id', (req, res) => {
    Comment.update(
      {
        comment_text: req.body.comment_text
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbCommentData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No comment found with this id' });
          return;
        }
        res.json(dbCommentData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  

router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({message:'No comment was found by that id!'});
            return;
        }
        res.json({comment:dbCommentData, message: 'Your comment has been removed!'
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    });

});

module.exports = router;