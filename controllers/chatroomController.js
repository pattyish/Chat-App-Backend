const mongoose = require("mongoose");
const Chatroom = mongoose.model("Chatroom");

exports.createChatroom = async (req, res) => {
  const { name } = req.body;

  const nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(name)) throw "Chatroom name can contain only alphabets.";

  const chatroomExist = await Chatroom.findOne({
    name: name,
  });

  if (chatroomExist) throw "Chatroom already exist!";

  const chatroom = new Chatroom({
    name: name,
  });

  const chatroomName = await chatroom.save();
  res.status(201).json({
    status: 201,
    message: "Chatroom created!!",
    chatroomName: chatroomName,
  });
};

exports.getAllChatrooms = async (req, res) => {
const chatrooms = await Chatroom.find({});
res.status(200).json({
    status: 200,
    chatrooms: chatrooms
})
}