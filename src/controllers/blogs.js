const Blog = require("../models/blog");

exports.showAll = async function (req, res) {
    const blogs = await Blog.findAll();

    res.success(blogs, "Blogs fetched successfully");
}

exports.view = async function (req, res) {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) res.error(blog, "Blog not found", 404);

    res.success(blog.toJson(), "Blog fetched successfully");
}

exports.create = async function (req, res) {
    const { name, description, image_url } = req.body;

    const blog = new Blog({ name, description, image_url });

    await blog.save();

    res.success(blog.toJson(), "Blog saved successfully");
}

exports.update = async function (req, res) {
    const { id } = req.params;
    const { name, description, image_url } = req.body;

    const updatedBlog = await Blog.updateById(id, {
        name, description, image_url
    })

    if (!updatedBlog) res.error(updatedBlog, "Blog not found", 404);

    res.success(updatedBlog, "Blog updated successfully");
}

exports.delete = async function (req, res) {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) res.error(blog, "Blog not found", 404);

    await blog.delete();

    res.success({}, "Blog deleted successfully");
}