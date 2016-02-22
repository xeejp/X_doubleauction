module.exports = (function() {
  var Enumerable = require('./../enumerable.js');
  var Common = require('./../common.js');

  return {
    receive: function(data, receivedData, id) {
      // student
      if (id) {
        var student = data.students[id];
        if (student.active) {
          switch(student.state) {
            case 'wait': break;
            case 'explain':
              if (receivedData['page'] === 'next') {
                student.data['page'] ++;
              } else if (receivedData['page'] === 'prev') {
                student.data['page'] --;
              }
              break;
            case 'experiment':
              if (receivedData['offer']) {
                if (Common.isOfferable(student, receivedData['offer'])) {
                  Common.addOffer(data.offers, student, receivedData['offer']);
                  Common.processOffers(data.offers, data.students);
                }
              }
              break;
            case 'result':
              break;
            default:
              break;
          }
        }
      }
      // teacher
      else {
        switch (receivedData['action']) {
          case 'finish':
            Enumerable.from(data.students)
              .where('$.value.active')
              .processAll(function(dict){
                dict.value.data['state'] = 'result';
              });
            this.transit('finish');
            break;
        }
      }
      return {data: data, student: Common.getTemplateDataStudents(data), teacher: {}};
    }
  };
})();
