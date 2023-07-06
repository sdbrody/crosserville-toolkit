var flipLR  = function() {
  grid = new Array(puzzle.size.width * puzzle.size.height);
  for (let irow = 0; irow < puzzle.size.height; irow++)
      for (let icol = 0; icol < puzzle.size.width; icol++)
          grid[irow * puzzle.size.width + (puzzle.size.width - icol - 1)] = puzzle.grid[irow][icol].isBlock ? '.' : puzzle.grid[irow][icol].char;
  puzzle.createGrid(grid);
}

var flipTB = function() {
  grid = new Array(puzzle.size.width * puzzle.size.height);
  for (let irow = 0; irow < puzzle.size.height; irow++)
      for (let icol = 0; icol < puzzle.size.width; icol++)
          grid[(puzzle.size.width - irow - 1) * puzzle.size.width + icol] = puzzle.grid[irow][icol].isBlock ? '.' : puzzle.grid[irow][icol].char;
  puzzle.createGrid(grid);
}

var isSquare = function(puzzle) {
  return puzzle.size.width == puzzle.size.height;
}

var flipD2 = function() {
  if (!isSquare(puzzle)) return "puzzle is not square!";
  grid = new Array(puzzle.size.width * puzzle.size.height);
  for (let irow = 0; irow < puzzle.size.height; irow++)
      for (let icol = 0; icol < puzzle.size.width; icol++)
          grid[icol * puzzle.size.width + irow] = puzzle.grid[irow][icol].isBlock ? '.' : puzzle.grid[irow][icol].char;
  puzzle.createGrid(grid);
}

var flipD1 = function() {
  if (!isSquare(puzzle)) return "puzzle is not square!";
  grid = new Array(puzzle.size.width * puzzle.size.height);
  for (let irow = 0; irow < puzzle.size.height; irow++)
      for (let icol = 0; icol < puzzle.size.width; icol++)
          grid[(puzzle.size.width - icol - 1) * puzzle.size.width + (puzzle.size.height - irow - 1)] = puzzle.grid[irow][icol].isBlock ? '.' : puzzle.grid[irow][icol].char;
  puzzle.createGrid(grid);
}

var rotate90 = function() {
  if (!isSquare(puzzle)) return "puzzle is not square!";
  grid = new Array(puzzle.size.width * puzzle.size.height);
  for (let irow = 0; irow < puzzle.size.height; irow++)
      for (let icol = 0; icol < puzzle.size.width; icol++)
          grid[icol * puzzle.size.width + (puzzle.size.width - irow - 1)] = puzzle.grid[irow][icol].isBlock ? '.' : puzzle.grid[irow][icol].char;
  puzzle.createGrid(grid);
}

var rotate270 = function() {
  if (!isSquare(puzzle)) return "puzzle is not square!";
  for (let i = 0; i < 3; ++i) rotate90();
}

var flipAcross = function() {
  grid = new Array(puzzle.size.width * puzzle.size.height);
  grid.fill('.');
  for (let i = 0; i < puzzle.acrossWords.length; ++i) {
    let entry = puzzle.acrossWords[i];
    for (let j = 0; j < entry.length; ++j) {
      grid[(entry.rowNum * puzzle.size.width) + entry.startColNum + j] = puzzle.grid[entry.rowNum][entry.startColNum + entry.length - j - 1].char;
    }
  }
  puzzle.createGrid(grid);
}

var flipDown = function() {
  grid = new Array(puzzle.size.width * puzzle.size.height);
  grid.fill('.');
  for (let i = 0; i < puzzle.downWords.length; ++i) {
    let entry = puzzle.downWords[i];
    for (let j = 0; j < entry.length; ++j) {
      grid[(entry.startRowNum + j) * puzzle.size.width + entry.colNum] = puzzle.grid[entry.startRowNum + entry.length - j -1][entry.colNum].char;
    }
  }
  puzzle.createGrid(grid);
}

const FLIP_FNS = new Map([
  ["LR", flipLR],
  ["TB", flipTB],
  ["D1", flipD1],
  ["D2", flipD2],
  ["R90", rotate90],
  ["R270", rotate270],
  ["A", flipAcross],
  ["D", flipDown]
]);

var flip = function(dir) {
  if (!FLIP_FNS.has(dir)) {
    console.log(`unknown flip spec: ${dir}!`);
    return;
  }
  var error = FLIP_FNS.get(dir)();
  if (error) {
    console.log(error);
  }
}