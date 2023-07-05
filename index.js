import yargs from "yargs";
import contacts from "./contacts.js";


const argv = yargs.argv;
function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            // ...
            break;

        case 'get':
            // ... id
            break;

        case 'add':
            // ... name email phone
            break;

        case 'remove':
            // ... id
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);
