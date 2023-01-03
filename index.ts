import http from 'http';
import fs from 'fs/promises';
import path from 'path';

const server = http.createServer();

const getHtmlFile = async (url: string) => {
  switch (url) {
    case '/':
      return fs.readFile(path.join(__dirname, 'views', 'index.html'), 'utf-8');

    case '/about':
      return fs.readFile(path.join(__dirname, 'views', 'about.html'), 'utf-8');

    case '/contact-me':
      return fs.readFile(
        path.join(__dirname, 'views', 'contact-me.html'),
        'utf-8',
      );
    default:
      return fs.readFile(path.join(__dirname, 'views', '404.html'), 'utf-8');
  }
};

server.on('request', async (req, res) => {
  const url = req.url as string;
  if (url === '/style.css') {
    const css = await fs.readFile(
      path.join(__dirname, 'public', 'style.css'),
      'utf-8',
    );
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.end(css);
    return;
  }

  const html = await getHtmlFile(url);

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
