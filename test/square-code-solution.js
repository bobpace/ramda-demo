var R = require('ramda');

var cleanInput = R.pipe(R.toLower, R.replace(/[\s.,!]/g, ''));

var determineNumberOfColumns = (input) => {
  var length = R.length(input);
  var columnSizeFor = R.pipe(
    Math.sqrt,
    Math.floor,
    R.divide(length),
    Math.ceil
  );
  return columnSizeFor(length);
};

var turnIntoSquare = (columns) => R.splitEvery(columns);

var fillSquare = (columns) => R.map(
  R.ifElse(
    R.pipe(R.length, R.equals(columns)),
    R.identity,
    (row) => {
      var fillInSpaces = R.pipe(
        R.length,
        R.subtract(columns),
        R.times(R.always(' ')),
        R.concat(row),
        R.join('')
      );
      return fillInSpaces(row);
    }
  )
);

var transposeSquare = R.converge(
  R.reduce((acc, row) => {
    var zipWithAcc = R.pipe(
      R.zip(acc),
      R.map(R.pipe(R.flatten, R.join(''), R.trim))
    );
    return zipWithAcc(row);
  }),
  R.pipe(R.head, R.map(R.of)),
  R.tail
);

var encode = (input) => {
  var cleanedInput = cleanInput(input);
  var columns = determineNumberOfColumns(cleanedInput);
  var encodeInput = R.pipe(
    turnIntoSquare(columns),
    fillSquare(columns),
    transposeSquare,
    R.join(' ')
  );
  return encodeInput(cleanedInput);
};

var decode = R.pipe(
  R.split(' '),
  R.converge(
    R.call,
    R.pipe(R.head, R.length, fillSquare),
    R.identity
  ),
  transposeSquare,
  R.join(' ')
);

module.exports = {
  cleanInput,
  determineNumberOfColumns,
  turnIntoSquare,
  fillSquare,
  transposeSquare,
  encode,
  decode
};
