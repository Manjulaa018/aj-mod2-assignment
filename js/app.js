(function(){
  'use strict';

  angular.module("ShoppingApp",[])
  .controller("ToBuyController",ToBuyController)
  .controller("AlreadyBoughtController",AlreadyBoughtController)
  .service("ShoppingListCheckOffService",ShoppingListCheckOffService);

  ToBuyController.$inject=['ShoppingListCheckOffService'];
  AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];

  function ToBuyController(ShoppingListCheckOffService){
    var toBuyItems = this;

    toBuyItems.itemList = ShoppingListCheckOffService.getBuyItemList();
    toBuyItems.add = function(index){
      try{
        ShoppingListCheckOffService.buyItem(index);
      }
      catch(error){
        toBuyItems.errormessage = error.message;
      }
    }
  }
  function AlreadyBoughtController(ShoppingListCheckOffService){
    var boughtItemList = this;

    boughtItemList.itemList = ShoppingListCheckOffService.getBoughtItemList();
    boughtItemList.errormessage = "Nothing bought yet.";
  }

  function ShoppingListCheckOffService(){
    var service = this;
    var toBuyItems = [];
    var boughtItems = [];

    var itemNameList = ["Notebook/s","Pen/s","Pencil/s","Scissor/s","Marker/s"];
    for(var i=0;i<itemNameList.length;i++){
      var item = {
        name : itemNameList[i],
        quantity : Math.floor(Math.random() * 10) + 1
      };
      toBuyItems.push(item);
    }

    service.getBuyItemList=function(){
      return toBuyItems;
    }

    service.buyItem=function(index){
      boughtItems.push(toBuyItems[index]);
      toBuyItems.splice(index,1);
      if(toBuyItems.length == 0){
        throw new Error("Everything is bought!");
      }

    }

    service.getBoughtItemList=function(){
      return boughtItems;
    }
  }
})();
