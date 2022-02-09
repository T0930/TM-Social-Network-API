const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughts) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thoughts._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'Thought created, but found no user with that ID' })
          : res.json('Created thought success')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },    
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : User.deleteMany({ _id: { $in: thought.users } })
      )
      .then(() => res.json({ message: 'Thought and users deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  addReaction(req, res) {
    Thought.findOneAndUpdate(
          { _Id: req.params.id },
          { $addToSet: { reactions: req.body } },
          { new: true },
        )
      .then((thoughtReaction) =>
        !thoughtReaction
          ? res
              .status(404)
              .json({ message: 'Thought not found' })
          : res.json('Created reaction success')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    },

    deleteReaction(req, res) {
      Thought.findOneAndUpdate(
            { _Id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true },
          )
        .then((thoughtReaction) =>
          !thoughtReaction
            ? res
                .status(404)
                .json({ message: 'Thought not found' })
            : res.json('Delete reaction success')
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
      }
};
