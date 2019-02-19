const carlo = require('carlo');
const path = require('path');

// [API](https://github.com/GoogleChromeLabs/carlo/blob/master/API.md)

export default async function() {
  // Launch the browser.
  const app = await carlo.launch();

  // Terminate Node.js process on app window closing.
  app.on('exit', () => {
    process.exit();
  });

  // Tell carlo where your web files are located.
  app.serveFolder(path.resolve(__dirname));
  app.serveFolder(path.resolve(__dirname, '..'));
  app.serveFolder(path.resolve(__dirname, '..', 'client'));

  await app.exposeFunction('exit', () => {
    app.exit();
    process.exit();
  });

  // Expose 'env' function in the web environment.
  // await app.exposeFunction('env', _ => process.env);

  // Navigate to the main page of your app.
  await app.load(path.resolve(__dirname, '..', 'client', 'index.html'));
}
