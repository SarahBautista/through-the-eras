import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import FetchHeader from "../FetchHeader";
import FetchEraBanner from "../FetchEraBanner";

export default function Eras() {
    const eras = useLoaderData();

    useEffect(() => {
        document.title = `The Eras Selector`;  
      }, []);

    return (
        <div className="eras-page">
            <FetchHeader slogan="Welcome to The Eras Selector!" />
            <h3>
                Click on one of the eras below to explore <br></br> a collage of
                Taylor's outfits for that era.
            </h3>
            <div>
                {eras.map((era) => {
                    return <FetchEraBanner era={era.album_title} url_ending={era.era_id} key={era.era_id} color={era.associated_color} />;
                })}
            </div>
        </div>
    );
}