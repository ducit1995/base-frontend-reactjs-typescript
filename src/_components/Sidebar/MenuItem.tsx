type MenuItemType = {
    onClick?(): void;
    className?: string;
    icon?: string;
    pending?: number;
    title?: string;
    disable?: boolean;
    moon?: boolean;
    extral?: boolean;
};
function MenuItem(props: MenuItemType) {
    return (
        <div className={`menu-point-gr ${props.disable ? '' : 'cursor-pointer'} rounded-lg p-2.5 flex ${props.className ? props.className : ''}`} onClick={props.onClick}>
            <div className="centered-flex w-6">
                {props.icon &&
                    <img src={props.icon} alt="menu item" className="disable-select" />
                }
            </div>
            <div className={`flex-1 pl-3 items-center`}>
                {
                    props.title &&
                    <h2 className={`text-sm font-medium  text-left leading-6 disable-coppy ${props.disable ? 'text-white-20' : 'text-white'} line-clamp-1`}>{props.title}</h2>
                }
            </div>
            {
                props.moon &&
                <div className="flex items-center">
                    <div>
                        <img src="/images/icon/half-moon.svg" alt="moon" className="disable-select" />
                    </div>
                </div>
            }
            {
                props.extral &&
                <div className="flex items-center">
                    <div>
                        <img src="/images/icon/log-out.svg" alt="log out" className="disable-select" />
                    </div>
                </div>
            }
            {
                props.pending &&
                <span className="px-3 bg-0085E5 text-white rounded-full text-sm leading-6 ml-2">{props.pending}</span>
            }
        </div>
    );
}

export { MenuItem };