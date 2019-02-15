const carlo = require('carlo');

// [API](https://github.com/GoogleChromeLabs/carlo/blob/master/API.md)

(async () => {
  // Launch the browser.
  const app = await carlo.launch();

  // Terminate Node.js process on app window closing.
  app.on('exit', () => {
    process.exit();
  });

  // Tell carlo where your web files are located.
  app.serveFolder(`${__dirname}`);
  app.serveFolder(`${__dirname}/dist`);

  await app.exposeFunction('exit', () => {
    app.exit();
    process.exit();
  });

  // Expose 'env' function in the web environment.
  // await app.exposeFunction('env', _ => process.env);

  // Navigate to the main page of your app.
  await app.load('dist/index.html');
})();
