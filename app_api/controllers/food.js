var mongoose = require('mongoose');
var modelFood = mongoose.model('food');
  
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

  /* GET Food By Id*/
  module.exports.foodById = function(req, res) {
    if (req.params.id){
        modelFood.find({'_id': req.params.id}, function (err, food) {
            if (err) {
                return sendJSONresponse(res, 400, err);
            }
            return sendJSONresponse(res, 200, food);
          })
    }else{
        return sendJSONresponse(res, 404, {"message": "Id Not Found."})
    }    
  };

/* GET Food */
module.exports.get_food = function(req, res) {
    modelFood.find({}, function (err, food) {
        if (err) return sendJSONresponse(res, 400, err);
        return sendJSONresponse(res, 200, food);
      })
  };

// Post Method
module.exports.post_food = function(req, res){
    if (req.body.name){
        // Check For Date
        if (req.body.date){
            if (req.body.quantity && req.body.quantity >= 1){
                modelFood.create(req.body ,function(err, food) {
                    if (err) {
                      return sendJSONresponse(res, 400, err);
                    } else {
                      return sendJSONresponse(res, 201, food);
                    }
                  });
            }else{
                return sendJSONresponse(res, 404, {"message": "Quantity is Invalid."});
            }    
        }else{
            sendJSONresponse(res, 404, {"message": "Date is required."});
        }    
    }else{
        sendJSONresponse(res, 404, {"message": "Name is required."});
    }
};

/* PUT Method*/
module.exports.put_food = function(req, res) {
    if (req.params.id){
        modelFood
            .findById(req.params.id)
            .exec(function(err, food){
                if (err){
                    return sendJSONresponse(res, 404, err);
                }else{
                    if (food){
                        food.name = req.body.name;
                        food.date = req.body.date;
                        food.expiry = req.body.expiry;
                        food.left_overs = req.body.left_overs;
                        food.quantity = req.body.quantity;
                        food.save(function(err, food){
                            if (err){
                                return sendJSONresponse(res, 404, err);
                            }else{
                                return sendJSONresponse(res, 200, food);
                            }
                        });         
                    }else{
                        return sendJSONresponse(res, 404, {"message": "Food Item was Not Updated."});
                    }
                }
            });
    }
    else {
        return sendJSONresponse(res, 404, {"message": "Id Not Found"});
    }
  };

/* DELETE */
module.exports.foodDelete = function(req, res) {
    if (req.params.id){
        modelFood
            .findById(req.params.id)
            .exec(function(err, food){
                if (err){
                    return sendJSONresponse(res, 404, err);
                }else{
                    if (food){
                        if (food.quantity > 1){
                            food.quantity = food.quantity - 1;
                            food.save(function(err, food){
                                if (err){
                                    return sendJSONresponse(res, 404, err);
                                }else{
                                    return sendJSONresponse(res, 200, food);
                                }
                            });
                        }else{
                            food.remove({"_id": req.params.id}, function(err, result){
                                if(err){
                                    return sendJSONresponse(res, 404, err);
                                }else{
                                    return sendJSONresponse(res, 204, null);
                                }
                            });
                        }
                    }else{
                        return sendJSONresponse(res, 404, {"message": "Item Not Found"});
                    }
                }
            });
    }
    else {
        sendJSONresponse(res, 404, {"message": "No Food Id Found"});
        return;
    }
  };