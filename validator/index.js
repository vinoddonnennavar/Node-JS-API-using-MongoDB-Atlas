exports.createPostValidator = (req, res, next) => {
    //title
    req.check("title", "Title is required").notEmpty();
    req.check("title", "Title should be between 4 to 140 characters").isLength({
        min: 4,
        mar:150
    });
    //body
    req.check("body", "Body is required").notEmpty();
    req.check("body", "Body should be between 4 to 2000 characters").isLength({
        min: 4,
        mar:2000
    });
    //Check for errors
    const errors = req.validationErrors();
    // If error, Show the first error that encounters.
    if(errors){
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    //Proceed to next level
    next();
}