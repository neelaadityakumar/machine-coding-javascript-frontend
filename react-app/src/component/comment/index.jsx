import React, { useState } from "react";

const CommentBox = ({ addComment }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      addComment(text);
      setText("");
    }
  };

  return (
    <div className="comment-details p-2 border rounded mt-2">
      <input
        type="text"
        placeholder="Add text here"
        className="input p-2 border rounded w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="btn submit bg-blue-500 text-white py-1 px-3 rounded mt-2"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

const Comment = ({ text, onReply }) => {
  const [showInputBox, setShowInputBox] = useState(false);
  const [replies, setReplies] = useState([]);

  const addReply = (replyText) => {
    setReplies([...replies, replyText]);
    setShowInputBox(false);
  };

  return (
    <div className="all-comment p-2 border rounded mt-2">
      <div className="card p-2 bg-gray-100 rounded">
        <span className="text block">{text}</span>
        <span
          className="reply text-blue-500 cursor-pointer mt-1 inline-block"
          onClick={() => setShowInputBox(!showInputBox)}
        >
          Add Reply
        </span>
      </div>

      {showInputBox && <CommentBox addComment={addReply} />}

      <div className="replies pl-4 border-l mt-2">
        {replies.map((reply, index) => (
          <Comment key={index} text={reply} onReply={addReply} />
        ))}
      </div>
    </div>
  );
};

const CommentContainer = () => {
  const [comments, setComments] = useState([]);

  const addComment = (commentText) => {
    setComments([...comments, commentText]);
  };

  return (
    <div className="comment-container p-4">
      <CommentBox addComment={addComment} />

      <div className="comments mt-4">
        {comments.map((comment, index) => (
          <Comment key={index} text={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentContainer;
