(function() {
  const NUM_ROWS = 20;
  const NUM_COLS = 20;
  const BG_GRAY = "\x1b[49m";
  const BG_WHITE = "\x1b[47m";
  const COLOR_MAP = {
    RESET: BG_GRAY,
    GREEN: "\x1b[32m",
    CYAN: "\x1b[36m",
    BLINK: "\x1b[5m",
    RED: "\x1b[31m",
    YELLOW: "\x1b[33m",
  };
  const symbols = {
    player: "X",
    border: "|",
    tile: "#",
    space: ".",
    newLine: "\n"
  };
  const charMap = {
    [symbols.player]: {
      char: symbols.player,
      color: COLOR_MAP.CYAN
    },
    [symbols.border]: {
      char: "|",
      color: COLOR_MAP.YELLOW
    },
    [symbols.space]: {
      char: symbols.space,
      color: COLOR_MAP.RED
    },
    [symbols.newLine]: {
      char: symbols.newLine,
      color: COLOR_MAP.RESET
    }
  };
  const moveMapProcedures = {
    left: function() {
      if (col > 1) col --;
    },
    right: function() {
      if (col < NUM_COLS - 1) col ++;
    },
    up: function() {
      if (row > 1) row --;
    },
    down: function() {
      if (row < NUM_ROWS - 1) row ++;
    }
  }

  let row = 1;
  let col = 1;

  console.log(COLOR_MAP.RESET); // set Terminal BG COLOR
  console.log(`${COLOR_MAP.RED} USE ARROW KEYS TO MOVE`);

  function buildMap(NUM_ROWS, NUM_COLS) {
    let str = "";

    for (let i = 0; i <= NUM_ROWS; i++) {
      for (let j = 0; j <= NUM_COLS; j++)
        if (i === 0 || j === 0 || j === NUM_COLS || i === NUM_ROWS)
          str += symbols.border; else str += symbols.space;
      str += "\n";
    }
    return str;
  }

  const put = function(row, col) {
    const index = (row * (NUM_COLS + 2)) + col;
    let str = "";

    for (let i = 0; i < map.length; i++) {
      // process.stdout.clearLine();
      if (i === index) {
        str += `${charMap[symbols.player].color}${charMap[symbols.player].char}`
      } else {
        const symbol = map[i];
        str += `${charMap[symbol].color}${charMap[symbol].char}`
      }
    }
    return str;
  }

  let map = buildMap(NUM_ROWS, NUM_COLS);

  const readline = require('readline');
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', (str, key) => {
      if (key.ctrl && key.name === 'c') {
        process.exit();
      } else {
        if (moveMapProcedures[key.name]) moveMapProcedures[key.name]();
    }
    let _map = put(row, col);
    console.clear();  // use this if you want to clear the whole Terminal
    // however, this will cause some blinking with big maps
    console.log(_map);
  });
})();