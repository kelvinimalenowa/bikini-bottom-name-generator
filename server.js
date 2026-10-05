const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');



const names = {
  a: {
    first: [
      'kat', 'kyle', 'kevin', 'kayden', 'karl', 'kameron', 'kaydence', 'korp'
    ],
    last: [
      'gina', 'gerry', 'george', 'gervin', 'grake', 'gorp'
    ]
  },
  b: {
    first: [
      'vat', 'vyle', 'vevin', 'vayden', 'varl', 'vameron', 'vaydence', 'vorp'
    ],
    last: [
      'hina', 'herry', 'heorge', 'hervin', 'hrake', 'horp'
    ]
  },
  c: {
    first: [
      'kat', 'kyle', 'kevin', 'kayden', 'karl', 'kameron', 'kaydence', 'korp'
    ],
    last: [
      'gina', 'gerry', 'george', 'gervin', 'grake', 'gorp'
    ]
  },
  d: {
    first: [
      'vat', 'vyle', 'vevin', 'vayden', 'varl', 'vameron', 'vaydence', 'vorp'
    ],
    last: [
      'hina', 'herry', 'heorge', 'hervin', 'hrake', 'horp'
    ]
  },
}

function listTaker(list) {
  return listTaker[Math.floor(Math.random() * list.length)]  //<-- randomizing a number
}


function mostPicked(answered) {
  const counts = {
    a: 0,
    b: 0,
    c: 0
  };
  answered.forEach(function (answer) {
    if (counts[answer] !== undefined) {
      counts[answer] += 1
    }
  });
  let winner = 'a'
  if (counts.b > counts[winner]) winner = 'b'
  if (counts.c > counts[winner]) winner = 'c'
  return winner
}


const server = http.createServer(function (req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);

  if (page == '/') {
    fs.readFile('index.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  }


  else if (page == '/api') {
    const answer = [params.q1, params.q2, params.q3, params.q4, params.q5]
    const letter = mostPicked(answer)
    const group = names[letter]
    const name = listTaker(group.first) + ' ' + listTaker(group.last)

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({name: name}))
  }


  else if (page == '/css/style.css') {
    fs.readFile('css/style.css', function (err, data) {
      res.write(data);
      res.end();
    });
  }
  else if (page == '/js/main.js') {
    fs.readFile('js/main.js', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.write(data);
      res.end();
    });
  }
  else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(8000);
