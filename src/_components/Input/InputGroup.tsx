
type IconType = {
    link: string;
    onClick: VoidFunction;
};

type InputGroupType = {
    titleReplace?: string;
    title: string;
    desc?: string;
    name: string;
    icon?: IconType;
    danger?: string;
    type?: string;
    className?: string;
    placeholder?: string;
    onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
};

function InputGroup(props: InputGroupType) {
    return (
        <div className={`input-group mb-6`}>
            {
                props.titleReplace ?
                    <div className="flex">
                        <p className="text-050B30 text-sm font-semibold text-left mb-2 md:hidden">{props.title}</p>
                        <p className="text-050B30 text-sm font-semibold text-left mb-2 hidden md:block">{props.titleReplace}</p>
                    </div>
                    :
                    <div className="flex">
                        <p className="text-050B30 flex-1 text-sm font-semibold text-left mb-2">{props.title}</p>
                        {props.desc &&
                            <span className="text-A9B2C7 text-sm font-semibold">{props.desc}</span>
                        }
                    </div>
            }
            <div className="relative">
                <input onChange={props.onChange} name={props.name} type={props.type ? props.type : 'text'} className={`h-12 border-2 text-050B30  border-solid font-semibold border-DDE7EE text-sm outline-none pl-4 box-border leading-11 rounded-lg w-full focus:border-2DCBF5  ${props.className ? props.className : ''} ${props.icon ? 'pr-10' : 'pr-4'} ${props.danger ? 'border-E95814' : ''}`} placeholder={props.placeholder ? props.placeholder : ''} />
                {
                    props.icon &&
                    <img src={props.icon.link} onClick={() => props.icon?.onClick ? props.icon?.onClick() : null} className="absolute top-4 right-4" alt="icon" />
                }
                {
                    props.danger &&
                    <p className="text-E95814 text-left font-normal text-xs my-1 md:text-sm">{props.danger}</p>
                }
            </div>
        </div>

    );
}

export { InputGroup };