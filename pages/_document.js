// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Main, NextScript } from 'next/document';
import {Fragment} from "react";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps }
    }

    render() {
        return (
            <Fragment>
                <Main />
                <NextScript />
            </Fragment>
        )
    }
}

export default MyDocument
