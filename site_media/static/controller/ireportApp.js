//angular.module('mapServiceApp', ['ui.bootstrap'])
angular.module('ireportApp', ['ui.bootstrap','swanModule']) 
.controller('cgraphController', function($scope,swan) {
    $scope.chg2thai=function(ts){
            var thmonth = new Array ("ม.ค.","ก.พ.","มี.ค.",
                                     "เม.ย.","พ.ค.","มิ.ย.", "ก.ค.","ส.ค.","ก.ย.",
                                     "ต.ค.","พ.ย.","ธ.ค.");
            var d=new Date(ts);
            var y=d.getFullYear()+543;
            return d.getDate()+' '+thmonth[d.getMonth()]+' '+y.toString().substring(2,4);
            };
    Highcharts.setOptions({
        global:{
                    timezoneOffset:-7*60
                },
			  credits: {
			        enabled: false
			    },
    });

            $.getJSON('https://spreadsheets.google.com/feeds/list/1tp7Lz0p_PqSfgQBAnA2fvE9znLdmfayh_u1i31DIfQs/od6/public/values?alt=json', function (data) {
                      var ent=data.feed.entry;
                      var dat1=Array();
                      var dat2=Array();
                      var dat3=Array();
                      var dat4=Array();
                      var dat5=Array();
                      var dat6=Array();
                      var date_now= new Date();
                      var date_now_string=$scope.chg2thai(date_now.getTime());
                      var last_date_string;
                      // alert(ent.length);
                      var last_value;
                    for(i=0;i<=ent.length-1;i++){
                      var tf1=!isNaN(ent[i].gsx$total.$t)&&ent[i].gsx$total.$t!="";
                      var tf2=!isNaN(ent[i].gsx$red.$t)&&ent[i].gsx$red.$t!="";
                     // var tf3=!isNaN(ent[i].gsx$green.$t)&&ent[i].gsx$kn.$t!="";
                      //var tf4=!isNaN(ent[i].gsx$ps.$t)&&ent[i].gsx$ps.$t!="";
                      if(tf1){
                      var nd=new Date(ent[i].gsx$tempdate.$t);
                      var node =Array(nd.getTime(),parseFloat(ent[i].gsx$total.$t));
                      dat1.push(node);  // push
                      last_value=parseFloat(ent[i].gsx$total.$t);
                      last_date=nd.getTime();
                      }//if
                      if(tf2){
                      var node2 =Array(Date.parse(ent[i].gsx$tempdate.$t),parseFloat(ent[i].gsx$red.$t));
                      dat2.push(node2);  // push
                      var node3 =Array(Date.parse(ent[i].gsx$tempdate.$t),parseFloat(ent[i].gsx$yellow.$t));
                      dat3.push(node3);  // push
                      var node4 =Array(Date.parse(ent[i].gsx$tempdate.$t),parseFloat(ent[i].gsx$green.$t));
                      dat4.push(node4);  // push
                      //var node5=Array(Date.parse(ent[i].gsx$tempdate.$t),parseFloat(ent[i].gsx$plan1.$t));
					  var node5val=parseFloat(ent[i].gsx$plan1.$t)-node2[1]-node3[1]-node4[1];
					 // console.log(i+'):'+node5val);
					 // var node5=Array(Date.parse(ent[i].gsx$tempdate.$t),parseFloat(ent[i].gsx$plan1.$t));
					 var node5=Array(Date.parse(ent[i].gsx$tempdate.$t),node5val);
                      //if(Date.parse(ent[i].gsx$tempdate.$t)>=new Date('2015-11-01T00:00:00.000+07:00')){
                           dat5.push(node5);
                        // }
						
                      }//if
                      
                      
                    }//for
                      last_date_string=$scope.chg2thai(last_date);
					  $('#title').html('<h4>รายงานสถานะปริมาตรน้ำใช้การรวม 4 เขื่อนในลุ่มน้ำเจ้าพระยา  <br/>ณ วันที่ '+last_date_string+'</h4>');
                    $('#hello').highcharts({
                                           
                        chart: {
                                zoomType: 'x',
                                           plotBackgroundColor: {
                                           linearGradient: [0, 0, 0, 500],
                                           /*stops: [
                                                   [0, 'rgb(207, 226, 218)'],
                                                   [1, 'rgb(181,255,223)']
                                                   ]
                                           },*/
											stops: [
											//[0, 'rgb(59,163,7)'],
											//[1, 'rgb(188,224,171)']
											[0, 'rgb(113,209,115)'],
											[1, 'rgb(113,209,115)']
											]
											},
								},
                                       title: {
                                                 text: '',
										   verticalAlign:'top',
										   //align:'middle',
										   floating:false,
										   useHTML:true,
                            },
                                                 subtitle: {
                                                 //text: document.ontouchstart === undefined ?'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
													 text:""
                                                },
                                           
                                                 xAxis: {
                                           type:'datetime',
                                           labels: {
                                           formatter: function() {
                                           return $scope.chg2thai(this.value);
                                           }
                                           }
                                                 },
                                            yAxis: {
                                                 title: {
                                                 text: 'ปริมาตรน้ำใช้การ (ล้าน.ลบ.ม.)'
                                           },max:6000,
                                           tickInterval:500,
                                          stackLabels:{
                                           enabled:true,
                                                }
                                            },
                                            legend: {
                                                 enabled: false
                                            },
											//////legend
											
                                    plotOptions: {
                                            area: {
                                           stacking:'normal',
                                                 marker: {
                                                 radius: 2
                                                 },
                                                 lineWidth:3,
                                                 states: {
                                                 hover: {
                                                 lineWidth: 3,
                                                 }
                                                 },
                                                 threshold: null,

                                           },
                                           
                                           spline:{
                                           dataLabels:{enabled:true,useHTML:true,formatter:function(){
                                                           // if(this.y==last_value){
                                                        if(this.x==last_date){
                                                                return "<strong>"+this.y+"</strong>";
                                                            }else{
                                                                return "";
                                                            }
                                           
                                                        }//function
                                           }//dataLabels
                                           }//line
                                        },
                                                 
                                                 series: [{
                                                          type: 'spline',
                                                          name: 'ปริมาตรน้ำใช้การรวม 4 เขื่อนในลุ่มน้ำเจ้าพระยา',
													 color:'#0579ED',
                                                          data: dat1
														  ,zIndex:10
													  },{
                                                          type: 'area',
														  stacking:'normal',
                                                          name: 'แผนปริมาตรน้ำใช้การรวม 4 เขื่อนในลุ่มน้ำเจ้าพระยา',
                                                          data: dat5,
                                                          dashStyle:'Dash',
                                                          //color:'#1AB4E8',
														  color:'rgb(59,163,7)',
                                                          dataLabels:{enabled:false,formatter:function(){
                                                                return this.y;
                                                          }},
													fillColor: {
                                                          	linearGradient: {
                                                          		x1: 0,
                                                          		y1: 1,
                                                          		x2: 0,
                                                          		y2: 0
                                                          	},
                                                          	stops: [
																//188,224,171
                                                                 // [0, 'rgb(72,151,70)'],
                                                                  //[1, 'rgb(149,219,147)']
                                                                  [0, 'rgb(188,224,171)'],
                                                                  [1, 'rgb(188,224,171)']
                                                                  ],
													},
													showInLegend : false,
                                                          
														  },
														  {//fake for legend
															  type:'line',name:"แผนปริมาตรน้ำใช้การรวม 4 เขื่อนในลุ่มน้ำเจ้าพระยา",dashStyle:'Dash',color:'rgb(59,163,7)',marker:{enabled:false},data:{}
														  },
                                                          
														  {
                                                          type: 'area',
															  stacking:'normal',
                                                          name: 'มีน้ำใช้สำหรับอุปโภคบริโภคและรักษาระบบนิเวศเพียงพอจนถึง 16 ก.ค.59',
                                                          data: dat4,
                                                          //color:'Green',
														//color:'rgb(188,224,171)',
															  color:'#aedc98',
                                                          fillColor: {
                                                          linearGradient: {
                                                          x1: 0,
                                                          y1: 1,
                                                          x2: 0,
                                                          y2: 0
                                                          },
                                                          stops: [
                                                                  [0, 'rgb(255,246,2)'],
                                                                  [1, 'rgb(252,246,168)']
                                                                  ],
                                                          },
                                                            dataLabels:{enabled:true,formatter:function(){
                                                          // if(this.y==last_value){
                                                                if(this.x==new Date('2016-05-01T00:00:00.000+07:00').getTime()){
                                                                    return "1,000";
                                                                }else if(this.x==new Date('2015-10-01T00:00:00.000+07:00').getTime()){
                                                                    return "3,500";
                                                                }else if(this.x==new Date('2015-11-01T00:00:00.000+07:00').getTime()){
                                                                    return "3,500";
                                                                }else{
                                                                	    return "";
																}//if
                                                                },//function
																align:"left",allowOverlap:true,
															verticalAlign:"middle",
											   x:0,
																y:-8
																//,y:0
                                                            },//dataLabels
                                                          showInLegend : false,
														  },
														  {//fake
									type:'line',name:"มีน้ำใช้สำหรับอุปโภคบริโภคและรักษาระบบนิเวศเพียงพอจนถึง 16 ก.ค.59",color:'#aedc98',marker:{enabled:false},data:{}
														  },
														  {
                                                          type: 'area',
                                                          name: 'มีน้ำใช้สำหรับอุปโภคบริโภคและรักษาระบบนิเวศเพียงพอจนถึง 30 มิ.ย.59',
                                                          data: dat3,
                                                          color:'Yellow',
                                                          fillColor: {
                                                          linearGradient: {
                                                          x1: 0,
                                                          y1: 1,
                                                          x2: 0,
                                                          y2: 0
                                                          },
                                                          stops: [
                                                                  [0, 'orange'],
                                                                 // [1, 'rgb(236,210,164)']
															   [1, 'orange']
                                                                  ]
                                                          },
                                                            dataLabels:{enabled:true,formatter:function(){
                                                          // if(this.y==last_value){
                                                                if(this.x==new Date('2016-05-01T00:00:00.000+07:00').getTime()){
                                                                    return 800;
                                                                }else{
                                                                    return "";
                                                                }
                                                                },//function
																//,y:4,
															align:"right",
															verticalAlign:"middle",
											   x:0,
											   y:0
                                                            },//dataLabels
															showInLegend:false,
                                                          },
														  {
									type:'line',name:"มีน้ำใช้สำหรับอุปโภคบริโภคและรักษาระบบนิเวศเพียงพอจนถึง 30 มิ.ย.59",color:'Yellow',marker:{enabled:false},data:{}
														  },
														  {
                                                          type: 'area',
                                                          name: 'มีน้ำใช้สำหรับอุปโภคบริโภคและรักษาระบบนิเวศเพียงพอจนถึง 31 พ.ค.59',
                                                          data: dat2,
                                                          color:'Red',
                                                          fillColor: {
                                                          linearGradient: {
                                                          x1: 0,
                                                          y1: 0,
                                                          x2: 0,
                                                          y2: 0
                                                          },
                                                          stops: [
                                                                //  [0, 'red'],
                                                                 // [1, 'rgb(252,210,194)']
                                                                  [0, 'red'],
                                                                  [1, 'red']
                                                                  ]
                                                          },
                                                            dataLabels:{enabled:true,formatter:function(){
                                                          // if(this.y==last_value){
                                                            if(this.x==new Date('2016-05-01T00:00:00.000+07:00').getTime()){
                                                                return 400;
                                                            }else{
                                                                return "";
                                                            }
                                                          
                                                            },//function
															align:"right",
															verticalAlign:"middle",
											   x:0,
											   y:0
                                                            },//dataLabels
															showInLegend:false
                                                          },
														  {//fake
									type:'line',name:"มีน้ำใช้สำหรับอุปโภคบริโภคและรักษาระบบนิเวศเพียงพอจนถึง 31 พ.ค.59",color:'Red',marker:{enabled:false},data:{}
														  }
                                                          ],
                                           legend: {
                                            enabled: true,
                                           verticalAlign: 'top',
                                          // align: 'middle',
                                           //y: 70,x:0,
                                           floating: false,
                                           borderWidth: 0,
											  
                                           }
                                //});
                      // alert(dat1);
                      });
    });//json
            

            
            
            
});