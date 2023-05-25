import { Fragment } from 'react';

function OrderItem({ index, data }) {
    return (
        <Fragment>
            <tr className="border border-[#ebebeb] h-[68px]">
                <td className="text-[14px] text-center border border-[#ebebeb] p-[8px]">{index}</td>
                <td className="text-[14px] text-center border border-[#ebebeb] p-[8px]">{data.timeStamp[0]}</td>
                <td className="text-[14px] text-center border border-[#ebebeb] p-[8px]">Approved</td>
                <td className="text-[14px] text-center border border-[#ebebeb] p-[8px]">
                    {(Math.round(data.total * 100) / 100).toFixed(2)}
                </td>
                {/* <td className="text-[14px] text-center border border-[#ebebeb] p-[8px]">
                    <button className="px-[16px] py-[4px] bg-[#F6AB49] text-[#fff]">View</button>
                </td> */}
            </tr>
        </Fragment>
    );
}

export default OrderItem;
