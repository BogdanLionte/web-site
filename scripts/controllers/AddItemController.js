import ContainerController from '../../cardinal/controllers/base-controllers/ContainerController.js';

var model = {
        id: {
            label: 'Id',
            name: 'id',
            value: ''
        },
        name: {
            label: 'Name',
            name: 'name',
            value: ''
        },
        quantity: {
            label: 'Quantity',
            name: 'quantity',
            value: ''
        },
        price: {
            label: 'Price',
            name: 'price',
            value: ''
        }
};

export default class AddItemController extends ContainerController {
    constructor(element) {

        super(element);
        this.model = this.setModel(JSON.parse(JSON.stringify(model)));

        let uploadItem = () => {
            let item = {
                id : this.model.getChainValue("id.value"),
                name : this.model.getChainValue("name.value"),
                quantity : this.model.getChainValue("quantity.value"),
                price : this.model.getChainValue("price.value"),
            };

            var xhttp = new XMLHttpRequest();

            xhttp.open("POST", "http://localhost:8081");
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    console.log(this.responseText);
                }
            };

            xhttp.send(JSON.stringify(item));
        };

        this.on("uploadItem", uploadItem, true);
    }
}
