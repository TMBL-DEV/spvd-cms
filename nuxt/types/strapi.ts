interface DateFields {
    createdAt: Date;
    updatedAt: Date;
}

interface ContentDateField {
    publishedAt: Date;
}

interface ImageFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    path: string | null;
    url: string;
}

interface ImageFormats {
    thumbnail: ImageFormat;
    large: ImageFormat;
    medium: ImageFormat;
    small: ImageFormat;
}

interface MediaData extends DateFields {
    alternativeText: string;
    caption: string;
    ext: string;
    formats: ImageFormats,
    hash: string;
    height: number;
    mime: string;
    name: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any; // You can replace `any` with a more specific type if available
    size: number;
    url: string;
    width: number;
}

type ContentEntry<Attribute> = {
    id: number;
    attributes: Attribute;
};

export { ContentEntry, DateFields, ContentDateField, MediaData };
