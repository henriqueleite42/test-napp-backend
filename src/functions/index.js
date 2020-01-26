module.exports = {

  /**
   *
   * Model Validation Functions
   *
   */

  validateProduct: info => {
    // Check if is Defined and Not Empty
    if (!info.sku)   return { status: false, msg: 'SKU is required'};
    if (!info.name)  return { status: false, msg: 'Name is required'};
    if (!info.price) return { status: false, msg: 'Price is required'};

    // Check Length And Values
    if (!info.sku.length.between(3, 20))   return { status: false, msg: 'SKU length must be between 3 and 20 characters'};
    if (!info.name.length.between(3, 100)) return { status: false, msg: 'Name length must be between 3 and 100 characters'};
    if (!info.price > 0)                   return { status: false, msg: 'Price must be greater than zero'};

    return { status:true }
  },

  validateCustomer: info => {
    // Check if is Defined and Not Empty
    if (!info.cpf)   return { status: false, msg: 'CPF is required'};
    if (!info.fname) return { status: false, msg: 'First Name is required'};
    if (!info.lname) return { status: false, msg: 'Last Name is required'};

    // Check Length
    if (info.cpf.length !== 11)            return { status: false, msg: 'CPF size must be 11 digits'};
    if (!info.fname.length.between(3, 50)) return { status: false, msg: 'First Name length must be between 3 and 50 characters'};
    if (!info.lname.length.between(3, 50)) return { status: false, msg: 'Last Name length must be between 3 and 50 characters'};

    // Check if CPF is Valid
    if (!this.checkCPF(info.cpf)) return { status: false, msg: 'Invalid CPF'};
  },

  /**
   *
   * General functions
   *
   */

  checkCPF: cpf => {
    let temp, count, total;

    temp = cpf.toString().substr(0,9);
    count = 10;
    total = 0;
    for (let number of temp) {
      total += (number*count);
      count--;
    }
    total = ((total*10)%11)
    if (total > 9) total = 0;
    if (total != cpf.toString().charAt(9)) {
      return false;
    }

    temp = cpf.toString().substr(0,10);
    count = 11;
    total = 0;
    for (let number of temp) {
      total += (number*count);
      count--;
    }
    total = ((total*10)%11)
    if (total > 9) total = 0;
    if (total != cpf.toString().charAt(10)) return false;

    return true;
  }
}