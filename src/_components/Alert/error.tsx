
type AlertErrorType = {
    message: string;
    notShowError: boolean;
};

function AlertError(props: AlertErrorType) {
    if (props.notShowError) {
        return null;
    } else {
        return (
            <div className="alert alert-danger" role="alert">
                {props.message}
            </div>
        );
    }

}

export { AlertError };