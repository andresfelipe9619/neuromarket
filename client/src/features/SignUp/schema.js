import * as Yup from 'yup';

const registerUserValidationSchema = Yup.object().shape({
	name: Yup.string().required('Required'),
	email: Yup.string()
		.email()
		.required('Required'),
	password: Yup.string().required('Required').min(8),
	confirmPassword: Yup.string().when('password', {
		is: (val) => (val && val.length > 0 ? true : false),
		then: Yup.string().oneOf(
			[Yup.ref('password')],
			'Both passwords need to be the same'
		),
	}),
	phone: Yup.number(),
});

export default registerUserValidationSchema;
