const http = require('http'),
  url = require('url'),
  axios = require('axios');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;
  console.log('REQUEST GOT:');
  console.log(`${query.method} ${query.url}`);
  // console.log(req.rawHeaders);
  // console.log(req);

  const httpOptions = {
	  proxy: {
		  host: '172.16.0.1',
		  port: 3128,
		  auth: {
			  username: 'proxy_user',
			  password: 'proxy_user_passwd'
		  }
	  }
  };

  let promise;

  if (query.method == 'GET') {
    promise = axios.get(query.url, httpOptions);
  } else {
    console.log(`${query.method} method isn't supported yet.`);
    res.end(`${query.method} method isn't supported yet.`);
    return;
  }

  promise.then((resp) => {
    console.log('RESPONSE:');
    console.log(`${resp.status} ${resp.statusText}`);
    console.log(resp.headers);
    console.log(resp.data);
    // console.log(resp);
    res.end(resp.data)
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

