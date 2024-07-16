import { useRouteError } from "react-router-dom";

// NotFound component to display when a route is not found
function NotFound() {
    // Get the error object using useRouteError hook
    const error = useRouteError();

    // Log the error to the console for debugging purposes
    console.error(error);

    return (
        <div id="error-page">
            {/* Title */}
            <h1>Oops!</h1>
            {/* Error message */}
            <p>Sorry, an unexpected error has occurred.</p>
            {/* Display the error message */}
            <p>
                {/* Display either the status text or the message from the error object */}
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}

export default NotFound;
