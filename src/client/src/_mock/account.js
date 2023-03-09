
const randomNum = Math.floor(Math.random() * 25) + 1;
const account = {
  displayName: 'Eli Levy',
  email: 'EliLevy@gmail.com',
  photoURL: `/assets/images/avatars/avatar_${randomNum}.jpg`,
};

export default account;
