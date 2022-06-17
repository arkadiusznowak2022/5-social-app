export function removeWhiteSpaces(text) {
  if (text.includes(' ')) {
    text = text.split(' ').join('');
  }
  return text;
}

export function checkPassword(pass) {
  let flag = false;
  const checkNum = new RegExp('[0-9]');
  const checkCapLet = new RegExp('[A-Z]');

  ['!', '#', '@', '$', '%'].forEach((symbol) => {
    if (pass.includes(symbol)) flag = true;
  });
  if (!checkNum.test(pass)) flag = false;
  if (!checkCapLet.test(pass)) flag = false;
  if (pass.length < 6) flag = false;

  return flag;
}

export const checkLoginTime = (timeToLogout) => {
  const storage = localStorage.getItem('chatterfield');
  if (!storage) return false;

  const loginTime = JSON.parse(storage).loginTime;
  const now = Date.now();
  const result = now - loginTime;
  console.log(result);
  if (result > timeToLogout) {
    localStorage.removeItem('chatterfield');
    console.log('off');
    return false;
  } else return true;
};
