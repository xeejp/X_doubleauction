module.exports = (function() {
  var Common = require('./../common.js');

  return {
    init: function(){
      var data = Common.getDefaultData();
      this.transit('wait');
      return {data: data, student: {}, teacher: {}};
    },
    join: function(data, id){
      Common.joinStudent(data.students, id);
      return {data: data, student: Common.getTemplateDataStudents(data), teacher: {}};
    },
    update: function(data) {
      return {data: data, student: Common.getTemplateDataStudents(data), teacher: {}};
    },
    receive: function(data) {
      return {data: data, student: Common.getTemplateDataStudents(data), teacher: {}};
    }
  };
})();
