module.exports = (function() {
  var Common = require('./../common.js');

  return {
    receive: function(data, receivedData, id){
      // teacher
      if (!id) {
        switch (receivedData['action']) {
          case 'reset':
            this.transit('wait');
            break;
        }
      }
      return {data: data, student: Common.getTemplateDataStudents(data), teacher: {}};
    }
  };
})();
