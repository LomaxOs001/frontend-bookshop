import { ethers } from "ethers";
/**
 * Wallet API
 */


export class WalletAPI {
    
    static currentInfo: {account: string, balance: string}[] = [{account: '', balance: '-'}];

    static async connectWallet(): Promise<void> {
        //Simulate a connection to a wallet
        if (this.checkWindow()) {

            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log("Wallet Connected");
            }
            catch (e) {
                throw new Error("No Wallet Installed");
            }
        }
        else 
            throw new Error("No Wallet Installed");
           
    }
    static async disconnectWallet(): Promise<void> {

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
            throw new Error("Can't Disconnect - No Wallet Installed");
        }
    }
    static async fetchAccountInfo(): Promise<void> {

        if (this.checkWindow()) {
            const addresses = await window.ethereum
            .request({ method: 'eth_requestAccounts' })
            .then()
            .catch((error: unknown) => {
                console.error("Error fetching accounts:", error);
            });
            if ( addresses.length > 0 ) {
                this.currentInfo[0].account = addresses[0];
                this.currentInfo[0].balance = await this.getAccountBalance(addresses[0]);
            }
            else {
                throw new Error("Not Account Connected");
            }
        }
        else{
            throw new Error("No Wallet Installed");
        }
    }

    private static async getAccountBalance(address: string): Promise<string> {
        try {
            const balance = await window.ethereum.request({ method: 'eth_getBalance', params: [address, 'latest'] }); 
            
            return ethers.formatEther(balance);
        } catch (error) {
            console.error("Error fetching balance:", error);
            return '';
        }  
    }

    static getCurrentInfo(): {account: string, balance: string}[] {
        return this.currentInfo;
    }

    
    private static checkWindow(): boolean {
        return typeof window != 'undefined' && typeof window.ethereum != 'undefined';
    }
}