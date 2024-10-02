
/**
 * Wallet API
 */


export class WalletAPI {
    static async connectWallet(): Promise<void> {
        //Simulate a connection to a wallet
        if (this.checkWindow()) {

            try {
                const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log("Wallet Connected with: ", account);
            }
            catch (e) {
                window.alert("Wallet is not installed yet: ");
            }
        }
        else 
            window.alert("Wallet is not installed yet: ");
           
    }
    static async disconnectWallet(): Promise<void> {
        //Simulate a disconnection from a wallet
        if (this.checkWindow()) {
            try {
                await window.ethereum.request({ 
                    method: 'wallet_revokePermissions', 
                    params: [{"eth_accounts": {}}] 
                });

                console.log("Wallet Disconnected");
            }
            catch (e) {
                console.log("Error disconnecting wallet: ", e);
            }
        }
        else {
            console.log("No ethereum object found");
        }
    }
    
    //fetch account information from the connected wallet
    static async getAddresses(): Promise<string[]> {

        if (this.checkWindow()) {
            try {
                const walletAddresses = await window.ethereum.request({ method: 'eth_accounts' });
                return walletAddresses;
            }
            catch (e) {
                console.log("Error getting accounts: ", e);
                return [];
            }
        }
        else {
            console.log("No ethereum object found");
            return [];
        }
    }

    static async walletListener(): Promise<string> {
        
        if (this.checkWindow()) {
            return new Promise((resolve) => {
                window.ethereum.on('accountsChanged', (accounts: string[]) => {
                    console.log("Accounts Changed: ", accounts);
                    resolve(accounts[0]);
                });
            });
        } else {
            console.log("No ethereum object found");
            return '';
        }
    }

    private static checkWindow(): boolean {
        return typeof window != 'undefined' && typeof window.ethereum != 'undefined';
    }
}