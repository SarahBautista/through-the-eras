import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// GET AJAX requests

export function fetchEras() {
    return fetch("http://localhost:3000/eras").then((response) => {
        return response;
    });
}

export function fetchSelectedEra(eraId) {
    return fetch(
        "http://localhost:3000/collages"
    ).then((response) => {
        const collages = response.json();
        return collages;
    }).then((collages) => {
        const result = {collages, eraId};
        return result;
    }).then((result) => {
        const selectedCollage = [];
        result.collages.map((collage) => {
            if (collage.era_id === result.eraId) {
                selectedCollage.push(collage);
            }
        })
        return selectedCollage;
    });
}

export function fetchEraComments(eraId) {
    return fetch(
        "http://localhost:3000/comments"
    ).then((response) => {
        const comments = response.json();
        return comments;
    }).then((comments) => {
        const currentNumberOfComments = comments.length;
        const result = {comments, eraId, currentNumberOfComments};
        return result;
    }).then((result) => {
        const eraId = result.eraId;
        const commentsForSelectedEra = [];
        result.comments.map((comment) => {
            if (comment.era_id === result.eraId) {
                commentsForSelectedEra.push(comment);
            }
        })
        const currentNumberOfComments = result.currentNumberOfComments;
        const dataToPassIntoRoute = {eraId, commentsForSelectedEra, currentNumberOfComments};
        return dataToPassIntoRoute;
    });
}

// POST AJAX request

export function saveComment(data) {
    return fetch("http://localhost:3000/comments", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json",
        },
    }).then((response) => {
        return response.json();
    }).then(() => {
        toast.success('⭐ Comment successfully made! Refreshing page...', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    });
}

// PATCH AJAX request

export function editComment(data) {
    fetch(`http://localhost:3000/comments/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json",
        },
    }).then((response) => {
        return response.json();
    }).then(() => {
        toast.success('⭐ Comment successfully edited! Refreshing page...', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    });
}

// DELETE AJAX request

export function deleteComment(commentId) {
    fetch(`http://localhost:3000/comments/${commentId}`, {
        method: "DELETE",
    }).then((response) => {
        console.log(response.status);
    }).then(() => {
        toast.success('⭐ Comment successfully deleted! Refreshing page...', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    });
}

// admin GET AJAX request

export function fetchAllComments() {
    return fetch("http://localhost:3000/comments").then((response) => {
        return response;
    });
}

// admin DELETE AJAX request

export function deleteSelectedComments(selectedComments) {
    const selectedCommentsIds = [];
    const selectedCommentsUrls = [];
    const deleteFetchStatements = [];

    selectedComments.map((selectedComment) => {
        selectedCommentsIds.push(selectedComment.id)
    })

    selectedCommentsIds.map((selectedCommentId) => {
        selectedCommentsUrls.push(`http://localhost:3000/comments/${selectedCommentId}`);
    })

    selectedCommentsUrls.map((selectedCommentUrl) => {
        deleteFetchStatements.push(
            fetch(selectedCommentUrl, {
                method: "DELETE",
            })
        );
    });
    
    Promise.all([deleteFetchStatements]).then((response) => {
        console.log(response);
    }).then(() => {
        console.log("Success!");
    }).then(() => {
        toast.success('⭐ Selected comments successfully deleted! Refreshing page...', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    });
}