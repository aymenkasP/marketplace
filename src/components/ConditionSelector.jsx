import React from 'react';

export default function ConditionSelector({setValue}) {
    return <div>
        <label className="" htmlFor="condition">
            Condition
        </label>
        <select
            className="w-full mt-2 h-12 text-sm border-gray-100 rounded-lg"
            id="condition"
            defaultValue={'DEFAULT'}
            onClick={({target}) => setValue(target.value) }
        >
            <option value="DEFAULT"  disabled  hidden>
                Product Condition
            </option>
            <option>New</option>
            <option>Used</option>
        </select>
    </div>;
}