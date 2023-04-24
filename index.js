/**
 * This is the main Node.js server script for your project
 * Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
 */

const path = require("path");
const vntk = require("vntk");
const tokenizer = vntk.wordTokenizer();

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
    // Set this to true for detailed logging:
    logger: false,
});
fastify.register(require("@fastify/cors"), (instance) => {
    return (req, callback) => {
        const corsOptions = {
            // This is NOT recommended for production as it enables reflection exploits
            origin: true,
        };
        // callback expects two parameters: error and options
        callback(null, corsOptions);
    };
});

// Setup our static files
// Formbody lets us parse incoming forms

// View is a templating manager for fastify

fastify.post("/tokenizer", (request, reply) => {
    const text = request.body.text;
    const result = tokenizer.tag(text, "text");
    reply.send(result);
});
fastify.get("/hehe", (request, reply) => {
    reply.send("hehehehehhehehe");
});
// Run the server and report out to the logs
fastify.listen(
    { port: process.env.PORT || 3001, host: "localhost" },
    function (err, address) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Your app is listening on ${address}`);
    }
);
