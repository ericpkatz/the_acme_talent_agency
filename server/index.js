const {
  client,
  createTables,
  createUser,
  createSkill,
  createUserSkill,
  fetchUsers,
  fetchSkills,
  fetchUserSkills,
  userUserSkill,
  deleteUserSkill
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

  const skills = await fetchSkills();
  console.log(skills);

  const userSkills = await Promise.all([
    createUserSkill({ user_id: moe.id, skill_id: plateSpinning.id}),
    createUserSkill({ user_id: moe.id, skill_id: juggling.id}),
    createUserSkill({ user_id: ethyl.id, skill_id: juggling.id}),
    createUserSkill({ user_id: lucy.id, skill_id: dancing.id}),
  ]);

  console.log(await fetchUserSkills(moe.id));
  await deleteUserSkill(userSkills[0].id);
  console.log(await fetchUserSkills(moe.id));
};

init();
