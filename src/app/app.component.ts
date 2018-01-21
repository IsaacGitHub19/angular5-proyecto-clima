import { Component, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
//Headers
@Component({
  selector: 'mdb-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']

})

export class AppComponent {
    @ViewChild('content') public contentModal;
    @ViewChild('carouselRef') public contentCarrusel;
    public indexDepar=-1;
    public indexProv=-1;
    public indexDist=-1;
    public inicio=1;
    public noticias=0;
    public ciudades=0;
    public data:any = null;
    public http: Http;
    public clima: any=null;
    public departamentos: any[] = [];
    public prev=0;
    public nex=1;

   constructor(private _http: Http) {
        this.load();
   }

    load(){
        return this._http.get('assets/departamentos.json')
                .map((res: Response) => res.json())
                 .subscribe(data => {
                        //this.data = data;
                        this.departamentos=data['departamentos'];
                        console.log(this.departamentos);
        });
    }

    show(){
        this.contentModal.show();
        console.log("abierto");
    }

    hide(){
    	this.contentModal.hide();
    	console.log("cerrado");
    }

    selProv(id){
    	this.indexProv=id;
    	console.log("Provincia: ",this.departamentos[this.indexDepar].provincias[this.indexProv].provincia);
    	this.indexDist=-1;
	}

	selDepa(id){
       this.indexDepar=id;
       console.log("Departamento: ",this.departamentos[this.indexDepar].departamento);
       this.indexProv=-1;
	}


	selDist(id){
	  this.contentModal.hide();
	  this.indexDist=id;
	  console.log("Distrito: ",this.departamentos[this.indexDepar].provincias[this.indexProv].distritos[this.indexDist].distrito);
	  this.ciudades=1;
    this.inicio=0;
    this.noticias=0;
    //this._http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D'+woeid+'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
    this._http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+this.departamentos[this.indexDepar].provincias[this.indexProv].distritos[this.indexDist].distrito+'%2C'+this.departamentos[this.indexDepar].provincias[this.indexProv].provincia+'%2C'+this.departamentos[this.indexDepar].departamento+'%2C%20Per%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
                .map((res: Response) => res.json())
                 .subscribe(data => {
                        console.log(data.query.results.channel.item);
                        this.clima=data.query.results.channel.item;
                        this.clima.lat=parseInt(this.clima.lat);
                        this.clima.long=parseInt(this.clima.long);
                        this.clima.title='Condiciones del Clima para '+this.departamentos[this.indexDepar].provincias[this.indexProv].distritos[this.indexDist].distrito+', '+this.departamentos[this.indexDepar].departamento+', Perú';
                        console.log(this.clima);
                        for (let i = 0; i < 10; i++) {
                            if (this.clima.forecast[i].text=="Clear") { this.clima.forecast[i].text="Despejado"}
                            if (this.clima.forecast[i].text=="Cloudy") { this.clima.forecast[i].text="Nublado"}
                            if (this.clima.forecast[i].text=="Fair") { this.clima.forecast[i].text="Limpio"}
                            if (this.clima.forecast[i].text=="Isolated Thunderstorms") { this.clima.forecast[i].text="Tormentas Aisladas"}
                            if (this.clima.forecast[i].text=="Mostly Cloudy") { this.clima.forecast[i].text="Principalmente Nublado"}
                            if (this.clima.forecast[i].text=="Mostly Sunny") { this.clima.forecast[i].text="Principalmente Soleado"}
                            if (this.clima.forecast[i].text=="Partly Cloudy") { this.clima.forecast[i].text="Parcialmente Nublado"}
                            if (this.clima.forecast[i].text=="Rain And Snow") { this.clima.forecast[i].text="Lluvia y Nieve"}
                            if (this.clima.forecast[i].text=="Rain") { this.clima.forecast[i].text="Lluvia"}
                            if (this.clima.forecast[i].text=="Scattered Showers") { this.clima.forecast[i].text="Lluvias Dispersas"}
                            if (this.clima.forecast[i].text=="Scattered Thundershowers") { this.clima.forecast[i].text="Lluvia de Truenos Dispersas"}
                            if (this.clima.forecast[i].text=="Scattered Thunderstorms") { this.clima.forecast[i].text="Tormentas Eléctricas Dispersas"}
                            if (this.clima.forecast[i].text=="Showers") { this.clima.forecast[i].text="Lluvias"}
                            if (this.clima.forecast[i].text=="Snow") { this.clima.forecast[i].text="Nieve"}
                            if (this.clima.forecast[i].text=="Sunny") { this.clima.forecast[i].text="Soleado"}
                            if (this.clima.forecast[i].text=="Thunderstorms") { this.clima.forecast[i].text="Tormentas Eléctricas"}
                            if (this.clima.forecast[i].text=="Windy") { this.clima.forecast[i].text="Ventoso"}
                            if (this.clima.forecast[i].day=="Mon") { this.clima.forecast[i].day="Lun"}
                            if (this.clima.forecast[i].day=="Tue") { this.clima.forecast[i].day="Mar"}
                            if (this.clima.forecast[i].day=="Wed") { this.clima.forecast[i].day="Mie"}
                            if (this.clima.forecast[i].day=="Thu") { this.clima.forecast[i].day="Jue"}
                            if (this.clima.forecast[i].day=="Fri") { this.clima.forecast[i].day="Vie"}
                            if (this.clima.forecast[i].day=="Sat") { this.clima.forecast[i].day="Sáb"}
                            if (this.clima.forecast[i].day=="Sun") { this.clima.forecast[i].day="Dom"}
                            let mes = this.clima.forecast[i].date.substring(3,6);
                            if (mes=="Jan") {this.clima.forecast[i].date=this.clima.forecast[i].date.replace("Jan","Ene");}
                            if (mes=="Apr") {this.clima.forecast[i].date=this.clima.forecast[i].date.replace("Jan","Abr");}
                            if (mes=="Aug") {this.clima.forecast[i].date=this.clima.forecast[i].date.replace("Jan","Ago");}
                            if (mes=="Sep") {this.clima.forecast[i].date=this.clima.forecast[i].date.replace("Jan","Set");}
                            if (mes=="Dec") {this.clima.forecast[i].date=this.clima.forecast[i].date.replace("Jan","Dic");}
                            this.clima.forecast[i].high=(this.clima.forecast[i].high-32)*5/9;
                            this.clima.forecast[i].high=this.clima.forecast[i].high.toFixed(0);           
                            this.clima.forecast[i].low=(this.clima.forecast[i].low-32)*5/9;
                            this.clima.forecast[i].low=this.clima.forecast[i].low.toFixed(0);
                            console.log(this.clima.forecast[i]);
                        }
                      
    });
	}

	secInicio(){
       this.inicio=1;
       this.noticias=0;
       this.ciudades=0;
       this.indexDepar=-1;
       this.indexProv=-1;
       this.indexDist=-1;
	}

	secNoticias(){
		this.noticias=1;
		this.inicio=0;
		this.ciudades=0;
		this.indexDepar=-1;
        this.indexProv=-1;
        this.indexDist=-1;
	}

	next(){
        this.contentCarrusel.nextSlide();
        this.prev=1;
        this.nex=0;
        console.log("Next");
	}

	previous(){
		this.contentCarrusel.previousSlide();
		this.nex=1;
		this.prev=0;
		console.log("Previous");
	}

}

