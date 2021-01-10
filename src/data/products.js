const faker = require("faker");
const _ = require("lodash");

module.exports = _.range(1, 21).map((value) => {
	return {
		name: faker.commerce.productName(),
		category: faker.commerce.product(),
		image: faker.image.avatar(),
		countInStock: faker.random.number(),
		price: faker.commerce.price(),
	};
});
