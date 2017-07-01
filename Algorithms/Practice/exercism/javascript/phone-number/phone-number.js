/**
 * Exercism
 * JavaScript Track
 * Problem 10: Phone Number
 * 
 * Solution by Aos
 * 5/31/2017
**/

const PhoneNumber = function(number) {
  // Remove non-numbers
  this.input = number.replace(/\D/g, '');
}

PhoneNumber.prototype.number = function() {
  let phone = this.input;
  // Check length:
  if (phone.length > 11 || phone.length < 10) {
    return '0000000000';
  }
  // Check first digit
  else if (phone.length === 11) {
    if (phone[0] !== '1') {
      return '0000000000';
    }
    else {
      // If 1, remove country code
      let phoneArray = phone.split('')
      phoneArray.shift()
      return phoneArray.join('');
    }
  }
  else {
    return phone;
  }
}

PhoneNumber.prototype.areaCode = function() {
  return this.input[0] + this.input[1] + this.input[2];
}

PhoneNumber.prototype.toString = function() {
  // Regex to capture groups, then reformat! ...literally magic...
  return this.input.replace(/(\d{3})(\d{3})(\d{4})/g, '($1) $2-$3')
}

module.exports = PhoneNumber;