const homeController = {
  getHomePage: (req, res) => res.render('user/home.ejs', {
    logined: (req.session.user !== undefined),
  }),
  getLoginPage: (req, res) => res.render('user/login.ejs'),
  getSignUpPage: (req, res) => res.render('user/sign-up.ejs'),
  getSession: (req, res) => res.send(req.session),
  getSessionId: (req, res) => res.send(req.session.id),
};

export default homeController;
