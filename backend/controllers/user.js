exports.getUser = (req, res) => {
  res.json(req.user);
};

exports.getUserState = (req, res) => {
  res.json({ status: !!req.user });
};
