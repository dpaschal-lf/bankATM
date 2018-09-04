class DefaultConfigurableObject{
	constructor(defaults={}, options={}){
		this.options = {};
		for(let key in defaults){
			this.options[key] = options[key] || defaults[key];
		}	
	}
}