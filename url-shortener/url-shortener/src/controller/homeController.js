const homeController = {
  getHomePage: (req, res) => res.render('home.ejs'),
  getLoginPage: (req, res) => res.render('login.ejs'),
  getSignUpPage: (req, res) => res.render('sign-up.ejs'),
  getSession: (req, res) => res.send(req.session),
};

export default homeController;
