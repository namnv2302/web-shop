import Sidebar from './components/Sidebar';

function Admin() {
    return (
        <div className="flex items-center justify-center px-[50px]">
            <div className="container flex justify-center items-center">
                <div className="w-[20%]">
                    <Sidebar />
                </div>
                <div className="w-[80%] ml-[20px]">
                    <p>Content</p>
                </div>
            </div>
        </div>
    );
}

export default Admin;
