import {ReactNode} from 'react';

const AuthLayout =({children}:{children:ReactNode})=>{
    return (
        <div className="auth-layout">{children}</div>
    )
}

export default AuthLayout;
// This is a simple React component that serves as a layout for a web application.