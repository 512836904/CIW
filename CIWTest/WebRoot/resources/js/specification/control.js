/**
 * 
 */
var WebSocket_Url;
$(function(){
	$.ajax({
	      type : "post",  
	      async : false,
	      url : "td/AllTdbf",  
	      data : {},  
	      dataType : "json", //返回数据形式为json  
	      success : function(result) {
	          if (result) {
	        	  WebSocket_Url = eval(result.web_socket);
	          }  
	      },
	      error : function(errorMsg) {  
	          alert("数据请求失败，请联系系统管理员!");  
	      }  
	});
})

function control(){
	document.getElementById("fm").style.display="none";
	document.getElementById("cfm").style.display="block";
}

function parameter(){
	document.getElementById("fm").style.display="block";
	document.getElementById("cfm").style.display="none";
}

function controlfun(){
	var pwdflag=0;
 	if(typeof(WebSocket) == "undefined") {
    	WEB_SOCKET_SWF_LOCATION = "resources/js/WebSocketMain.swf";
    	WEB_SOCKET_DEBUG = true;
	}
	var websocket = new WebSocket(WebSocket_Url);
	websocket.onopen = function() {
		window.setTimeout(function() {
			if(pwdflag==0){
				alert("下发失败");
				websocket.close();
			}
		}, 5000)
		var con = $("input[name='free']:checked").val();
		if(con.length<2){
			var length = 2 - con.length;
	        for(var i=0;i<length;i++){
	        	con = "0" + con;
	        }
	    };
		var machine;
		if(machga!=null){
			for(var q=0;q<machga.length;q++){
				if(machga[q].id==node11.id){
					if(machga[q].gatherId){
						machine = parseInt(machga[q].gatherId).toString(16);
						if(machine.length<4){
							var length = 4 - machine.length;
					        for(var i=0;i<length;i++){
					        	machine = "0" + machine;
					        };
					        break;
						}
					}else{
						alert("该焊机未对应采集编号!!!");
						websocket.close();
						return;
					}
				}
			}
		};
		var xiafasend1 = machine+con;
		var xxx = xiafasend1.toUpperCase();
		var data_length = ((parseInt(xxx.length)+12)/2).toString(16);
		if(data_length.length<2){
			var length = 2 - data_length.length;
	        for(var i=0;i<length;i++){
	        	data_length = "0" + data_length;
	        }
	    };
	    xxx="7E"+data_length+"01010154"+xiafasend1;
	    var check = 0;
		for (var i = 0; i < (xxx.length/2); i++)
		{
			var tstr1=xxx.substring(i*2, i*2+2);
			var k=parseInt(tstr1,16);
			check += k;
		}
		var checksend = parseInt(check).toString(16);
		var a2 = checksend.length;
		checksend = checksend.substring(a2-2,a2);
		checksend = checksend.toUpperCase();
		var xiafasend2 = (xxx+checksend).substring(2);
/*		var xiafasend4 = xiafasend2.replace(/7C/g, '7C5C');
		var xiafasend3 = xiafasend4.replace(/7E/g, '7C5E');
		var fuer="";
		for(var er=0;er<(xiafasend3.length/2);er++){
			if(xiafasend3.substring(er*2,er*2+2)=="00"){
				fuer = fuer+"7C20"
			}else{
				fuer = fuer+xiafasend3.substring(er*2,er*2+2);
			}
		}
		var xiafasend5 = fuer.replace(/7D/g, '7C5D').toUpperCase();
		var xiafasend = "7E" + xiafasend5 + "7D";
		websocket.send(xiafasend);*/
		websocket.send("7E"+xiafasend2+"7D");
		websocket.onmessage = function(msg) {
			var fan = msg.data;
//			fan = fan.replace(/7C20/g, '00').toUpperCase();
			if(fan.substring(0,2)=="7E"&&fan.substring(10,12)=="54"){
				pwdflag++;
				if(parseInt(fan.substring(16,18),16)==1){
					websocket.close();
					if(websocket.readyState!=1){
						alert("下发失败");
						}
				}else{
					websocket.close();
					if(websocket.readyState!=1){
						alert("下发成功");
						}
				}
			}
		};
	}
}

function passfun(){
	if($('#passwd').numberbox('getValue')){
		if(parseInt($('#passwd').numberbox('getValue')).toString(16)<1||parseInt($('#passwd').numberbox('getValue')).toString(16)>999){
			alert("密码范围是1~999");
		}else{
			var pwdflag=0;
		 	if(typeof(WebSocket) == "undefined") {
		    	WEB_SOCKET_SWF_LOCATION = "resources/js/WebSocketMain.swf";
		    	WEB_SOCKET_DEBUG = true;
			}
			var websocket = new WebSocket(WebSocket_Url);
			websocket.onopen = function() {
				window.setTimeout(function() {
					if(pwdflag==0){
						alert("下发失败");
						websocket.close();
					}
				}, 5000)
				var con = parseInt($('#passwd').numberbox('getValue')).toString(16);
				if(con.length<4){
					var length = 4 - con.length;
			        for(var i=0;i<length;i++){
			        	con = "0" + con;
			        }
			    };
				var machine;
				if(machga!=null){
					for(var q=0;q<machga.length;q++){
						if(machga[q].id==node11.id){
							if(machga[q].gatherId){
								machine = parseInt(machga[q].gatherId).toString(16);
								if(machine.length<4){
									var length = 4 - machine.length;
							        for(var i=0;i<length;i++){
							        	machine = "0" + machine;
							        };
							        break;
								}
							}else{
								alert("该焊机未对应采集编号!!!");
								websocket.close();
								return;
							}
						}
					}
				};
				var xiafasend1 = machine+con;
				var xxx = xiafasend1.toUpperCase();
				var data_length = ((parseInt(xxx.length)+12)/2).toString(16);
				if(data_length.length<2){
					var length = 2 - data_length.length;
			        for(var i=0;i<length;i++){
			        	data_length = "0" + data_length;
			        }
			    };
			    xxx="7E"+data_length+"01010153"+xiafasend1;
			    var check = 0;
				for (var i = 0; i < (xxx.length/2); i++)
				{
					var tstr1=xxx.substring(i*2, i*2+2);
					var k=parseInt(tstr1,16);
					check += k;
				}
				var checksend = parseInt(check).toString(16);
				var a2 = checksend.length;
				checksend = checksend.substring(a2-2,a2);
				checksend = checksend.toUpperCase();
				var xiafasend2 = (xxx+checksend).substring(2);
/*				var xiafasend4 = xiafasend2.replace(/7C/g, '7C5C');
				var xiafasend3 = xiafasend4.replace(/7E/g, '7C5E');
				var fuer="";
				for(var er=0;er<(xiafasend3.length/2);er++){
					if(xiafasend3.substring(er*2,er*2+2)=="00"){
						fuer = fuer+"7C20"
					}else{
						fuer = fuer+xiafasend3.substring(er*2,er*2+2);
					}
				}
				var xiafasend5 = fuer.replace(/7D/g, '7C5D').toUpperCase();
				var xiafasend = "7E" + xiafasend5 + "7D";
				websocket.send(xiafasend);*/
				websocket.send("7E"+xiafasend2+"7D");
				websocket.onmessage = function(msg) {
					var fan = msg.data;
//					fan = fan.replace(/7C20/g, '00').toUpperCase();
					if(fan.substring(0,2)=="7E"&&fan.substring(10,12)=="53"){
						pwdflag++;
						if(parseInt(fan.substring(16,18),16)==1){
							websocket.close();
							if(websocket.readyState!=1){
								alert("下发失败");
								}
						}else{
							websocket.close();
							if(websocket.readyState!=1){
								alert("下发成功");
								}
						}
					}
				};
			}

		}
	}else{
		alert("密码不能为空");
	}
}

function openPassDlg(){
	$('#pwd').window( {
		title : "密码下发",
		modal : true
	});
	$('#pwd').window('open');
}