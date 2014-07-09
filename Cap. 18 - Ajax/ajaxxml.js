function iniciaAjax() {
	var objetoAjax = false;
		if (window.XMLHttpRequest) {
			objetoAjax = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		try {		
		objetoAjax = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			try {
			objetoAjax = new ActiveXObject("Microsoft.XMLHTTP");			
		} catch(ex) {	
		objetoAjax = false;
       }
		}
	}
	return objetoAjax;
}
		
function requisitar (arquivo) {
			var requisicaoAjax = iniciaAjax(); 
				if(requisicaoAjax) {
					requisicaoAjax.onreadystatechange = function () {	
					trataResposta(requisicaoAjax);	
					};
		requisicaoAjax.open("GET", arquivo, true);
		requisicaoAjax.send(null);
				}
}					

function trataResposta(requisicaoAjax) {
	if(requisicaoAjax.readyState == 4) {
	if(requisicaoAjax.status == 200 || requisicaoAjax.status == 304) {
	
	var dados = requisicaoAjax.responseXML;
	
	var tituloDado = dados.getElementsByTagName("titulo")[0]
	.firstChild.nodeValue;
	var autorDado = dados.getElementsByTagName("autor")[0]
	.firstChild.nodeValue;
	var siteDado = dados.getElementsByTagName("site")[0]
	.firstChild.nodeValue;
	
	
	var titulo = document.createElement("h2"); 
	var site = document.createElement("a");
 	site.setAttribute("href", siteDado);
	var textoTitulo = document.createTextNode(tituloDado);
	site.appendChild(textoTitulo);
	titulo.appendChild(site);
	
	var autor = document.createElement("p"); 
	var textoAutor = document.createTextNode(autorDado);
	autor.appendChild(textoAutor);
	
	var insere = document.getElementById("insere_aqui");
	while (insere.hasChildNodes()) {
		insere.removeChild(insere.lastChild);
	}
	
	insere.appendChild(titulo);
	insere.appendChild(autor);
	
	} else {
	alert("Problema na comunicação com o servidor");
	}
	}	
}
