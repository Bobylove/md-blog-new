$(document).ready(function(){
	"use strict";

	var app = {
		html:null,
		url:'http://localhost:7000/create/example.md',
		url2:'http://localhost:7000/create/alice.md',
		url3:'http://localhost:7000/menu.json',
		url4:'http://localhost:7000/create/',
		menu:null,
		converter: new showdown.Converter(),

		init:function(){
			app.listener();
			app.selected();
			$('form').on('submit', this.handleForm.bind(this));
			// $('#selected').on('submit', this.edit.bind(this));


		},
		listener: function(){
			$('#btnGet').on('click',app.convertMark);
			$('#btnTitle').on('click',app.convertAlice);
			$('#btnJson').on('click', app.convertJson);
			$('#selectArticle').on("click", app.editArticle);
			

		},
		convertMark: function(){
			$.get(app.url, function(data){
				app.html = app.converter.makeHtml(data);
				$('#md').html(app.html);
				$('#title').hide();
				$('#getJson').hide();
				$('#md').show();
			});

		},
		convertAlice: function(){
			$.get(app.url2, function(alice){
				app.html = app.converter.makeHtml(alice);
				$('#title').html(app.html);
				$('#md').hide();
				$('#getJson').hide();
				$('#title').show();
			});
		},
		convertJson: function(){
			$.get(app.url3, function(json){
				app.menu = json.menu
				for(var i = 0; i<app.menu.length ; i++ ){
					$('#list').append('<li><a href="http://localhost:7000/create/'+app.menu[i].path+'" id="lien">'+app.menu[i].title+'</li>'); 
				}
				$('#md').hide();
				$('#title').hide();
				$('#getJson').show();
			});


		},
		selected: function(){
			$.get(app.url3 ,function(jsonTitle){
				app.menu = jsonTitle.menu
				for(var i = 0; i<app.menu.length ; i++ ){
					$('#article').append('<option href="'+app.menu[i].path+'><label name="title">'+app.menu[i].title+'</label></option>'); 
				};
			});
		},
		// editArticle: function(event){
		// 	event.preventDefault();
		// 	app.editContent(content);
		// 	console.log(app.menu)
		// 	var create = $('select').val();
		// 	console.log(create);
		// 	var title = app.menu[create].title;
		// 	console.log(title)
		// 	var content = app.url4 + app.menu[create].path;
		// 	$('#title').val(title);
		// },
		// editContent: function(content){
		// 	$.ajax(content)
		// 	.done(this.ajaxDoneEdit)
		// 	.fail(this.failAjax)
		// 	.always(this.always);
		// },

		// ajaxDoneEdit: function(content){
		// 	$('#content').val(content);
		// },
		// editAjax: function(jsonFile){
		// 	$.ajax({
		// 		type:"get",
		// 		url:'menu.json',
		// 		data: jsonFile,


		// 	})
		// },

		handleForm: function(event){
			event.preventDefault();
			var title = $("#title").val();
			var content = $("#content").val();
			this.submitForm({title:title, content:content});
		},
		submitForm: function(data){
			$.ajax({
				type:"POST",
				url:$("form").attr("action"),
				data: data,
				success : this.success

			})
		}, 
		success: function(){
			alert(" Gg wp");
		}
	};

	app.init();
});