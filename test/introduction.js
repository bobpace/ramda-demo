var R = require('ramda');
var testData = require('./data.json');

describe("ramda demo", () => {
  it("quick refresher on closures and currying", () => {
    //var addThree = (a) => (b) => (c) => a + b + c;
    var addThree = R.curry((a, b, c) => a + b + c);
    var hasOneNeedsTwoMore = addThree(1);
    hasOneNeedsTwoMore(2)(3).should.eql(6);
    addThree(1)(2)(3).should.eql(6);
    addThree(1, 2)(3).should.eql(6);
    addThree(1)(2, 3).should.eql(6);
    addThree(1, 2, 3).should.eql(6);
  });

  it("functional pipelines", () => {
    //f(g(x))
    //y=g(x)
    //z=f(y)

    var f = (x) => x + 1;
    var g = (x) => x * 5;

    f(g(1)).should.eql(6);
    g(f(1)).should.eql(10);

    R.compose(f, g)(1).should.eql(6);
    R.pipe(g, f)(1).should.eql(6);

    R.compose(g, f)(1).should.eql(10);
    R.pipe(f, g)(1).should.eql(10);

    var isEven = (x) => x % 2 === 0;
    var multiplyEvens = R.pipe(
      R.filter(isEven),
      R.reduce(R.multiply, 1)
    );

    multiplyEvens(R.range(1, 5)).should.eql(8);
  });

  describe("examples", () => {
    var isActive = R.propEq('isActive', true);
    var overThirty = R.pipe(
      R.prop('age'),
      (age) => age > 30
    );
    var activeOverThirty = R.pipe(
      R.filter(R.both(isActive, overThirty)),
      R.map(R.path(['name', 'first']))
    );

    it("first names of isActive=true and age > 30", () => {
      activeOverThirty(testData).should.eql(['Patterson']);
    });

    var excludedTags = [
      'proident'
    ];

    var isExcludedTag = (tag) => R.any(R.equals(tag), excludedTags);

    var filterExcludedTags = R.reject(
      R.pipe(
        R.prop('tags'),
        R.any(isExcludedTag)
      )
    );

    it("reject any with excluded tags", () => {
      filterExcludedTags(testData).length.should.eql(2);
    });

    var makeEmailHref = R.pipe(
      R.map(R.prop('email')),
      R.join(';'),
      R.concat('mailto:')
    );

    it("send an email to everybody", () => {
      var expectedResult = 'mailto:marcie.rollins@isosure.me;janie.donaldson@interloo.biz;rosanna.gonzales@turnabout.co.uk;patterson.compton@franscene.ca;deirdre.parrish@mantrix.biz';
      makeEmailHref(testData).should.eql(expectedResult);
    });

    var allPossibleSums = R.lift((a, b, c) => a + b + c);

    it("all possible sums", () => {
      var result =  allPossibleSums(
        [1, 2], //a's
        [4, 5], //b's
        [7, 8]  //c's
      );
      //example:
      //1 + 4 + 7
      //1 + 4 + 8
      //1 + 5 + 7
      //1 + 5 + 8
      //so on....
      result.should.eql([12, 13, 13, 14, 13, 14, 14, 15]);
    });
  });
});
