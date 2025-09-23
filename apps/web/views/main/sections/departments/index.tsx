"use client";
import Body from './customs/body'
import DepartmentModal from './modals';
import { useDepartmentStore } from '@/stores/main/departments';

const Departments = () => {
    const { modal: { open } } = useDepartmentStore();
    return (
        <div className="p-4">
            <Body />
            {open && <DepartmentModal />}
        </div>
    )
}

export default Departments;  