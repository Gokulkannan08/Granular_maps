
import cn from 'classnames';
import { bool, oneOf, string } from 'prop-types';
import styles from 'textField.module.scss';

interface TextFieldProps{
    variant?: "outlined"|"standard"|"filled",
    label?:string,
    value?:string,
    placeholder?:string,
    onChange?: ()=>void,
    readonly?:boolean,
    autoFocus?:boolean,
    type?: string,
    fullWidth?:boolean,
    style?:React.CSSProperties,
    className?:string,
}


const TextField: React.FC<TextFieldProps>=({variant="outlined",label,value,placeholder,onChange,readonly=false,type,fullWidth,style,className,autoFocus=false})=>{
    const grpClassName=cn([className,{[styles[`TextField_${variant}`]]:variant,[styles[`TextField_fullwidth`]]:fullWidth}]);
    return <div className={grpClassName} style={style} >
        {
            label && <label>
            {label}
        </label>
        }

        <input autoFocus={autoFocus} value={value} type={type} onChange={onChange} placeholder={placeholder} disabled={readonly} >
        </input>
    </div>
}

export default TextField;

TextField.propTypes={
    variant:oneOf(["outlined","standard","filled"]),
    label:string,
    value:string,
    placeholder:string,
    readonly:bool,
    type: string,
    fullWidth:bool,
    autoFocus:bool,
    className:string,

}