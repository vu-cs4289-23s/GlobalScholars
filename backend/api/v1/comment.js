import { object, string } from "yup";

const Comment = (app) => {
    /**
     * Create a new comment
     *
     * @param {req.body.content} Content contents of comment
     * @param {req.body.parent} Parent post ID associated with comment
     * @return {201, {id: ID of new comment}} Return ID of new comment
     */
    app.post("/api/v1/comment", async (req, res) => {
        // Verify user is logged in
        if (!req.session.user)
            return res.status(401).send({ error: "unauthorized" });

        // Define Comment schema
        const schema = object({
            content: string().required().min(1).max(250),
            // parent: string().optional(),
        });

        // Validate request body
        let data;
        try {
            data = await schema.validate(await req.body);

            // Set up new comment
            let newComment = {
                owner: req.session.user._id,
                parent: data.parent,
                timestamp: Date.now(),
                content: data.content,
                likes: 0,
                dislikes: 0,
                saves: 0,
            };

            // Save post to model
            let comment = new app.models.Comment(newComment);

            try {
                await comment.save();
                const query = { $push: { comments: comment._id } };

                // Update User owner document
                await app.models.User.findByIdAndUpdate(req.session.user._id, query);
                // Update Post parent document
                await app.models.Post.findByIdAndUpdate(data.parent, query);

                // Success, send Comment back
                res.status(201).send(newComment);
            } catch (err) {
                console.log(`Comment.create save failure: ${err}`);
                res.status(400).send({ error: "failure creating comment" });
            }
        } catch (err) {
            console.log(err);
            const message = err.details[0].message;
            console.log(`Comment.create validation failure: ${message}`);
            res.status(400).send({ error: message });
        }
    });
};

export default Comment;