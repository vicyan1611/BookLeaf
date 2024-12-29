import { useEffect, useRef} from "react";

const Input = (props: any) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if(props.type === 'submit') {
            inputRef.current!.classList.add('cursor-pointer');
        }
    },[props.type])
    return (
        <input className="w-full px-2 py-2 rounded-lg border-2 focus:outline-none" ref={ inputRef } onChange={props.onChange} name={props.name} type={props.type} placeholder={props.placeholder} value={props.value} pattern={props.pattern} required />
    )
}

export default Input;