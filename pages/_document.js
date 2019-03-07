// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import { h } from 'preact';
import Document, { Main } from 'next/document';
import Scripts from '../Document/Scripts';
import Assets from "../Document/Assets";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps }
    }

    render() {
        return (
            <>
                <Assets />
                <Main />
                <Scripts />
            </>
        )
    }
}

export default MyDocument
