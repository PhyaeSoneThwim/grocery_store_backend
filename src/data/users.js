const faker = require("faker");
const _ = require("lodash");
const roles = require("./roles");

module.exports = _.range(1, 11).map((value) => {
	const password = faker.internet.password();
	const role = roles[_.random(0, 2)];
	return {
		name: faker.name.findName(),
		email: faker.internet.email(),
		password: password,
		confirmPassword: password,
		role: role,
	};
});
