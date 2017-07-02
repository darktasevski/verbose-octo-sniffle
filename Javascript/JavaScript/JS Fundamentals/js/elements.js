(function() {
  'use strict';

    // console.log(document.getElementById('mainHeading'));

  // console.log(document.getElementsByClassName('heading'));
    //returns a node LIST (like an array)

  // console.log(document.getElementsByTagName('header'));

  var mainHeading = document.getElementById('mainHeading');
  var subHeading = document.getElementsByClassName('heading')[1];

  console.log(mainHeading.id);
  console.log(subHeading.id);   //returns empty string

  mainHeading.id = 'firstHeading';
  console.log(mainHeading.id);
  console.log(document.getElementById('firstHeading'));

  console.log(subHeading.className);    //heading subHeading

  console.log(subHeading.classList);
  //["heading", "subHeading", value: "heading subHeading"]
  subHeading.classList.add('special');
  subHeading.classList.remove('special');
  console.log(subHeading.classList.contains('subHeading'));

  console.log(mainHeading.tagName);   //H1    capitalized

  console.log(mainHeading.nodeType);    //1
  console.log(mainHeading.childNodes[0].nodeType);  //3

  mainHeading.innerHTML = '<span>' + mainHeading.innerHTML + '</span>';
  mainHeading.outerHTML = '<p>' + mainHeading.innerHTML + '</p>';

  subHeading.textContent = 'this is a textContent';
  subHeading.setAttribute('contenteditable', true);
  subHeading.removeAttribute('contenteditable');
  console.log(subHeading.hasAttribute('contenteditable'));


}());
