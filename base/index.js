const Arweave = require('arweave');
// Since v1.5.1 you're now able to call the init function for the web version without options. The current path will be used by default, recommended.
const arweave = Arweave.init();
arweave.wallets.generate().then((key) => {
    console.log(key);
    arweave.wallets.jwkToAddress(key).then((address) => {
        console.log(address);
        //1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY
    });
 
});
