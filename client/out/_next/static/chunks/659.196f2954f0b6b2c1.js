"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[659],{9659:function(t,e,o){o.r(e);var a=o(5893),n=o(6483),l=o(7294);e.default=function(t){var e=function(t){var e=Number((100*Math.abs(t)).toPrecision(15));return Math.round(e)/100*Math.sign(t)},i=function(t){for(var o=[],a=0,n=g.values.length;a<n;a++)if(a<t)o.push("-");else{for(var l=0,i=0;i<t;i++)l+=+g.values[a-i][1];o.push(e(l/t))}return o},r=36e5,s=(0,l.useState)([["01/01/2071 ",0,0,0,0]]),c=s[0],h=s[1];(0,l.useEffect)((function(){var e=o(9669),a={method:"post",url:"http://127.0.0.1:5000/hour-graph",headers:{"Content-Type":"text/plain"},data:'"'.concat(t.comp_name,'"')};e(a).then((function(e){window.localStorage.setItem('"'.concat(t.comp_name,'"'),JSON.stringify(e.data)),h(JSON.stringify(e.data))})).catch((function(t){console.log(t)}));var n=setInterval((function(){e(a).then((function(e){window.localStorage.setItem('"'.concat(t.comp_name,'"'),JSON.stringify(e.data)),h(JSON.stringify(e.data))})).catch((function(t){console.log(t)}))}),r);return function(){return clearInterval(n)}}),[r,t.comp_name]);var m,u=JSON.parse(window.localStorage.getItem('"'.concat(t.comp_name,'"')));if(null!=u&&0!=u.length||(u=c),u.length<10)for(var p=u.length;p<10;p++)u[p]=[p,null,null,null,null,null],u[0]=["01/01/2071 ",0,0,0,0];var d=4*u.length-65,y=4*u.length-65,f=4*u.length,g=function(t){for(var e=[],o=[],a=0;a<t.length;a++)e.push(t[a].splice(0,1)[0]),o.push(t[a]);return{categoryData:e,values:o}}(u);return m={tooltip:{trigger:"axis",axisPointer:{type:"cross"}},grid:{left:"3%",right:"0%",top:"3%",bottom:"10%",backgroundColor:"#141414",show:!0,borderWidth:0},xAxis:{type:"category",data:g.categoryData,boundaryGap:!1,axisLine:{onZero:!1},splitLine:{show:!1},min:"dataMin",max:"dataMax"},yAxis:{scale:!0,splitArea:{show:!1},splitLine:{show:!1}},dataZoom:[{type:"inside",xAxisIndex:[0,1],start:d,end:f},{show:!1,type:"slider",top:"90%",start:y,end:f}],series:[{name:"Daily Price",type:"candlestick",data:g.values,itemStyle:{color:"#72B176",color0:"#B85723",borderColor:"#72B176",borderColor0:"#B85723"},markPoint:{label:{formatter:function(t){return null!=t?Math.round(t.value)+"":""}},tooltip:{formatter:function(t){return t.name+"<br>"+(t.data.coord||"")}}},markLine:{symbol:["none","none"],data:[[{name:"from lowest to highest",type:"min",valueDim:"lowest",symbol:"circle",symbolSize:5,label:{show:!1},emphasis:{label:{show:!1}}},{type:"max",valueDim:"highest",symbol:"circle",symbolSize:5,label:{show:!1},emphasis:{label:{show:!1}}}]]}},{name:"MA1",type:"line",data:i(3),smooth:!0,showSymbol:!1,lineStyle:{opacity:.6,width:1.5}},{name:"MA2",type:"line",data:i(5),smooth:!0,showSymbol:!1,lineStyle:{opacity:.6,width:1.5,symbolSize:.01}},{name:"MA3",type:"line",data:i(10),smooth:!0,showSymbol:!1,lineStyle:{opacity:.6,width:1.5}},{name:"MA4",type:"line",data:i(15),smooth:!0,showSymbol:!1,lineStyle:{opacity:.8}}]},(0,a.jsx)(n.Z,{style:{height:430,width:1240,marginTop:"2.25em",marginLeft:"0em"},option:m})}}}]);