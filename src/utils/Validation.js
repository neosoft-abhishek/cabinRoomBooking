export const validateEmail = emailField => {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  var regNeoSoft = /^([A-Za-z0-9_\-\.])+\@(neosofttech|wwindia)+\.([A-Za-z]{2,4})$/;

  if (regNeoSoft.test(emailField) == false) {
  //  alert("Invalid Email Address");
    return false;
  }

  return true;
};

export const emptyString = (str, key)  => {
    if (!str || 0 === str.length){

        return false;
    }
    return true
}
