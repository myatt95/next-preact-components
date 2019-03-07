import { h } from 'preact';
import { NextScript } from 'next/document';
import {
    CLIENT_STATIC_FILES_RUNTIME_AMP,
    CLIENT_STATIC_FILES_RUNTIME_WEBPACK,
} from 'next-server/constants';

export default class Scripts extends NextScript {
    render() {
        const {
            staticMarkup,
            assetPrefix,
            devFiles,
            __NEXT_DATA__,
        } = this.context._documentProps;
        const { _devOnlyInvalidateCacheQueryString } = this.context;

        const { page, buildId } = __NEXT_DATA__;

        return (
            <span>
                {devFiles
                    ? devFiles.map(file => (
                        <script
                            key={file}
                            src={`${assetPrefix}/_next/${file}${_devOnlyInvalidateCacheQueryString}`}
                            nonce={this.props.nonce}
                            crossOrigin={this.props.crossOrigin || process.crossOrigin}
                        />
                    ))
                    : null}
                {staticMarkup ? null : (
                    <script
                        id="__NEXT_DATA__"
                        type="application/json"
                        nonce={this.props.nonce}
                        crossOrigin={this.props.crossOrigin || process.crossOrigin}
                        dangerouslySetInnerHTML={{
                            __html: Scripts.getInlineScriptSource(
                                this.context._documentProps
                            ),
                        }}
                    />
                )}
                {page !== '/_error' && (
                    <script
                        async
                        id={`__NEXT_PAGE__${page}`}
                        src={`${assetPrefix}/_next/static/${buildId}/pages${getPagePathname(
                            page
                        )}${_devOnlyInvalidateCacheQueryString}`}
                        nonce={this.props.nonce}
                        crossOrigin={this.props.crossOrigin || process.crossOrigin}
                    />
                )}
                <script
                    async
                    id={`__NEXT_PAGE__/_app`}
                    src={`${assetPrefix}/_next/static/${buildId}/pages/_app.js${_devOnlyInvalidateCacheQueryString}`}
                    nonce={this.props.nonce}
                    crossOrigin={this.props.crossOrigin || process.crossOrigin}
                />
                {staticMarkup ? null : this.getDynamicChunks()}
                {staticMarkup ? null : this.getScripts()}
            </span>
        )
    }
}

function getPagePathname(page) {
    if (page === '/') {
        return '/index.js'
    }

    return `${page}.js`
}
