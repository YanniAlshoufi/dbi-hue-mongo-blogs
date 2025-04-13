import mongoose from "mongoose";

const blogCategorySchema = new mongoose.Schema({
    key: {
        type: String,
        enum: [
            "news", "fashion", "fitness", "diy", "infographics",
            "listicles", "case_studies", "interviews", "business", "romance", "other"
        ],
        unique: true,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
});

blogCategorySchema.index({key: 1});

export const BlogCategory = mongoose.model("BlogCategory", blogCategorySchema);

const contentElementSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["h1", "h2", "h3", "h4", "h5", "h6", "text", "image", "link"],
        required: true,
    },
    content: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
}, {_id: false});

const blogEntrySchema = new mongoose.Schema({
    title: {type: String, required: true},
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: "BlogUser", required: true},
    description: {type: String},
    categoryKey: {
        type: String,
        enum: [
            "news", "fashion", "fitness", "diy", "infographics",
            "listicles", "case_studies", "interviews", "business", "romance", "other"
        ],
        required: true,
    },
    createdAt: {type: Date, required: true},
    editedAt: {type: Date},
    impressionCount: {type: Number, default: 0},
    contentElements: [contentElementSchema],
    commentsAllowed: {type: Boolean, default: true},
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

blogEntrySchema.index({title: 1, authorId: 1}, {unique: true});
blogEntrySchema.index({categoryKey: 1});
blogEntrySchema.index({createdAt: -1});

export const BlogEntry = mongoose.model("BlogEntry", blogEntrySchema);

const blogUserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    rawPassword: {type: String, required: true},
});

blogUserSchema.index({username: 1});

export const BlogUser = mongoose.model("BlogUser", blogUserSchema);

const commentSchema = new mongoose.Schema({
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: "BlogEntry", required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "BlogUser", required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, required: true },
});

commentSchema.index({ blogId: 1, createdAt: -1 });

export const Comment = mongoose.model("Comment", commentSchema);
