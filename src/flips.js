
// returns a 2D array of 'height' rows x 'width' columns
// use arr.flat() to convert to 1D
function array2D(height, width) {
  return Array.from(Array(height), () => new Array(width));
}

// convenience function: sets the grid cell indicated by 'point'
// (an array of [r, c]) to the value 'val'
function set2D(grid, point, val) {
  grid[point[0]][point[1]] = val
}

// maps the values in the current puzzle grid to 'grid' using the given 'mappingFn'.
// 'mappingFn' must be a 2-argument function that accepts row and column indexes, and
// returns the corresponding coordinates in the grid in the form of an array [new_row, new_col].
function mapGrid(grid, mappingFn) {
  for (let r = 0; r < puzzle.size.height; ++r)
      for (let c = 0; c < puzzle.size.width; ++c)
        set2D(grid, mappingFn(r, c), puzzle.grid[r][c].isBlock ? '.' : puzzle.grid[r][c].char)  
}

function flipLR() {
  grid = array2D(puzzle.size.height, puzzle.size.width);
  mapGrid(grid, (r, c) => [r, puzzle.size.width - c - 1]);
  puzzle.createGrid(grid.flat());
}

function flipTB() {
  grid = array2D(puzzle.size.height, puzzle.size.width);
  mapGrid(grid, (r, c) => [puzzle.size.height - r - 1, c]);
  puzzle.createGrid(grid.flat());
}

function isSquare(puzzle) {
  return puzzle.size.width == puzzle.size.height;
}

function flipD2() {
  if (!isSquare(puzzle)) return "puzzle is not square!";
  grid = array2D(puzzle.size.height, puzzle.size.width);
  mapGrid(grid, (r, c) => [c, r]);
  puzzle.createGrid(grid.flat());
}

function flipD1() {
  if (!isSquare(puzzle)) return "puzzle is not square!";
  grid = array2D(puzzle.size.height, puzzle.size.width);
  mapGrid(grid, (r, c) => [puzzle.size.width - c - 1, puzzle.size.height - r - 1]);
  puzzle.createGrid(grid.flat());
}

function rotate90() {
  if (!isSquare(puzzle)) return "puzzle is not square!";
  grid = array2D(puzzle.size.height, puzzle.size.width);
  mapGrid(grid, (r, c) => [c, puzzle.size.height - r - 1]);
  puzzle.createGrid(grid.flat());
}

function rotate270() {
  if (!isSquare(puzzle)) return "puzzle is not square!";
  for (let i = 0; i < 3; ++i) rotate90();
}

function flipAcross() {
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

function flipDown() {
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

function flip(dir) {
  if (!FLIP_FNS.has(dir)) {
    console.log(`unknown flip spec: ${dir}!`);
    return;
  }
  var error = FLIP_FNS.get(dir)();
  if (error) {
    console.log(error);
  }
}