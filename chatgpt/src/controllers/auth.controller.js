async function getRegisterController(req,res) {
  res.render("register")
}

async function postRegisterController(req,res) {
  const { username, password, email } = req.body;
}