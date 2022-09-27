'use strict';

module.exports = {
    response: function(req, code) {
        let errReponse = {status: false, error: true, description: ''}
        switch(code) {
            case 1:
                errReponse.description = 'Access Denied.';
            break;
            case 2:
                errReponse.description = 'Escalas_habilitadas.esc_codigo Exist.';
            break;
            default:
                errReponse.description = 'Error.';
        }
        req.app.response.json(errReponse);
    }
};