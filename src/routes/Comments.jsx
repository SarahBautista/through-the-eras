import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { saveComment } from "../api.js";
import { editComment } from "../api.js";
import { deleteComment } from "../api.js";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import FetchHeader from "../FetchHeader.jsx";
import FetchErrorMessage from "../FetchErrorMessage.jsx";

export default function Comments() {
    const eraComments = useLoaderData().commentsForSelectedEra;
    const currentEra = useLoaderData().eraId;
    const startingNumberOfComments = 10;
    const startingNewCommentId = startingNumberOfComments + 1;
    const [newCommentId, setNewCommentId] = useState(startingNewCommentId);
    const [newCommentBody, setNewCommentBody] = useState("");
    const [newCommentAuthor, setNewCommentAuthor] = useState("");

    function getAlbumTitle(eraId) {
        const albumTitleWords = eraId.split('-');
        for (var i = 0; i < albumTitleWords.length; i++) {
            albumTitleWords[i] = albumTitleWords[i].charAt(0).toUpperCase() + albumTitleWords[i].substring(1);     
        }
        return albumTitleWords.join(' '); 
    }

    useEffect(() => {
        const parsedAlbumTitle = getAlbumTitle(currentEra);
        document.title = `${parsedAlbumTitle} Era Comments`;  
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        setNewCommentId((newCommentId + 1));
        const timestamp = new Date().toString();
        console.log(newCommentId);
        saveComment({ id: newCommentId, era_id: currentEra, author: newCommentAuthor, body: newCommentBody, timestamp: timestamp }).then(() => {
            setNewCommentAuthor("");
            setNewCommentBody("");
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        });
    }

    const authorHasValue = (newCommentAuthor !== "");
    const bodyHasValue = (newCommentBody !== "");
    const formIsValid = ((newCommentAuthor !== "") && (newCommentBody) !== "");

    return (
        <div className="comments-page">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="wrapper">
                <a href={`/eras/${currentEra}`} onClick={() => window.history.back()}>Back to the {getAlbumTitle(currentEra)} Era</a>
            </div>
            <FetchHeader slogan="Comments" />
            <h3>{getAlbumTitle(currentEra)} Era</h3>
            <div className="comments">
                {eraComments.slice().reverse().map((comment, i) => {
                    return <div className="comment-wrapper" key={i}>
                        <div className="comment" key={i}>
                            <div className="comment-author">{comment.author} said:</div>
                            <div className="comment-body">{comment.body}</div>
                            <div className="comment-timestamp">{comment.timestamp}</div>
                            <div className="action-links">
                                <a id="show-name-comment-link" onClick={() => { editComment({ id: comment.id, author: "Anonymous" }); setTimeout(() => {window.location.reload();}, 3000) }} style={ comment.id > 10 ? {display: "block"} : {display: "none"} }>Hide My Name</a>
                                <a id="delete-comment-link" onClick={() => { deleteComment(comment.id); setTimeout(() => {window.location.reload();}, 3000) }} style={ comment.id > 10 ? {display: "block"} : {display: "none"}}>Delete</a>
                            </div>
                        </div>
                    </div>;
                })}
            </div>
            <form
                className="new-comment-form"
                method="post"
                onSubmit={handleSubmit}
            >
                <h3 id="feedback-prompt">Want to leave your own comment as feedback?</h3>
                <div className="new-comment-wrapper">
                    <div className="new-comment form-floating mb-3">
                        <textarea
                            className="form-control"
                            id="new-comment-author"
                            onChange={(event) => {
                                setNewCommentAuthor(event.target.value);
                            }}
                            value={newCommentAuthor}
                        />
                        <label htmlFor="new-comment-author">What's your name?</label>
                    </div>
                </div>
                <FetchErrorMessage condition={authorHasValue} requiredAction="type in your name" />
                <div className="new-comment-wrapper">
                    <div className="new-comment form-floating mb-3">
                        <textarea
                            className="form-control"
                            id="new-comment-body"
                            onChange={(event) => {
                                setNewCommentBody(event.target.value);
                            }}
                            value={newCommentBody}
                        />
                        <label htmlFor="new-comment-body">Leave your own comment!</label>
                    </div>
                </div>
                <FetchErrorMessage condition={bodyHasValue} requiredAction="type in a message" />
                <div className="wrapper">
                    <button type="submit" className="submit-new-comment-button" disabled={!formIsValid}>
                        Submit Comment
                    </button>
                </div>
                <FetchErrorMessage condition={formIsValid} requiredAction="fill in both text areas" />
            </form>
            <div className="wrapper">
                <a href="/eras">Explore a Different Era</a>
            </div>
        </div>
    );
}