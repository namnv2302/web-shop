import Header from '~/layouts/components/Header';

function DefaultLayout({ children }) {
    return (
        <div className="">
            <Header />
            <div>{children}</div>
        </div>
    );
}

export default DefaultLayout;
