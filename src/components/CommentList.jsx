import useFetch from "../hooks/UseFetch";
import AddCommentForm from "./AddCommentForm";
function CommentList({ postId, currentUser }) {
  const {
    data: comments,
    loading,
    resetData,
  } = useFetch(`http://localhost:3000/comments?postid=${postId}`);
  async function deleteComment(commentId, userId) {
    if (userId !== currentUser.id) return;
    await fetch(`http://localhost:3000/comments/${commentId}`, {
      method: "DELETE",
    });
    resetData();
  }

  return (
    <>
      <ul className="commentList">
        {!loading &&
          comments.map((comment) => (
            <li key={comment.id}>
              {comment.text}{" "}
              {comment.userid === currentUser.id && (
                <button
                  onClick={() => deleteComment(comment.id, comment.userid)}
                >
                  Delete
                </button>
              )}
            </li>
          ))}
      </ul>
      <AddCommentForm
        postId={postId}
        currentUser={currentUser}
        resetData={resetData}
      />
    </>
  );
}

export default CommentList;
