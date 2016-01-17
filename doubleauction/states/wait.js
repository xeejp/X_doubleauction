module.exports = (function() {
  var Enumerable = require('./../enumerable.js');
  var Common = require('./../common.js');

  return {
    join: function(data, id){
      Common.joinStudent(data.students, id);
      data.students[id].active = true;
      return {data: data, student: Common.getTemplateDataStudents(data), teacher: {}};
    },
    receive: function(data, receivedData, id){
      if (!id) {
        switch (receivedData['action']) {
          case 'matchStudents':
            // match all active students
            var result = Common.matchStudents(
              Enumerable.from(data.students)
                .where('$.value.active')
                .toArray()
            );
            if (result) this.transit('ready');
            break;
        }
      }
      return {data: data, student: Common.getTemplateDataStudents(data), teacher: {}};
    }
  };
})();
