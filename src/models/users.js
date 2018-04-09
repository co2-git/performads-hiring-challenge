import * as data from 'maeva';

const UserModel = data.model('users', {email: String, password: String});

export default UserModel;
