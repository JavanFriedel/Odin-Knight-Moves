function moveNode(pos, path) {
  // Validate if the proposed move is valid.
  if (pos[0] < 0 || pos[0] > 7 || pos[1] < 0 || pos[1] > 7) {
    return null;
  }

  return {
    pos,
    path,
  };
}

function knightMoves([x, y], [a, b]) {
  // Setup the Queue of Nodes to Check
  let queue = [moveNode([x, y], [[x, y]])];

  // Take the first element from the queue and add it to a temp value
  let currentNode = queue.shift();

  while (currentNode.pos[0] !== a || currentNode.pos[1] !== b) {
    // Generate All Possible Moves from the current position regardless of going off the board
    let possibleMoves = [
      [currentNode.pos[0] + 2, currentNode.pos[1] - 1],
      [currentNode.pos[0] + 2, currentNode.pos[1] + 1],
      [currentNode.pos[0] - 2, currentNode.pos[1] - 1],
      [currentNode.pos[0] - 2, currentNode.pos[1] + 1],
      [currentNode.pos[0] + 1, currentNode.pos[1] - 2],
      [currentNode.pos[0] + 1, currentNode.pos[1] + 2],
      [currentNode.pos[0] - 1, currentNode.pos[1] - 2],
      [currentNode.pos[0] - 1, currentNode.pos[1] + 2],
    ];

    // Iterate over all possible moves from the current square
    possibleMoves.forEach((move) => {
      // Generate a new node, which validates if it is a legal move
      let node = moveNode(move, currentNode.path.concat([move]));

      // Check if this move has been previously used along this path, if so return.
      if (currentNode.path.includes(move)) return;

      // If a node was returned, than it was a valid move
      if (node) {
        // Since it was a valid move, add it to the Queue to check valid moves from there.
        queue.push(node);
      }
    });

    // add the next node to the queue to check.
    currentNode = queue.shift();
  }

  // Compose output for console.
  let output = '';
  currentNode.path.forEach((e) => {
    output += `
    [${e[0]}, ${e[1]}]    `;
  });

  // Output Path
  console.log(
    `You made it in ${
      currentNode.path.length - 1
    } Moves! Here is your path: ${output}`
  );
}

knightMoves([3, 3], [4, 3]);
knightMoves([3, 3], [6, 6]);
knightMoves([3, 3], [3, 2]);
