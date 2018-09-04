
class ATM_view_controller extends DefaultConfigurableObject{
	constructor(options={}){
		const defaultOptions = {
			'keypressReceiver' : 'body',
			'container': 'body',
			model: null
		}
		super(defaultOptions, options);
		this.handleLogin = this.handleLogin.bind(this);
		this.views = {
			signin: new ATM_view_signin({model: this.options.model, login: this.handleLogin }),
			mainMenu: new ATM_menu({
				items: {
					withdrawals: ()=>{ this.currentState= this.views.withdrawalMenu},
					deposits: ()=>{ this.currentState = this.views.depositMenu},
					statements: ()=> this.currentState = this.views.statementMenu,
				}
			}),
			withdrawalMenu:new ATM_menu({
				items: {
					cash: ()=>{ this.currentState = this.views.cashWithdrawal},
					back: ()=>{ this.currentState = this.views.mainMenu}
				}
			}),
			depositMenu:new ATM_menu({
				items: {
					cash: ()=>{ this.currentState = this.views.depositCash},
					check: ()=>{ this.currentState = this.views.depositCheck},
					back: ()=>{ this.currentState = this.views.mainMenu}
				}
			}),
			statementMenu:new ATM_menu({
				items: {
					transactions: ()=>{ this.currentState = this.views.transactions},
					balance: ()=>{ this.currentState = this.views.getBalance},
					back: ()=>{ this.currentState = this.views.mainMenu}
				}
			})
			cashWithdrawal: new ATM
		}
		console.log("tesT: ",this);
		this.currentStateValue = null;
		this.currentState = this.views.signin;
	}
	set currentState(newState){

		this.currentStateValue = newState;
		this.render();	
	}
	handleLogin( data ){
		if(this.options.model.login(data)){
			this.currentState = this.views.mainMenu;
		}
		this.render();

	}
	render(){
		$(this.options.container).empty().append(this.currentStateValue.render());
	}
}

class ATM_view_signin extends DefaultConfigurableObject{
	constructor(options){
		const defaults = {
			model: null,
			login: ()=>{}
		}
		super(defaults, options);
		this.handleSignin = this.handleSignin.bind(this);
	}
	handleSignin(){
		var data = { account: this.parts.accountInput.text, PIN: this.parts.accountPIN.text};
		this.options.login(data);
	}
	render(){
		this.parts = {
			container: new ATM_component_element({ 'class': 'menu'}),
			accountInput: new ATM_component_element({ tag: 'input', 'class': 'dataInput', text: 'enter account', attributes: {'type': 'text'}}),
			accountPIN: new ATM_component_element({ tag: 'input', 'class': 'dataInput', text: 'enter PIN', attributes: {'type': 'password'}}),
			submitButton: new ATM_component_element({ tag: 'button', 'class': 'dataInput', text: 'SUBMIT', attributes: {'type': 'button'}, onClick: this.handleSignin}),
		}
		const container = this.parts.container.render();
		container.append(this.parts.accountInput.render(), this.parts.accountPIN.render(), this.parts.submitButton.render())
		return container;
	}
}

class ATM_CashWidthdrawal extends DefaultConfigurableObject{
	constructor(options){
		const defaults = {
			model: null
		}
		super(defaults, options);
	}
}

class ATM_component_element extends DefaultConfigurableObject{
	constructor( options ){
		const placeholderElements = ['input'];
		const defaults = {
			tag: 'div',
			'class': '',
			text: '',
			attributes: {},
			onClick: function(){}
		}
		super(defaults, options);
		this.hasText = placeholderElements.indexOf(this.options.tag) ===-1;
		this.dom = null;
	}
	get text(){
		if(this.hasText){
			return this.dom.text();
		} else {
			return this.dom.val();
		}
	}
	set text(newVal){
		if(this.hasText){
			this.dom.text(newVal);
		} else {
			this.dom.val(newVal);
		}		
	}
	render(){
		let tagOptions = {
			type: this.options.type,
			'class': this.options['class']
		};
		for(let key in this.options.attributes){
			tagOptions[key] = this.options.attributes[key];
		}
		if(!this.hasText){
			tagOptions.placeholder = this.options.text;
		} else {
			tagOptions.text = this.options.text;
		}
		this.dom = $(`<${this.options.tag}>`, tagOptions);
		this.dom.click( this.options.onClick );
		return this.dom;
	}
}

class ATM_menu extends DefaultConfigurableObject{
	constructor(options){
		const defaults = {
			items: {}
		}
		super(defaults, options);
		this.container = null;
		this.itemObjects = {};
		this.clickHandler = this.clickHandler.bind(this);
	}
	clickHandler(key){
		this.options.items[key]();
	}
	render(){
		this.container = $("<div>",{
			'class': 'menuContainer'
		})
		for(let key in this.options.items){
			this.itemObjects[key] = new ATM_component_element({
				tag: 'button',
				'class': 'menuItem',
				text: key,
				onClick: this.clickHandler.bind(this, key)
			})
			this.container.append(this.itemObjects[key].render())
		}
		return this.container;
	}
}

class ATM_accounts{

}