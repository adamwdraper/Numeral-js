var numeral = require('../../numeral'),
	language = 'en';

//All the tests are for en or en-US
exports.validate = {
	numbers: function(test) {
		var tests = [
			['1000', true],
			['1,000', true],
			['10,0,0', true],
			['10.123', true],
			['1,000.123', true],
			['1000,123.123', true],
			['1000 ', true],
			[' 1000 ', true],
			[' 1000', true],
			[' 1000,100.123', true],
			['1.0,00', false],
			['1.0.00', false],
			['1 000', false],
			['1.000,123', false],
			['1000.', false],
			['1000,', false],
			['10..00', false],			
			['10,,00', false],
			['10, 00', false]
		];
		test.expect(tests.length);
		for(var i=0; i<tests.length; i++){
			test.strictEqual(numeral.validate(tests[i][0], language), tests[i][1], tests[i][0]+' should validate to '+tests[i][1]);
		}
		test.done();
	},
	currency: function(test){
		var tests = [
			['$1000', true],
			['$1,000', true],
			['$10,0,0', true],
			['$10.123', true],
			['$1,000.123', true],
			['$1000 ', true],
			[' $1000 ', true],
			[' $1000', true],
			[' $1000,100.123', true],
			['$100.123k', true],
			['$100.123m', true],
			['$100.123b', true],
			['$100.123t', true],
			['100,456.123k', true],
			[' 100,456.123t ', true],
			['$1,00.123k', true],
			['%100', false],
			[' %1.0.00', false],
			[' ^1 000 ', false],
			['^1.000 ', false],
			['$ 1000.', false],
			['%1000', false],
			['100,456.123z', false],
			['$100$', false],
			['$100,213.456l', false],
			['aa100,213.456l', false],
			['$100,213.456kk', false]
		];
		test.expect(tests.length);
		for(var i=0; i<tests.length; i++){
			test.strictEqual(numeral.validate(tests[i][0], language), tests[i][1], tests[i][0]+' should validate to '+tests[i][1]);
		}
		test.done();
	}
};