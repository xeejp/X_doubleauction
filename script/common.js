module.exports = (function(){
  var Enumerable = require('./enumerable.js');

  // Common functions
  var Common = {
    // student
    getTemplateDataStudents: function(data) {
      return Enumerable.from(data.students)
        .select(function(dict) {
          return {id: dict.key, data: Common.getTemplateDataStudent(data, dict.value)};
        })
        .toObject('$.id', '$.data');
    },
    getTemplateDataStudent: function(data, student) {
      return {
        state: student.state,
        data: {
          student: {
            role: student.data.role,
            cost      : student.data.cost,
            payable   : student.data.payable,
            properties: student.data.properties,
            money     : student.data.money
          },
          list: {
            sell  : data.offers['ask'],
            buy   : data.offers['bid'],
            finish: data.offers['finish']
          }
        }
      };
    },

    // teacher
    getTemplateDataTeacher: function(data) {
      return {data: data};
    },
    
    // デフォルトデータを取得
    // @return デフォルトデータ
    getDefaultData: function() {
      return {
        config: {},
        students: {},
        offers: {
          ask: [],
          bid: [],
          finish: [],
        },
      };
    },

    // 生徒を追加する
    joinStudent: function(students, id) {
      students[id] = {
        id: id,
        active: false,
        state: 'default',
        data: {}
      };
      return students;
    },

    // 生徒をマッチングする
    // @param offset 既にマッチングされた数
    // @return マッチングに成功したか
    matchStudents: function(students, offset) {
      if (offset == null) offset = 0;

      var num = Enumerable.from(students).count();
      if (num < 2) return false;
      
      var sellerNum = (num - (num % 2))/2;
      var buyerNum = sellerNum;
      
      var values = Enumerable.range(offset+1, num)
        .select('$ * 100')
        .toArray();
      var count = 0;
      Enumerable.from(students)
        .shuffle()
        .take(sellerNum + buyerNum)
        .processAll(function(dict, id){
          var student = dict.value;
          student.data = {};
          if (count%2 == 0) {
            student.data.role = 'seller';
            student.data.payable = 0;
            student.data.cost = values[count];
            student.data.properties = 1;
            student.data.money = 0;
          } else {
            student.data.role = 'buyer';
            student.data.payable = values[count];
            student.data.cost = 0;
            student.data.properties = 0;
            student.data.money = student.data.payable;
          }
          student.data.init = true;
          student.state = 'explain';
          count++;
        });
      return true;
    },

    // 提示金額が有効か判別する
    // @return 有効値であるか
    isOfferable: function(student, value) {
      switch(student.data.role) {
        case 'seller':
          if (value < student.data.cost) return false;
          if (student.data.properties <= 0) return false;
          break;
        case 'buyer':
          if (value <= 0) return false;
          if (value > student.data.money) return false;
          break;
        default: return false;
      }
      return true;
    },

    // 提示価格をリストに追加
    addOffer: function(offers, student, value) {
      var tag;
      switch(student.data.role) {
        case 'seller':
          tag = 'ask';
          break;
        case 'buyer':
          tag = 'bid';
          break;
        default:
          return false;
      }
      offers[tag].push({
        id: student.id,
        role: student.data.role,
        value: value,
        time: Date.now(),
      });
      return true;
    },

    // リストを消化する
    processOffers: function(offers, students) {
      var asks = Enumerable.from(offers['ask'])
        .orderBy('$.value')
        .toArray();
      var bids = Enumerable.from(offers['bid'])
        .orderByDescending('$.value')
        .toArray();
      while(Enumerable.from(asks).any() && Enumerable.from(bids).any()) {
        if (Enumerable.from(asks).first().value > Enumerable.from(bids).first().value) break;

        var ask = asks.shift();
        var bid = bids.shift();

        var seller = students[ask.id];
        var buyer = students[bid.id];
        var value = (ask.time < bid.time)? ask.value: bid.value;

        // 財と金銭の交換
        seller.data.properties--;
        buyer.data.properties++;
        seller.data.money += value;
        buyer.data.money -= value;

        offers['finish'].push({
          seller: seller.id,
          buyer: buyer.id,
          value: value,
          time: Date.now(),
        });

        // 終了処理
        if (seller.data.properties <= 0) {
          seller.finish = true;
        }
        if (buyer.data.money <= 0) {
          buyer.finish = true;
        }
      }
      offers['ask'] = asks;
      offers['bid'] = bids;
    },
  };

  return Common;
})();
