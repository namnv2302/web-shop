import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';

function DefaultLayout({ children }) {
    return (
        <div className="">
            <Header />
            <div>{children}</div>
            <div className="mt-[100px]">
                <Footer />
            </div>
        </div>
    );
}

export default DefaultLayout;
