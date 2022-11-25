import { convertNumber } from '~/utils/convertNumber';

function TotalTable({ total, onOrder }) {
    return (
        <div className="w-[50%] p-[16px] border border-[#ebebeb]">
            <h3 className="mb-[12px]">Cart Totals</h3>
            <table className="w-[100%]">
                <tbody>
                    <tr className="border border-[#ebebeb] h-[55px]">
                        <td className="text-[15px] w-[300px] font-semibold border border-[#ebebeb] p-[8px]">
                            Sub Total
                        </td>
                        <td className="text-[15px] w-[220px] font-semibold border border-[#ebebeb] p-[8px]">
                            {convertNumber(total)}
                        </td>
                    </tr>
                    <tr className="border border-[#ebebeb] h-[55px]">
                        <td className="text-[15px] w-[300px] font-semibold border border-[#ebebeb] p-[8px]">
                            Shipping
                        </td>
                        <td className="text-[15px] w-[220px] font-semibold border border-[#ebebeb] p-[8px]">0</td>
                    </tr>
                    <tr className="border border-[#ebebeb] h-[55px]">
                        <td className="text-[15px] w-[300px] font-semibold border border-[#ebebeb] p-[8px]">Total</td>
                        <td className="text-[15px] w-[220px] font-semibold border border-[#ebebeb] p-[8px]">
                            {convertNumber(total)}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="mt-[16px]">
                <button
                    onClick={onOrder}
                    className="px-[16px] py-[4px] text-[#fff] bg-[#F6AB49] rounded-[5px] cursor-pointer"
                >
                    Place Order
                </button>
            </div>
        </div>
    );
}

export default TotalTable;
