import ContainerController from '../../cardinal/controllers/base-controllers/ContainerController.js';

var model = {
    id: {
        label: 'Id',
        name: 'id',
        value: ''
    }
};

export default class DeleteItemController extends ContainerController {
    constructor(element) {

        super(element);
        this.model = this.setModel(JSON.parse(JSON.stringify(model)));

        let deleteItem = () => {
            let item = {
                id : this.model.getChainValue("id.value"),
            };

            var xhttp = new XMLHttpRequest();

            //DELETE request not working for some reason
            xhttp.open("GET", "http://localhost:8081/models/delete/" + item.id);
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    console.log(this.responseText);
                }
            };

            xhttp.send(null);
        };

        this.on("deleteItem", deleteItem, true);
    }
}
