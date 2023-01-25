const getPostalCodeFromQuery = (obj) => {
    let len = obj.length;
    let flag = 0;
    let postalCode = '00000';
    for(let i=0;i<len;i++) {
        obj[i].address_components.forEach(item => {
          if(item.types == 'postal_code'){
            postalCode = item.long_name;
            flag = 1;
          }  
        })
        if(flag == 1) {
            break;
        }
    }
    return postalCode;
}   

module.exports = {
  getPostalCodeFromQuery
}