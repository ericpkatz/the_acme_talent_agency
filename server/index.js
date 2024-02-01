const {
  client,
  createTables,
  createUser,
  createSkill,
  fetchUsers
} = require('./db');


const init = async()=> {
  await client.connect();
  console.log('connected to database');
  await createTables();
  console.log('tables created');
  const [moe, lucy, ethyl, singing, dancing, juggling, plateSpinning] = await Promise.all([
    createUser({ username: 'moe', password: 's3cr3t' }),
    createUser({ username: 'lucy', password: 's3cr3t!!' }),
    createUser({ username: 'ethyl', password: 'shhh' }),
    createSkill({ name: 'singing'}),
    createSkill({ name: 'dancing'}),
    createSkill({ name: 'juggling'}),
    createSkill({ name: 'plate spinning'}),
  ]);
  const users = await fetchUsers();
  console.log(users);
};

init();
