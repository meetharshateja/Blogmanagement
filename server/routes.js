const express = require("express");
const router = express.Router();
const { getCollection } = require("./models/index");
const { ObjectId } = require("mongodb");
//endpoint to retrive all posts
router.get("/blog", async (req, res) => {
    const collection = getCollection();
    const blog = await collection.find({}).toArray();

    res.status(200).json(blog);
});
//endpoint to retrieve single post by id
router.get("/blog/:id", async (req, res) => {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
    const blog = await collection.find({"_id" :_id}).toArray();

    res.status(200).json(blog);
});
//endpoint to add posts
router.post("/blog", async (req, res) => {
  const collection = getCollection();
  const blog1=req.body;
  author= JSON.stringify(blog1.author);
  content = JSON.stringify(blog1.content);
  comments= JSON.stringify("");
  const blog= await collection.insertOne({author,content,comments});
  
  res.status(201).json({blog, _id:blog.insertedId });
})
// save post as draft
router.post("/blog/draft", async (req, res) => {
  const collection = getCollection();
  const blog1=req.body;
  author= JSON.stringify(blog1.author);
  content = JSON.stringify(blog1.content);
  comments= JSON.stringify(blog1.comments);
  const blog= await collection.insertOne({author,content,comments});
  
  res.status(201).json({blog, _id:blog.insertedId });
})
// endpoint to delete blog
router.delete("/blog/:id", async (req, res) => {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
  
    const deletedblog = await collection.deleteOne({ _id });
    res.status(200).json(deletedblog);
  })
// endpoint to update content
router.put("/blog/:id", async (req, res) => {
  const collection = getCollection();
  const _id = new ObjectId(req.params.id);
  let {content} = req.body;
  content = JSON.stringify(content);
  const updatedblog = await collection.updateOne({ _id }, { $set: { content: content }});
  res.status(200).json(updatedblog);
});
// endpoint to add comments
router.put("/blog/comment/:id", async (req, res) => {
  const collection = getCollection();
  const _id = new ObjectId(req.params.id);
  let {comments} = req.body;
  comments = JSON.stringify(comments);
  const updatedblog = await collection.updateOne({ _id }, { $set: { comments: comments }});
  res.status(200).json(updatedblog);
});

module.exports = router;