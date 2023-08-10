const User = require('../models/user');
const bcrypt = require('bcryptjs');

const jwt = require('../utils/jwt');

async function register(req, res) {
	const { firstname, lastname, email, password } = req.body;

	if (!email) res.status(400).send({ msg: 'El email es obligatorio' });
	if (!password) res.status(400).send({ msg: 'La contraseña es obligatorio' });

	const user = new User({
		firstname: firstname,
		lastname: lastname,
		email: email.toLowerCase(),
		password: password,
		active: false,
		role: 'user',
	});

	const salt = bcrypt.genSaltSync(10);
	const hashPasword = bcrypt.hashSync(password, salt);
	user.password = hashPasword;

	try {
		await user.save();
		res.status(200).send({ msg: 'Usuario guardado' });
	} catch (err) {
		res.status(500).send({ msg: `Error al crear el usuario: ${err}` });
	}
}

async function login(req, res) {
	const { email, password } = req.body;

	if (!email) return res.status(400).send({ msg: 'El email es obligatorio' });

	if (!password) res.status(400).send({ msg: 'La contraseña es obligatoria' });

	try {
		const user = await User.findOne({ email: email.toLowerCase() });
		const check = await bcrypt.compare(password, user.password);
		if (!check) {
			res.status(400).send({ msg: `Contraseña incorrecta` });
		} else if (!user.active) {
			res.status(401).send({ msg: `Usuario no autorizado o no activo` });
		} else {
			res.status(200).send({ access: jwt.createAccessToken(user) });
		}
	} catch (err) {
		res.status(500).send({ msg: `Error en el servidor` });
	}
}

module.exports = {
	register,
	login,
};
