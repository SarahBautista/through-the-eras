import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";

export default function SelectedEraPage() {
    const selectedCollage = useLoaderData();
    const selectedCollageSrc = selectedCollage[0].src;
    const selectedCollageEra = selectedCollage[0].era_id;

    function getAlbumTitle(eraId) {
        const albumTitleWords = eraId.split('-');
        for (var i = 0; i < albumTitleWords.length; i++) {
            albumTitleWords[i] = albumTitleWords[i].charAt(0).toUpperCase() + albumTitleWords[i].substring(1);     
        }
        return albumTitleWords.join(' ');
    }

    useEffect(() => {
        const parsedAlbumTitle = getAlbumTitle(selectedCollageEra);
        document.title = `The ${parsedAlbumTitle} Era`;  
    }, []);

    return (
        <div className="selected-eras-page">
            <img src={process.env.PUBLIC_URL + selectedCollageSrc} alt="Selected Era Collage" style={{width: "650px", display: "block", marginLeft: "auto", marginRight: "auto", marginTop: "30px"}}></img>
            <h6>
                All of our website's collages were posted by caelaaa, Ava, Halliefaithx, and ollie on Pinterest.
            </h6>
            <h3>Want to give us feedback on our featured collage for this era?</h3>
            <div className="wrapper">
                <a href={`/comments/${selectedCollageEra}`}>Leave a Comment</a>
            </div>
            <h3>Want to explore the featured collages of other eras?</h3>
            <div className="wrapper">
                <a href="/eras">Explore a Different Era</a>
            </div>
        </div>
    );
}