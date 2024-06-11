import { useEffect, useState } from 'react';
import { useCategoriesViewModelContext } from '../presentation/contexts/CategoriesViewModelContext';

function useCategory(categoryID) {
    const { categories } = useCategoriesViewModelContext();
    const [category, setCategory] = useState({});

    useEffect(() => {
        const _category = categories.find(currCategory => currCategory.id === categoryID);
        if (_category) {
            setCategory(_category);
        } else {
            // TODO: HANDLE THIS
        }
    }, [categories, categoryID]);

    return category;
}

export default useCategory;
