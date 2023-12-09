import { useState, useRef, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import FetchHeader from "../FetchHeader";
import { deleteSelectedComments } from "../api";
import { ToastContainer } from "react-toastify";

export default function Admin() {
    const [selectedComments, setSelectedComments] = useState([]);
    const allComments = useLoaderData();
    const [massSelection, setMassSelection] = useState(false);
    const checkboxRef = useRef();

    function isIndeterminate() {
        if (selectedComments && selectedComments.length && (selectedComments.length < allComments.length)) {
            return true;
        }
        else {
            return false;
        }
    }

    useEffect(() => {
        checkboxRef.current.indeterminate = isIndeterminate();
      }, [isIndeterminate()]);

    return (
        <div className="admin-page">
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
            <FetchHeader slogan="Admin - Delete Comments" />
            <div className="admin-actions">
                <div className="form-check admin-action" key="mass-selection">
                    <input
                    className="form-check-input"
                    type="checkbox"
                    id="mass-selection"
                    ref={checkboxRef}
                    checked={massSelection ? true : false}
                    onChange={(event) => {
                        const isChecked = event.target.checked;
                        if (isChecked) {
                            setSelectedComments(allComments);
                            setMassSelection(true);
                        }
                        else {
                            setSelectedComments([]);
                            setMassSelection(false);
                        }
                    }}
                    />
                    <label className="form-check-label" htmlFor="mass-selection">
                        <b style={{color: "#034a62"}}>Select/Deselect All</b>
                    </label>
                </div>
                <div className="admin-action" id="delete-selected-comments-button-wrapper">
                    <button type="submit" id="delete-selected-comments-button" onClick={() => { deleteSelectedComments(selectedComments); setTimeout(() => {window.location.reload();}, 3000); }} style={ (selectedComments && selectedComments.length) ? {display: "block"} : {display: "none"} }>
                        Delete Selected Comments
                    </button>
                </div>
            </div>
            {allComments.map((comment) => {
                return (
                    <div className="form-check" key={comment.id}>
                        <input
                        className="form-check-input"
                        type="checkbox"
                        id={comment.id}
                        checked={selectedComments.includes(comment) ? true : false}
                        onChange={(event) => {
                            const isChecked = event.target.checked;
                            if (isChecked) {
                                const selected = [...selectedComments, comment];
                                setSelectedComments(selected);
                            }
                            else {
                                const selected = selectedComments.filter((selectedComment) => {
                                    return selectedComment !== comment;
                                });
                                setSelectedComments(selected);
                            }
                        }}
                        />
                        <label className="form-check-label" htmlFor={comment.id}>
                            <b>Comment id:</b> {comment.id} / <b>Era id:</b> {comment.era_id} / <b>Author of comment:</b> {comment.author} / <b>Body of comment:</b> {comment.body} / <b>Timestamp:</b> {comment.timestamp}
                        </label>
                    </div>
                );
            })}
        </div>
    );
}
