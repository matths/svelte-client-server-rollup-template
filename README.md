
# svelte client server rollup template

This is my attempt of a project template for a [Svelte](https://svelte.dev) app as a client and a [Node.js](https://nodejs.org/) app a server. It lives at https://github.com/matths/svelte-client-server-rollup-template.

It is using [Rollup](https://rollupjs.org/) for both worlds, offering automatic server restart, http with ssl and live reload for the client app.

## Get started

Install the dependencies.

```bash
cd svelte-client-server-rollup-template
npm install
```

Create a self-signed certificate.

```bash
cd svelte-client-server-rollup-template
npm run create-ssl
```

Bundle both, the client and the server and run the server, delivering the client with a single command.

```bash
npm run dev
```

Navigate to [127.0.0.1:8000](http://127.0.0.1:8000). You should see a basic example app running. Edit a component file either in `src/client` or `src/server`, save it.
Because of livereload, you should see your changes immediately.

For the server, I currently use[sirv](https://github.com/lukeed/sirv), too, but as a middleware. So you can start writing your own server code as far as you still deliver your client app files as well.

