const Service = require("../models/service");

exports.createService = async (req, res) => {
  const data = await req.body;
  console.log(data);
  await Service.create({
    user: data.user,
    type: data.type,
    waitTime: data.waitTime,
    title: data.title,
    caption: data.caption,
    price: data.price,
    contract: "temp",
    likes: 0,
  });
  res.json("post created");
};
