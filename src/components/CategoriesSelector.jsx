import React from 'react';

export default function CategoriesSelector({setValue}) {
    return <div>
        <label className="" htmlFor="categories">
            Category
        </label>
        <select
            className="w-full mt-2 h-12 text-sm border-gray-100 rounded-lg"
            id="categories"
            defaultValue={''}
            
            onClick={({target}) => setValue(target.value) }
        >
            <option value=""  disabled  hidden>
                Chose a Category
            </option>
            <option>PlayStation 4</option>
            <option>PlayStation 3</option>
            <option>Xbox 360</option>
            <option>Nintendo Switch</option>
        </select>
    </div>;
}