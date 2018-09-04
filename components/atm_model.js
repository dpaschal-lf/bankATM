

class ATM_model{
	constructor(){
		this.data = {
			accounts: {
				1: {
					pin: '1',
					balance: 400
				}
			}
		}
		this.currentAccount = null;
	}
	login( loginData ){
		if(this.loggedIn){
			console.warn('already signed in');
			return;
		}
		if(this.data.accounts.hasOwnProperty(loginData.account)){
			if(this.data.accounts[loginData.account].pin === loginData.PIN){
				this.currentAccount = loginData.account;
			}
			return true;
		}
		return false;
	}
	get loggedIn(){
		return this.currentAccount!==null;
	}
}