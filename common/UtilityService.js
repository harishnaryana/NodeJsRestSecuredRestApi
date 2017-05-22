
module.exports = {
    getSlug : function(data){
        if(!data) return;
        return data.toLowerCase().split(' ').join('_');
    }
};