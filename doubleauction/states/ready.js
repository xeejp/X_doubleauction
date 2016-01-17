module.exports = (function() {
  var Enumerable = require('./../enumerable.js');
  var Common = require('./../common.js');

  return {
    join: function(data, id){
      Common.joinStudent(data.students, id);
      data.students[id].active = true;
      return {data: data, student: Common.getTemplateDataStudents(data), teacher: {}};
    },
    receive: function(data, receivedData, id) {
      // teacher
      if (!id) {
        switch (receivedData['action']) {
          case 'matchStudents':
            // match all active students
            Common.matchStudents(
              Enumerable.from(data.students)
                .where('$.value.active')
                .toArray()
            );
            break;
          case 'matchRemainingStudents':
            // match uninitialized active students
            Common.matchStudents(
              Enumerable.from(data.students)
                .where('$.value.active && !$.value.data.init')
                .toArray(),
              Enumerable.from(data.students)
                .where('$.value.active && $.value.data.init')
                .count()
            );
            break;
          case 'start':
            // set not active for all uninitialized students
            Enumerable.from(data.students)
              .where('!$.value.data.init')
              .processAll(function(dict) {
                var student = dict.value;
                student.active = false;
              });
            // transit state for all active students
            Enumerable.from(data.students)
              .where('$.value.active')
              .processAll(function(dict){
                  dict.value.state = 'experiment';
              });
            this.transit('experiment');
            break;
        }
      }
      return {data: data, student: Common.getTemplateDataStudents(data), teacher: {}};
    }
  };
})();
