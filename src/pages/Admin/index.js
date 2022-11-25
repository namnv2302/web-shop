import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TableProduct from './components/TableProduct';
import ModalAddProduct from './components/ModalAddProduct';

function Admin() {
    const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);

    return (
        <div className="">
            <Header />
            <div className="flex justify-between">
                <div className="w-[250px] h-[calc(100vh-64px)] shadow-[1px_0_20px_rgba(0,0,0,0.08)]">
                    <Sidebar />
                </div>
                <div className="flex-1 pl-[20px] pr-[31px] pt-[20px] bg-[#eef5f9]">
                    <h4 className="text-[#3e5569] text-[18px] font-semibold mb-[30px]">Product</h4>
                    <div>
                        <button
                            onClick={() => setIsOpenModalCreate(true)}
                            className="w-[180px] h-[40px] px-[10px] py-[4px] mb-[20px] text-[14px] text-[#000] rounded-[2px] border"
                        >
                            <FontAwesomeIcon icon={faSquarePlus} />
                            <span className="ml-[10px]">Create product</span>
                        </button>
                    </div>
                    <TableProduct itemsPerPage={5} />
                </div>
            </div>
            {isOpenModalCreate && <ModalAddProduct setIsOpenModalCreate={setIsOpenModalCreate} />}
        </div>
    );
}

export default Admin;
