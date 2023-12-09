export default function FetchErrorMessage(props) {
    return (
        <div data-testid="error-message" className="error-message" style={ (props.condition) ? {display: "none"} : {display: "block"}}>You must {props.requiredAction} in order to submit a comment!</div>
    );
}