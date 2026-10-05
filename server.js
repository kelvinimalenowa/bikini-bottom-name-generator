const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');


const names = {
  a: {
    first: [
      'Bubbly',
      'Barnacle',
      'Jelly',
      'Coral',
      'Bubbles',
      'Randy',
      'Jeff',
      'Karl',
      'Edward',
      'Plank',
      'Sharon',
      'Sandy',
      'Gurt',
      'Larry',
      'Reggie',
      'Canadia',
      'Beachela',
      'Shelly',
      'Kelsey',
      'Reefa',
      'Pearl',
      'Gary',
      'Crabby',
      'Rocky',
      'Salty',
      'Sunny',
      'Krusty',
      'Finny',
      'Clammy',
      'Shrimpy',
      'Seaweed'
    ],
    last: [
      'Tentacles',
      'Fins',
      'Pants',
      'Gills',
      'Reef',
      'Cheeks',
      'Claws',
      'Shell',
      'Bubble',
      'Coral',
      'Kelp',
      'Lagoon',
      'Sand',
      'Seas',
      'Wave'
    ]
  },

  b: {
    first: [
      'Soggy',
      'Squishy',
      'Salty',
      'Kelp',
      'Wobbly',
      'Slimy',
      'Spongy',
      'Crusty',
      'Floppy',
      'Bouncy',
      'Drippy',
      'Fishy',
      'Goopy',
      'Sandy',
      'Splashy',
      'Wavy',
      'Funky',
      'Clammy',
      'Damp',
      'Mushy'
    ],
    last: [
      'Bubble',
      'Fish',
      'Flippers',
      'Bottom',
      'Clam',
      'Bucket',
      'Patty',
      'Rock',
      'Boat',
      'Anchor',
      'Shrimp',
      'Krab',
      'Sponge',
      'Squid',
      'Seaweed'
    ]
  },

  c: {
    first: [
      'Lazy',
      'Chill',
      'Sleepy',
      'Sandy',
      'Goofy',
      'Grumpy',
      'Happy',
      'Hungry',
      'Tiny',
      'Big',
      'Slow',
      'Sneaky',
      'Smelly',
      'Loopy',
      'Broke',
      'Lucky',
      'Wacky',
      'Moody',
      'Nervous',
      'Dizzy'
    ],
    last: [
      'Snail',
      'Shell',
      'Star',
      'Plankton',
      'Puff',
      'Lobster',
      'Jellyfish',
      'Krab',
      'Squid',
      'Sponge',
      'Minnow',
      'Seahorse',
      'Barnacle',
      'Starfish',
      'Guppy'
    ]
  }
}

function listTaker(list) {
  return list[Math.floor(Math.random() * list.length)]  //<-- randomizing a number
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
    res.end(JSON.stringify({ name: name }))
  }


  else if (page == '/css/style.css') {
    fs.readFile('css/style.css', function (err, data) {
      res.write(data);
      res.end();
    });
  }
  else if (page == '/img/bikini_bottom.jpg'){
    fs.readFile('img/bikini_bottom.jpg', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
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
