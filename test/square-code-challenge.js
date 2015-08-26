var R = require('ramda');

//http://users.csc.calpoly.edu/~jdalbey/103/Projects/ProgrammingPractice.html
//One classic method for composing secret messages is called a square code.
//The spaces are removed from the english text and the characters are written into a square (or rectangle).
//For example, the sentence "If man was meant to stay on the ground, God would have given us roots."
//is 54 characters long, so it is written into a rectangle with 7 rows and 8 columnSize.

//ifmanwas
//meanttos
//tayonthe
//groundgo
//dwouldha
//vegivenu
//sroots

//The coded message is obtained by reading down the columns going left to right.
//For example, the message above is coded as:

//imtgdvs fearwer mayoogo anouuio ntnnlvt wttddes aohghn sseoau
describe("square code challenge", () => {
  var inputs = [
    'If man was meant to stay on the ground, God would have given us roots.',
    'Have a nice day!',
    'Feed the dog.',
    'CHILL OUT!!!'
  ];

  var outputs = [
    'imtgdvs fearwer mayoogo anouuio ntnnlvt wttddes aohghn sseoau',
    'hae and via ecy',
    'fto ehg ee dd',
    'cl ho iu lt'
  ];

  var cleanInput = R.identity;

  it("clean input", () => {
    cleanInput('HELLO!!  ...,,').should.eql('hello');
  });

  //Hint:
  //rows = floor of square root of length
  //columns = ceiling of length / rows
  var determineNumberOfColumns = R.identity;

  it("determine number of columns", () => {
    var checkColumns = R.map(R.pipe(cleanInput, determineNumberOfColumns));
    checkColumns(inputs).should.eql([8, 4, 4, 4]);
  });

  var turnIntoSquare = R.always(R.identity);

  it("turn input into square", () => {
    var input = 'haveaniceday';
    turnIntoSquare(4)(input).should.eql([
      'have',
      'anic',
      'eday'
    ]);
  });

  var fillSquare = R.always(R.identity);

  it("fill in spaces for any uneven rows", () => {
    var squareWithUnevenRows = [
      'feed',
      'thed',
      'og'
    ];
    fillSquare(4)(squareWithUnevenRows).should.eql([
      'feed',
      'thed',
      'og  '
    ]);
  });

  var transposeSquare = R.identity;

  it("transpose a square", () => {
    var square = [
      'have',
      'anic',
      'eday'
    ];

    transposeSquare(square).should.eql([
      'hae',
      'and',
      'via',
      'ecy'
    ]);
  });


  it("tranpose an uneven rows square", () => {
    var square = [
      'feed',
      'thed',
      'og'
    ];

    R.pipe(fillSquare(4), transposeSquare)(square).should.eql([
      'fto',
      'ehg',
      'ee',
      'dd'
    ]);
  });

  var encode = R.identity;

  it("encode inputs", () => {
    R.map(encode, inputs).should.eql(outputs);
  });

  var decode = R.identity;

  it("decode outputs", () => {
    R.map(decode, outputs).should.eql([
      'ifmanwas meanttos tayonthe groundgo dwouldha vegivenu sroots',
      'have anic eday',
      'feed thed og',
      'chil lout'
    ]);
  });
});
