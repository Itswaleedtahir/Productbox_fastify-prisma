const app = require("fastify")({
  logger: true,
});
app.register(require("@fastify/mysql"), {
  connectionString: "mysql://root@localhost/test",
});

const cont = require('./controller/user')

const blogRoutes = require('./routes/user')
blogRoutes.forEach((route, index) => {
    app.route(route)
})

app.listen(3000, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log("Server listening on ", address);
});
