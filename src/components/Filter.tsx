const Filter = ({onChange}: {onChange: (e:any) => void}) => {
    const options = ['ASC', 'DESC']
    return (
        <div>
            Sort by date_taken:{' '}
            <select onChange={onChange} className="border border-gray-900 rounded-sm mb-3">
                {options.map((opt, index) =>
                    <option key={`${opt}-${index}`} value={opt}>
                        {opt}
                    </option>
                )}
            </select>
        </div>
    )
}
export default Filter