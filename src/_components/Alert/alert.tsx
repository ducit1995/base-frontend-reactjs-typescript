import { alertConstants } from './../../_constants';
import { IAlertData } from './../../_reducers/Alert/types';
import { AlertError, AlertSuccess } from './';


type AlertType = {
    onComplete?: VoidFunction;
    notShowComplete?: boolean;
    notShowError?: boolean;
    alert: IAlertData;
};

function Alert(props: AlertType) {
    let onComplete = props.onComplete ? props.onComplete : () => { };
    let notShowComplete = props.notShowComplete ? props.notShowComplete : false;
    let notShowError = props.notShowError ? props.notShowError : false;
    return (
        props.alert.type === alertConstants.SUCCESS ? <AlertSuccess message={props.alert.message} onComplete={onComplete} notShowComplete={notShowComplete} /> : <AlertError message={props.alert.message} notShowError={notShowError} />
    );
}

export { Alert };