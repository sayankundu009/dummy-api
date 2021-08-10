const BlogController = require("../../controllers/blogs");
const router = require('express').Router();

/**
 * @swagger
 *   tags:
 *     name: Blogs
*/

/**
 * @swagger
 * /v1/api/blogs:
 *   get:
 *     tags: [Blogs]
 *     summary: Get all blogs
 *     responses:
 *       200:
 *         description: A list of blogs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/', BlogController.showAll);

/**
 * @swagger
 * /v1/api/blogs/{id}:
 *   get:
 *     tags: [Blogs]
 *     summary: Get a particular blog
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the blog to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of blogs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:id', BlogController.view);

/**
 * @swagger
 * /v1/api/blogs:
 *   post:
 *     tags: [Blogs]
 *     summary: Create blog
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "My amazing blog"
 *               description:
 *                 type: string
 *                 example: "Some amazing description for my blog"
 *               image_url:
 *                 type: string
 *                 example: ""
 *     responses:
 *       200:
 *         description: Created blog.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', BlogController.create);

/**
 * @swagger
 * /v1/api/blogs/{id}:
 *   put:
 *     tags: [Blogs]
 *     summary: Update blog
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the blog to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "My amazing blog"
 *               description:
 *                 type: string
 *                 example: "Some amazing description for my blog"
 *               image_url:
 *                 type: string
 *                 example: ""
 *     responses:
 *       200:
 *         description: Created blog.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.put('/:id', BlogController.update);

/**
 * @swagger
 * /v1/api/blogs/{id}:
 *   delete:
 *     tags: [Blogs]
 *     summary: Delete blog
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the blog to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Created blog.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/:id', BlogController.delete);

module.exports = router;

