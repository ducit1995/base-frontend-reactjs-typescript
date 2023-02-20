import { alertActions } from '../../_actions';
import { useDispatch } from 'react-redux';


type AlertSuccessType = {
    onComplete: VoidFunction;
    notShowComplete: boolean;
    message: string;
};

function AlertSuccess(props: AlertSuccessType) {
    const dispatch = useDispatch();

    let autoClose = setTimeout(() => {
        close();
    }, 2000);

    function close() {
        clearTimeout(autoClose);
        props.onComplete();
        dispatch(alertActions.clear());

    }
    if (props.notShowComplete) {
        return null;
    } else {
        return (
            <div className="alert alert-success" role="alert">
                {props.message}
            </div>

        );
    }

}

export { AlertSuccess };