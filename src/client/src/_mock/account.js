
const randomNum = Math.floor(Math.random() * 25) + 1;
const account = {
  displayName: 'Guest User',
  id: '000000000',
  password: '00000',  
  photoURL: `/assets/images/avatars/avatar_${randomNum}.jpg`,
};

export default account;
