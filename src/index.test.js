import { render } from "@testing-library/react";
import FetchHeader from "./FetchHeader";
import FetchEraBanner from "./FetchEraBanner";
import FetchErrorMessage from "./FetchErrorMessage";

// test #1
test("rendering header with correct slogan", () => {
    const slogan = "Welcome!";

    const { getAllByTestId } = render(
        <FetchHeader slogan={slogan} />
    );

    expect(getAllByTestId("header")[0].innerHTML).toBe("Welcome!");
});

// test #2
test("rendering era banner with correct background color", () => {
    const albumTitle = "Fearless";
    const urlEnding = "fearless";
    const key = "fearless";
    const color = "gold";

    const { getAllByTestId } = render(
        <FetchEraBanner era={albumTitle} url_ending={urlEnding} key={key} color={color} />
    );

    expect(getAllByTestId("banner")[0].style.backgroundColor).toBe("gold");
});

// test #3
test("rendering era banner with correct src", () => {
    const albumTitle = "Fearless";
    const urlEnding = "fearless";
    const key = "fearless";
    const color = "gold";

    const { getAllByTestId } = render(
        <FetchEraBanner era={albumTitle} url_ending={urlEnding} key={key} color={color} />
    );

    expect(getAllByTestId("banner-link")[0]).toHaveAttribute("href", "/eras/fearless");
});

// test #4
test("rendering era banner with correct font family", () => {
    const albumTitle = "Fearless";
    const urlEnding = "fearless";
    const key = "fearless";
    const color = "gold";

    const { getAllByTestId } = render(
        <FetchEraBanner era={albumTitle} url_ending={urlEnding} key={key} color={color} />
    );

    expect(getAllByTestId("banner-link")[0].style.fontFamily).toBe("\"Fearless\"");
});

// test #5
test("render name input error message with correct warning", () => {
    const authorHasValue = false; // author input does not have value
    const requiredAction = "type in your name";

    const { getAllByTestId } = render(
        <FetchErrorMessage condition={authorHasValue} requiredAction={requiredAction} />
    );

    expect(getAllByTestId("error-message")[0].innerHTML).toBe("You must type in your name in order to submit a comment!")
});

// test #6
test("do not render name input error message if author input has a value", () => {
    const authorHasValue = true; // author input has value
    const requiredAction = "type in your name";

    const { getAllByTestId } = render(
        <FetchErrorMessage condition={authorHasValue} requiredAction={requiredAction} />
    );

    expect(getAllByTestId("error-message")[0].style.display).toBe("none");
});

// test #7
test("render body input error message with correct warning", () => {
    const bodyHasValue = false; // body input does not have value
    const requiredAction = "type in a message";

    const { getAllByTestId } = render(
        <FetchErrorMessage condition={bodyHasValue} requiredAction={requiredAction} />
    );

    expect(getAllByTestId("error-message")[0].innerHTML).toBe("You must type in a message in order to submit a comment!")
});

// test #8
test("do not render body input error message if body input has a value", () => {
    const bodyHasValue = true; // body input has value
    const requiredAction = "type in your name";

    const { getAllByTestId } = render(
        <FetchErrorMessage condition={bodyHasValue} requiredAction={requiredAction} />
    );

    expect(getAllByTestId("error-message")[0].style.display).toBe("none");
});

// test #9
test("render form submission error message with correct warning", () => {
    const formIsValid = false; // form is not valid
    const requiredAction = "fill in both text areas";

    const { getAllByTestId } = render(
        <FetchErrorMessage condition={formIsValid} requiredAction={requiredAction} />
    );

    expect(getAllByTestId("error-message")[0].innerHTML).toBe("You must fill in both text areas in order to submit a comment!")
});

// test #10
test("do not render form submission error message if both inputs for the form have a value", () => {
    const formIsValid = true; // both form inputs have values, and thus the form is valid
    const requiredAction = "fill in both text areas";

    const { getAllByTestId } = render(
        <FetchErrorMessage condition={formIsValid} requiredAction={requiredAction} />
    );

    expect(getAllByTestId("error-message")[0].style.display).toBe("none");
});