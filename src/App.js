import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment, Suspense } from 'react';
import DefaultLayout from '~/layouts/DefaultLayout';
import { publicRoutes } from '~/routes';
import AuthProvider from '~/services/provider/AuthProvider';
import ProductsProvider from './services/provider/ProductsProvider';

function App() {
    return (
        <div className="App">
            <Suspense fallback={<div>Loading</div>}>
                <Router>
                    <AuthProvider>
                        <ProductsProvider>
                            <Routes>
                                {publicRoutes.map((route, index) => {
                                    const Page = route.component;

                                    let Layout = DefaultLayout;
                                    if (route.layout === null) {
                                        Layout = Fragment;
                                    }

                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            }
                                        />
                                    );
                                })}
                            </Routes>
                        </ProductsProvider>
                    </AuthProvider>
                </Router>
            </Suspense>
        </div>
    );
}

export default App;
