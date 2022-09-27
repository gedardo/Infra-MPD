'use strict'

module.exports = {
    run: function(req, res) {
        req.app.response = res;
        req.app.dynamic.model.table = (req.app.dynamic.entities.find((entity)=>entity.name == req.url.split('/')[2].split('?')[0])).table;
        switch(req.method) {
            case 'GET':
                req.app.dynamic.model.getByParameters(req, function(data){
                    req.app.response.status(200).json(data);
                });
                break;
            case 'POST':
                req.app.dynamic.model.add(req, function(data){
                    req.app.response.status(200).json(data);
                });
                break;
            case 'PUT':
                req.app.dynamic.model.update(req, function(data){
                    req.app.response.status(200).json(data);
                });
                break;
            case 'DELETE':
                req.app.dynamic.model.delete(req, function(data){
                    req.app.response.status(200).json(data);
                });
                break;
        }
    }
}