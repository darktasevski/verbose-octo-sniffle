function authList(arr) {
  // your awesome code here

  for (let i = 0; i < arr.length; i += 1) {
    if ((arr[i].length < 6) && arr[i].length > 10)
      return false;
    else if (  !/[a-z]/.test(arr[i])    )
      return false;
    else if (!/[0-9]/.test(arr[i])   )
      return false;
    else if ( !/[a-z0-9]/.test(arr[i])  )
      return false;
    else
      return true;
  }
}



  Test.describe('fixed tests', _ => {
    const usernames1 = ['john123', 'alex222', 'sandra1'];
    const usernames2 = ['john123', 'alex222', 'sandraW'];
    const usernames3 = ['john_123', 'alex222', 'sandra1'];
    const usernames4 = [''];
    const usernames5 = ['123456'];
    const usernames6 = ['abcdef'];

    Test.assertEquals(authList(usernames1), true);
    Test.assertEquals(authList(usernames2), false);
    Test.assertEquals(authList(usernames3), false);
    Test.assertEquals(authList(usernames4), false);
    Test.assertEquals(authList(usernames5), false);
    Test.assertEquals(authList(usernames6), false);
  });
