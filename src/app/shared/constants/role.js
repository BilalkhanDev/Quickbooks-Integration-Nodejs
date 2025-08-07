const USER_ROLES = {
  ADMIN: 1,
  USER: 2
};

const ROLE_NAMES = {
  1: 'ADMIN',
  2: 'USER'
};
// const FLEET_STATUS={
//     ACTIVE:1,
//     In_MAINTENANCE:2,
//     IN_ACTIVE:3
// }
Object.freeze(USER_ROLES);
Object.freeze(ROLE_NAMES);

module.exports = {
  USER_ROLES,
  ROLE_NAMES,

};