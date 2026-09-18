const publicCatalogFilter = (extra = {}, now = new Date()) => ({
    ...extra,
    $or: [
        { status: "published" },
        { status: { $exists: false } },
        { status: "scheduled", publishAt: { $lte: now } },
    ],
});

const isPubliclyAvailable = (product, now = new Date()) => (
    !product.status ||
    product.status === "published" ||
    (product.status === "scheduled" && product.publishAt && product.publishAt <= now)
);

const normalizePublishingInput = (input = {}) => {
    const output = { ...input };
    if (output.publishAt === "") output.publishAt = null;
    if (output.status === "scheduled" && output.publishAt) output.publishAt = new Date(output.publishAt);
    if (output.status === "published") output.publishedAt = new Date();
    return output;
};

const ensureUniqueSlug = async (Model, desiredSlug, excludeId = null) => {
    if (!desiredSlug) return desiredSlug;
    let candidate = desiredSlug;
    let suffix = 2;
    const baseQuery = excludeId ? { _id: { $ne: excludeId } } : {};
    while (await Model.exists({ ...baseQuery, slug: candidate })) {
        candidate = `${desiredSlug}-${suffix++}`;
    }
    return candidate;
};

module.exports = { publicCatalogFilter, isPubliclyAvailable, normalizePublishingInput, ensureUniqueSlug };
