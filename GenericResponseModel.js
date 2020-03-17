

module.exports = class GenericResponseModel {
    constructor() {
        this.code = -1;
        this.message = "";
        this.status = "";
        this.data = {};
    }

}

/*
class GenericResponseModel{
    static status;
    code;
    message;
    data;
    constructor(){

    }
*/