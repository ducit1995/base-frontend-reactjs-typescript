

type ButtonFullWType = {
    onClick?(): void;
    id?: string;
    className?: string;
    tooltipTitle?: string;
    iconDisable?: string;
    icon?: string;
    title: string;
};

function ButtonFullW(props:ButtonFullWType) {
	return (
		<button onClick={props.onClick} id={props.id ? props.id : ''} className={`h-12 leading-11 box-border text-center rounded-lg block relative  ${props.className ? props.className : ''} md:flex md:justify-center md:items-center`} data-tooltip={`${props.tooltipTitle ? props.tooltipTitle : ''}`}>
			{
				props.iconDisable ?
					<img src={props.iconDisable} className="absolute top-3 left-4 md:relative  md:top-0 md:left-0 md:mr-4" alt="icon" />
					:
					(props.icon &&
						<img src={props.icon} className="absolute top-3 left-4 md:relative  md:top-0 md:left-0 md:mr-4" alt="icon" />
					)

			}
			{props.title}
		</button>
	);
}

export { ButtonFullW };