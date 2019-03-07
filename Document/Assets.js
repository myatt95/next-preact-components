import { h, Component } from 'preact';
import { Head } from 'next/document';

export default class Assets extends Head {
    render() {
        const {
            head,
            styles,
            assetPrefix,
            __NEXT_DATA__,
        } = this.context._documentProps;
        const { _devOnlyInvalidateCacheQueryString } = this.context;
        const { page, buildId } = __NEXT_DATA__;

        let children = this.props.children;

        return (
            <>
                {children}
                {head}
                {page !== '/_error' && (
                    <link
                        rel="preload"
                        href={`${assetPrefix}/_next/static/${buildId}/pages${getPagePathname(
                            page
                        )}${_devOnlyInvalidateCacheQueryString}`}
                        as="script"
                        nonce={this.props.nonce}
                        crossOrigin={this.props.crossOrigin || process.crossOrigin}
                    />
                )}
                <link
                    rel="preload"
                    href={`${assetPrefix}/_next/static/${buildId}/pages/_app.js${_devOnlyInvalidateCacheQueryString}`}
                    as="script"
                    nonce={this.props.nonce}
                    crossOrigin={this.props.crossOrigin || process.crossOrigin}
                />
                {this.getPreloadDynamicChunks()}
                {this.getPreloadMainLinks()}
                {this.getCssLinks()}
                {styles || null}
            </>
        )
    }
}

function getPagePathname(page) {
    if (page === '/') {
        return '/index.js'
    }

    return `${page}.js`
}
