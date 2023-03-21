import {
    createL2ManifestStore
} from 'c2pa';
import 'c2pa-wc/dist/components/Icon';
import 'c2pa-wc/dist/components/Indicator';
import 'c2pa-wc/dist/components/ManifestSummary';
import 'c2pa-wc/dist/components/PanelSection';
import 'c2pa-wc/dist/components/Popover';
import { useEffect, useRef, useState } from 'react';

function C2paImage({ imageUrl, provenance, viewMoreUrl }) {
    const [manifestStore, setManifestStore] = useState(null);
    const summaryRef = useRef();

    useEffect(() => {
        let disposeFn = () => { };

        if (!provenance.manifestStore?.activeManifest) {
            return;
        }

        createL2ManifestStore(provenance.manifestStore).then(
            ({ manifestStore, dispose }) => {
                setManifestStore(manifestStore);
                disposeFn = dispose;
            },
        );

        return disposeFn;
    }, [provenance.manifestStore?.activeManifest]);

    useEffect(() => {
        const summaryElement = summaryRef.current;
        if (summaryElement && manifestStore) {
            summaryElement.manifestStore = manifestStore;
            summaryElement.viewMoreUrl = viewMoreUrl;
        }
    }, [summaryRef, manifestStore]);

    return (
        <div className="web-components">
            <div className="wrapper">
                <img src={imageUrl} />
                {manifestStore ? (
                    <div>
                        <cai-popover interactive class="theme-spectrum">
                            <cai-indicator slot="trigger"></cai-indicator>
                            <cai-manifest-summary
                                ref={summaryRef}
                                slot="content"
                                className="theme-spectrum"
                            ></cai-manifest-summary>
                        </cai-popover>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default C2paImage;
