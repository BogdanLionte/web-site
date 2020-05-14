import ContainerController from '../../cardinal/controllers/base-controllers/ContainerController.js';

var model = {
    items: []
};

export default class ShowItemsController extends ContainerController {
    constructor(element) {
        super(element);

        var xhttp = new XMLHttpRequest();

        xhttp.open("GET", "http://localhost:8081/models");
        xhttp.setRequestHeader("Content-Type", "application/json");

        var thisReference = this;
        xhttp.onload = function () {
            if (this.readyState === 4 && this.status == 200) {
                var arr = JSON.parse(this.responseText);
                arr.forEach(item => {
                    let newItem = {
                        id: {
                            label: 'Id',
                            name: 'id',
                            value: item.id
                        },
                        name: {
                            label: 'Name',
                            name: 'name',
                            value: item.name
                        },
                        quantity: {
                            label: 'Quantity',
                            name: 'quantity',
                            value: item.quantity
                        },
                        price: {
                            label: 'Price',
                            name: 'price',
                            value: item.price
                        },
                    };
                    model.items.push(newItem);
                });

                thisReference.model = thisReference.setModel(JSON.parse(JSON.stringify(model)));
            }
        };

        xhttp.send();

        let deleteBook = (isbn) => {
            console.log(this.model.getChainValue(isbn.data));
        };

        this.on("deleteBook", deleteBook, true);
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
