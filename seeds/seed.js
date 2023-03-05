const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./user-seeds.json');
const postData = require('./post-seeds.json');
const commentData = require('./comment-seeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Post.bulkCreate(
    postData.map(post => ({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    }))
  );

  const comments = await Comment.bulkCreate(
    commentData.map(comment => ({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      post_id: posts[Math.floor(Math.random() * posts.length)].id,
    }))
  );

  process.exit(0);
};

seedDatabase();
