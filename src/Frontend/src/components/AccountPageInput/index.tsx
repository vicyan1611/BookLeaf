const Input = (props: any) => {
    return (
        <input className="w-full px-2 py-2 rounded-lg border-2 focus:outline-none" type={props.type} placeholder={props.placeholder} value={props.value} pattern={props.pattern} required/>
    )
}

export default Input;