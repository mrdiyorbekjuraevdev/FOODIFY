"use client";
import Body from './customs/body'
import CategoryModal from './modals';
import { useCategoryStore } from '@/stores/main/categories';

const Categories = () => {
    const { modal: { open } } = useCategoryStore();
    return (
        <div className="p-4">
            <Body />
            {open && <CategoryModal />}
        </div>
    )
}

export default Categories;