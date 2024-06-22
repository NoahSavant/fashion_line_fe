import { CheckPicker } from 'rsuite';

const MultiSelect = ({setStatuses, data, label, loading=false}) => {
    return (
        <div>
            <CheckPicker label={label + ' (' + data?.length + ')'} data={data} onSelect={(items) => setStatuses(items)} onClean={() => setStatuses([])} loading={loading}/>
        </div>
    );
}

export default MultiSelect
