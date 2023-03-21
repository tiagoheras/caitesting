import React from 'react';
import C2paImage from './C2paImage';
import { useC2pa } from '@contentauth/react';
import { generateVerifyUrl } from 'c2pa';


function ImageContainer({ sampleImageUrl }) {

    const provenance = useC2pa(sampleImageUrl);
    const viewMoreUrl = generateVerifyUrl(sampleImageUrl);

    return (
        <div>
            {provenance?.manifestStore ? (
                <div>
                    <C2paImage
                        imageUrl={sampleImageUrl}
                        provenance={provenance}
                        viewMoreUrl={viewMoreUrl}
                    />
                </div>
            ) : null}
        </div>
    );
}

export default ImageContainer;