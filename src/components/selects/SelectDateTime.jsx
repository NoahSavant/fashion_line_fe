import { DatePicker } from "rsuite";
import { useEffect } from "react";

const SelectDateTime = ({ value, onChange, readOnly=false, placement ='topStart'}) => {
    return (
        <div className="flex flex-row items-center w-full">
            <DatePicker readOnly={readOnly} className="w-full" format="MM/dd/yyyy" value={value} onChange={onChange} placement={placement}/>
        </div>
    );
}
export default SelectDateTime
