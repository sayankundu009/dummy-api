const Model = require('./../db/model');

module.exports =  class Blog extends Model {
    constructor(props) {
        super(props);
    }

   static modelName = 'blog';
}