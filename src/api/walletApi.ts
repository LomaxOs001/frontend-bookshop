import { ethers } from "ethers";
/**
 * Wallet API
 */


export class WalletAPI {
    
    static currentInfo: {account: string, balance: string}[] = [{account: '', balance: ''}];

    static async connectWalletAccount(): Promise<void> {

        if (this.checkWindow()) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        }
        else{
            throw new Error("No Wallet Installed");
        }
    }

    static async getAccountInfo(): Promise<{account: string, balance: string}[]> {

        if (this.checkWindow()) {
            const addresses = await window.ethereum
            .request({ method: 'eth_accounts' })
            .then()
            .catch((error: unknown) => {
                console.error("Error fetching accounts:", error);
            });

            if ( addresses.length > 0 ) {
                this.currentInfo[0].account = addresses[0];
                this.currentInfo[0].balance = await this.getAccountBalance(addresses[0]);
                return this.currentInfo;
            }
            else {
                return [];
            }
        }
        else{
            throw new Error("No Wallet Installed!");
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
    
    private static checkWindow(): boolean {
        return typeof window != 'undefined' && typeof window.ethereum != 'undefined';
    }
}