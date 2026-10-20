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



document.querySelector('#generate').addEventListener('click', generateName)

function generateName() {
    const questions = ['q1', 'q2', 'q3', 'q4', 'q5']

    const answers = questions.map(function(question) {
        const picked = document.querySelector('input[name="' + question + '"]:checked')
        return picked ? picked.value : ''
    })

    if (answers.includes('')) {
        document.querySelector('#result').innerText = 'Answer every question!'
        return
    }

    const group = names[mostPicked(answers)]
    const name = listTaker(group.first) + ' ' + listTaker(group.last)
    document.querySelector('#result').innerText = 'Welcome to Bikini Bottom, ' + name + '!'
}
