import winston from 'winston';

const appLogger = winston.loggers.get('application');

export default (CoffeeShop) => {
  CoffeeShop.validatesPresenceOf('name', 'city');
  CoffeeShop.validatesLengthOf('name', {min: 5, message: {min: 'Name is too short'}});

  CoffeeShop.getName = (shopId, cb) => {
    CoffeeShop.findById(shopId, (err, instance) => {
      let response = `Name of coffee shop is ${instance.name}`;
      cb(null, response);
      appLogger.info(response);
    });
  };

  CoffeeShop.remoteMethod(
        'getName', {
          http: {path: '/getname/:id', verb: 'get'},
          accepts: {arg: 'id', type: 'number', http: {source: 'path'}},
          returns: {arg: 'name', type: 'string'}
        }
    );
};
