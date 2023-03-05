const withAuth = (req, res, next) => {
    // Check if the user is logged in
    if (!req.session.user_id) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  const withAuthApi = (req, res, next) => {
    // Check if the user is logged in
    if (!req.session.user_id) {
      res.status(401).json({ message: 'You are not authorized to access this resource' });
    } else {
      next();
    }
  };
  
  module.exports = { withAuth, withAuthApi };
  