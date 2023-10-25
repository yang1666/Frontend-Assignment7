(function() {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
        .filter('angularDollar', function(){
            return function(input){
                if (typeof input === 'number') {
                    return '$$$' + input.toFixed(2);
                }
                return input;
            };
        });

    ToBuyController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        var toBuyList = this;

        toBuyList.items = ShoppingListCheckOffService.getToBuyItems();

        toBuyList.buyItem = function(itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyBougthList = this;

        alreadyBougthList.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;
        var toBuyItems = [
            { name: "cookies", quantity: 10, pricePerItem:2},
            { name: "cokes", quantity: 2, pricePerItem: 1.5 },
            { name: "beers", quantity: 6, pricePerItem: 3 },
            { name: "apples", quantity: 4, pricePerItem: 0.5 },
            { name: "bananas", quantity: 7, pricePerItem: 0.4 }
        ];
        var alreadyBoughtItems = [];

        service.buyItem = function(itemIndex) {
            var item = angular.copy(toBuyItems[itemIndex]); // Use angular.copy to avoid reference issues
            item.message = "Bought " + item.quantity + " " + item.name + " for total price of $$$" + (item.quantity * item.pricePerItem).toFixed(2);
            alreadyBoughtItems.push(item);
            toBuyItems.splice(itemIndex, 1);
        };
        

        service.getToBuyItems = function() {
            return toBuyItems;
        };

        service.getAlreadyBoughtItems = function() {
            return alreadyBoughtItems;
        };
    }
})();