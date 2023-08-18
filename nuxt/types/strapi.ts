interface DateFields {
    createdAt: Date;
    publishedAt: Date;
    updatedAt: Date;
}

type ContentEntry<Attribute> = {
    id: number;
    attributes: Attribute;
};

export { ContentEntry, DateFields };