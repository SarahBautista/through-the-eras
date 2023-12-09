import { useEffect } from "react";
import FetchHeader from "../FetchHeader";

export default function Index() {
  useEffect(() => {
    document.title = `Through The Eras`;  
  }, []);

  return (
    <div className="index-page">
      <FetchHeader slogan="Swifties, experience The Eras Tour like never before!" />
      <h3>
        If you're looking to cherish the joy each era brought to every show, <br></br> these collages of Taylor's outfits grouped by era are perfect for you.
      </h3>
      <div className="wrapper">
        <a href="/eras">Explore an Era</a>
      </div>
      <img src="images/eras-banner.png" alt="The Eras Tour Banner"></img>
    </div>
  );
}
