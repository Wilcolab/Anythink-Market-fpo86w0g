/**
 * @route GET /:postId
 * @group Comments - Operations about comments
 * @param {string} postId.path.required - ID of the post to fetch comments for
 * @returns {Array.<Comment>} 200 - An array of comments
 * @returns {Error} 500 - Error fetching comments
 * @description Retrieves all comments associated with a specific post.
 */

/**
 * @route DELETE /:commentId
 * @group Comments - Operations about comments
 * @param {string} commentId.path.required - ID of the comment to delete
 * @returns {object} 200 - Success message
 * @returns {Error} 404 - Comment not found
 * @returns {Error} 500 - Error deleting comment
 * @description Deletes a comment by its ID.
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

// Hey GitHub Copilot, 
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
});

// add another endpoint for deleting a comment
router.delete("/:commentId", async (req, res) => {
  try {
    const result = await Comment.findByIdAndDelete(req.params.commentId);
    if (!result) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
});

