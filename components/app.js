
let app_model = null;
let app_view = null;
function startApp(){
	app_model = new ATM_model();
	app_view = new ATM_view_controller({ model: app_model});
}

startApp();