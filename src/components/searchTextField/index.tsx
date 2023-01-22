
import cn from 'classnames';
import { bool, oneOf, string } from 'prop-types';
import styles from './searchField.module.scss';

interface SearchTextFieldProps{

    label?:string,
    value?:string,
    placeholder?:string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    readonly?:boolean,
    autoFocus?:boolean,
    type?: string,
    fullWidth?:boolean,
    style?:React.CSSProperties,
    className?:string,
}


const SearchTextField: React.FC<SearchTextFieldProps>=({label,value,placeholder,onChange,readonly=false,type="text",fullWidth,style,className,autoFocus=false})=>{
    const grpClassName=cn([styles.inputbase,{[styles[`inputbase_fullwidth`]]:fullWidth}]);
    return <div className={grpClassName} style={style} >
        <input className={styles[`inputbase_input`]} autoFocus={autoFocus} value={value} type={type} onChange={onChange} placeholder={placeholder}  >
        </input>
    </div>
}

export default SearchTextField;

SearchTextField.propTypes={

    label:string,
    value:string,
    placeholder:string,
    readonly:bool,
    type: string,
    fullWidth:bool,
    autoFocus:bool,
    className:string,
}