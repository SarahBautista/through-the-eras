export default function FetchEraBanner(props) {
    return (
        <div className="wrapper" style={{backgroundColor: props.color}} data-testid="banner">
            <a href={`/eras/${props.url_ending}`} style={{color: "white", textDecoration: "none", textShadow: "0 0 10px #000000",fontWeight:"bold", fontFamily: `"${props.era}"`}} data-testid="banner-link">{props.era}</a>
        </div>
    );
}