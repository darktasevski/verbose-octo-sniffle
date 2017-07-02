var inputBox = document.getElementById('input-box');
var nameList = document.getElementById('name-list');

const sendQueryStr = () => {
  if (inputBox.value === '') {
    nameList.innerHTML = '';
  }

  $.get(`/allUser?q=${inputBox.value}`,(data) => {
    nameList.innerHTML = '';

    data.forEach((user) => {
      let name = document.createElement('p')
      name.innerHTML = user;

      nameList.appendChild(name);
    })
  });
}

document.addEventListener('input', sendQueryStr)