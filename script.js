"use strict";


const drawRoundRect=function(ctx,x,y,b,h,r){
	ctx.beginPath();
	ctx.arc(x+r, 	y+r, r, 1 * Math.PI, 1.5 * Math.PI);//links oben		
	ctx.arc(x+b-r, 	y+r, r, 1.5* Math.PI, 2 * Math.PI);//rechts oben
	ctx.arc(x+b-r, 	y+h-r, r, 0, 0.5 * Math.PI);//rechts unten
	ctx.arc(x+r, 	y+h-r, r, 0.5* Math.PI, 1 * Math.PI);//links unten
	
	ctx.closePath();
}
const getAbsolutePosition=function(childElement, parentElement){
    // Position des Eltern-Elements
    const parentRect = parentElement.getBoundingClientRect();
    
    // Position des Kind-Elements (relativ zum Viewport)
    const childRect = childElement.getBoundingClientRect();

    // Berechnung der Position des Kind-Elements relativ zum Eltern-Element
    const absolutePosition = {
        x: childRect.left - parentRect.left,
        y: childRect.top - parentRect.top
    };

    return absolutePosition;
}

const drawcross=function(ctx,x,y,bh,farbe){
	ctx.strokeStyle=farbe;
	ctx.lineWidth =1;
	ctx.beginPath();
	ctx.moveTo(x-bh*0.5,y);
	ctx.lineTo(x+bh*0.5,y);
	ctx.stroke();
	
	ctx.beginPath();
	ctx.moveTo(x,y-bh*0.5);
	ctx.lineTo(x,y+bh*0.5);
	ctx.stroke();
}


const drawFilledRoundedRect=function(ctx, x, y, width, height, radii, color) {
 	ctx.beginPath();
    ctx.moveTo(x + radii[0], y);
    ctx.lineTo(x + width - radii[1], y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radii[1]);
    ctx.lineTo(x + width, y + height - radii[2]);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radii[2], y + height);
    ctx.lineTo(x + radii[3], y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radii[3]);
    ctx.lineTo(x, y + radii[0]);
    ctx.quadraticCurveTo(x, y, x + radii[0], y);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

const drawArc=function(ctx, centerX, centerY, radius, startAngle, endAngle) {
 	// Grad in Bogenmaß umrechnen
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);
    ctx.arc(centerX, centerY, radius, startRad, endRad);
 }

const drawRoundedRectLines=function(ctx, x, y, width, height, radii, colors, sizes) {

	ctx.lineJoin = "round";	
	
	//oben
	if(sizes[0]>0){
		ctx.lineWidth=sizes[0];
		ctx.strokeStyle = colors[0];
		ctx.beginPath();
		if(radii[0]>0){
			drawArc(ctx,x+radii[0],y+radii[0], radii[0],315,360);
		}	
		ctx.moveTo(x + radii[0], y);
		ctx.lineTo(x + width - radii[1], y);
		if(radii[1]>0){
			drawArc(ctx,x+width-radii[1],y+radii[1], radii[1],0,45);
		}	
		ctx.stroke();
    }
	//rechts
	if(sizes[1]>0){
		ctx.lineWidth=sizes[1];
		ctx.strokeStyle = colors[1];
		ctx.beginPath();
		if(radii[1]>0){
			drawArc(ctx,x+width-radii[1],y+radii[1], radii[1],45,90);
		}	
		ctx.moveTo(x + width, y + radii[1]);
		ctx.lineTo(x + width, y + height - radii[2]);
		if(radii[2]>0){
			drawArc(ctx,x+width-radii[2],y+height-radii[2], radii[2],90,135);
		}	
		ctx.stroke();
    }
	//unten
	if(sizes[2]>0){
		ctx.lineWidth=sizes[2];
		ctx.strokeStyle = colors[2];
		ctx.beginPath();
		if(radii[2]>0){
			drawArc(ctx,x+width-radii[2],y+height-radii[2], radii[2],135,180);
		}		
		ctx.moveTo(x + width - radii[2], y + height);
		ctx.lineTo(x + radii[3] , y + height);
		if(radii[3]>0){
			drawArc(ctx,x+radii[3],y+height-radii[3], radii[3],180,225);
		}		
		ctx.stroke();
    }
	//links
	if(sizes[3]>0 ){
		ctx.lineWidth=sizes[3];
		ctx.strokeStyle = colors[3];
		ctx.beginPath();
		if(radii[3]>0){
			drawArc(ctx,x+radii[3],y+height-radii[3], radii[3],225,270);
		}		
		ctx.moveTo(x, y + height - radii[3] );
		ctx.lineTo(x, y + radii[0] );
		if(radii[0]>0){
			drawArc(ctx,x+radii[0],y+radii[0], radii[0],270,360-45);
		}	
		ctx.stroke();
	}
}

const drawBGBox=function(ctx,x,y,b,h ,styles ,node ,isalpha){			
	var r1=parseInt(styles.borderTopLeftRadius);
	var r2=parseInt(styles.borderTopRightRadius);
	var r3=parseInt(styles.borderBottomRightRadius);
	var r4=parseInt(styles.borderBottomLeftRadius);
	
	var w1=parseInt(styles.borderTopWidth);
	var w2=parseInt(styles.borderRightWidth);
	var w3=parseInt(styles.borderBottomWidth);
	var w4=parseInt(styles.borderLeftWidth);
	
	var c1=styles.borderTopColor;
	var c2=styles.borderRightColor;
	var c3=styles.borderBottomColor;
	var c4=styles.borderLeftColor;
	
	var isttransparent=false;
	if(styles.backgroundColor==="rgba(0, 0, 0, 0)")isttransparent=true;
	
	ctx.fillStyle = styles.backgroundColor;
	if(isalpha)ctx.fillStyle = "#ffffff";
	
	if(styles.borderTopLeftRadius.indexOf('px')<0)r1=0;
	if(styles.borderTopRightRadius.indexOf('px')<0)r2=0;
	if(styles.borderBottomRightRadius.indexOf('px')<0)r3=0;
	if(styles.borderBottomLeftRadius.indexOf('px')<0)r4=0;
	
	if(styles.borderTopWidth.indexOf('px')<0)w1=0;
	if(styles.borderRightWidth.indexOf('px')<0)w2=0;
	if(styles.borderLeftWidth.indexOf('px')<0)w3=0;
	if(styles.borderBottomWidth.indexOf('px')<0)w4=0;
	
	if(r1 > 0|| r2 >0 || r3 >0 || r4 >0 ){
		//hat rundungen
		if(!isttransparent){
			drawFilledRoundedRect(ctx,x,y,b,h,[r1,r2,r3,r4],ctx.fillStyle);
		}
	}
	else{
		//keine rundungen
		if(!isttransparent)
			ctx.fillRect(x,y, b,h);
	}
	
	if(	(w1>0 || w2>0 || w3>0 || w4>0) 
	){
		if(isalpha){
			c1="#ffffff";
			c2="#ffffff";
			c3="#ffffff";
			c4="#ffffff";
		}
		//border
		drawRoundedRectLines(ctx,x,y,b,h,[r1,r2,r3,r4],[c1,c2,c3,c4],[w1,w2,w3,w4]);
	}		
}
			


const htmltocanvas=function(optionen){
	var meinHTML=optionen.quelle,
		canvas=optionen.canvas,
		redata={"schalter":[]};
	
	if(canvas==undefined){
		console.error("kein Ziel",optionen);
		return redata;
	}
		
	var ctx = canvas.getContext('2d'),
		qscale=1,
		inputcolor="#0075ff",
		i
		;
	if(optionen["scale"])qscale=optionen["scale"];

	//clonen geht nicht, weil nicht gerendet

	var b=meinHTML.offsetWidth,
		h=meinHTML.offsetHeight
		;


	//canvas auf optimale größe setzen
	var validewerte=[64,128,256,512,1024,2048];
	if(optionen["autosize"]===true){//textur wird bei automatischer größe nicht aktualisiert :/
		canvas.width=validewerte.find(value => value >= b);
		canvas.height=validewerte.find(value => value >= h);
	}
	
	if(optionen["alphamap"]===true)
		ctx.fillStyle = "#000000";
	else
		ctx.fillStyle = "#ffffff";
	
	ctx.fillRect(0, 0, canvas.width,  canvas.height);
	
	ctx.save();
	
	var scaleX = 1;
	var scaleY = 1;
	if(optionen["autoscale"]===true){
		scaleX = canvas.width / b;
		scaleY = canvas.height / h;
		ctx.scale(scaleX, scaleY);
	}

	//console.log("html:",b,h,"canvas:",canvas.width,  canvas.height,"scale:", scaleX, scaleY);
	
	var linknodeliste=[];//sammlung für "A"-Tags
	
	const drawHTMLElement=function(node,data){
		var pstart,pend,i,iz,t,t2,cnode,worte,preworte,wort,cstyle,
			b,h,size,spacer,zhdiff,
			lineheight,maxb,tmp,out,arr,
			offsetXbreite,reinfo,nodestyles,cnodestyles,
			iswordwrap=true,			
			ctx=data.ctx,
			styles=window.getComputedStyle(node),
			
			padding={l:0,t:0,r:0,b:0},
			zielsize={w:0,h:0},
			outx,outy,
			xx=0,yy=0
			;
		
		var nodepos=getAbsolutePosition(node,meinHTML);	
			
		offsetXbreite=parseInt(styles.paddingLeft)+parseInt(styles.paddingRight);
		lineheight=parseInt(styles.fontSize);//+size.actualBoundingBoxDescent;
		b=node.offsetWidth;
		h=node.offsetHeight;
		ctx.fillStyle = styles.backgroundColor;
		if(optionen["alphamap"]===true)ctx.fillStyle = "#ffffff";
		
		if(styles["borderColor"]!=undefined){
			drawBGBox(ctx,nodepos.x,nodepos.y,b,h ,styles,node, optionen["alphamap"]===true);
		}		
		
		if(styles["whiteSpace"]==="nowrap"){
			iswordwrap=false;
		}		
		
		//Element
		padding.l=parseInt(styles.paddingLeft);
		padding.t=parseInt(styles.paddingTop);
		padding.r=parseInt(styles.paddingRight);
		padding.b=parseInt(styles.paddingBottom);
		
		maxb=b-padding.l-padding.r;//offsetXbreite;
		
		zielsize.w=b-padding.l-padding.r;
		zielsize.h=h-padding.t-padding.b;
		
		//start
		xx=nodepos.x;
		yy=nodepos.y;
		var startX=xx;
		var starty=yy;
		outx=xx;
		outy=yy;
		
		var childnodelist=node.childNodes;
		
		var beforeStyle,beforecontent,textinhalt,prop;
		//check auf before-Elemente ->lösche diese und ersetzt duch span-element
		//funktioniert, aber ändert DOM !
		
		//beforeStyle = window.getComputedStyle(node, "::before");
		//beforecontent=beforeStyle.getPropertyValue("content")
		//textinhalt=beforecontent.split('"').join('');
		
		for(i=0;i<node.childNodes.length;i++){
			cnode=node.childNodes[i];
			
			if(cnode.nodeName!=="#text" && cnode.nodeName!="IMG" ){
				cnodestyles=window.getComputedStyle(cnode);
				beforeStyle = window.getComputedStyle(cnode, "::before");
				beforecontent=beforeStyle.getPropertyValue("content")
				textinhalt=beforecontent.split('"').join('');
//console.log(cnode.nodeName,cnodestyles.display,	beforeStyle.display,cnode)				
				
				if(textinhalt!="none" && textinhalt!="-moz-alt-content"  && cnodestyles.display!="none" && 	beforeStyle.display!="none"){
					
					var tempnode=document.createElement("span");
					tempnode.innerHTML=textinhalt;

					tempnode.style.cssText = `
						display: ${beforeStyle.display};
						
						font-family: ${beforeStyle.fontFamily};
						font-style: ${beforeStyle.fontStyle};
						font-weight: ${beforeStyle.fontWeight};
						font-variant: ${beforeStyle.fontVariant};
						text-transform: ${beforeStyle.textTransform};
						line-height: ${beforeStyle.lineHeight};
						
						color: ${beforeStyle.color};
						font-size: ${beforeStyle.fontSize};
						text-align: ${beforeStyle.textAlign};
						
						position: ${beforeStyle.position};
						top: ${beforeStyle.top};
						left: ${beforeStyle.left};
						right: ${beforeStyle.right};
						bottom: ${beforeStyle.bottom};
						background: ${beforeStyle.background};
						margin: ${beforeStyle.margin};
						padding: ${beforeStyle.padding};
					`;
					
					//tempnode.userDataStyElmt=true;
					cnode.insertBefore(tempnode,cnode.firstChild);
					
					
					var deletetClasses="";
					
					cnode.classList.forEach(className => {
						const pseudoStyle = getComputedStyle(cnode, `.${className}::before`);
						if(pseudoStyle.content && pseudoStyle.content !== "none"){
							deletetClasses+=className+" ";
							//cnode.classList.remove(className);
						}
					});
					if(deletetClasses!=""){
						linknodeliste.push({"node":cnode,"deletetClasses":deletetClasses,"added":tempnode});
						
						arr=deletetClasses.trim().split(" ");
						for(t=0;t<arr.length;t++){
							cnode.classList.remove(arr[t]);
						}
					}
				}
			}
		}

	
	
		if(node.nodeName==="A" || node.nodeName==="BUTTON"){
			//console.log("a-butt>>>>",outx,outy,b,h,scaleX,scaleY,node);
			
			if(b>0 && h>0){
				redata.schalter.push({
					"node":node,
					"x": 1/canvas.width		*outx*scaleX,			//*scaleX
					"y": 1/canvas.height	*outy*scaleY,		//*scaleY
					"width":1/canvas.width	* b*scaleX,
					"height":1/canvas.height* h*scaleY
				});
			}
			//drawRoundedRectLines(ctx,outx,outy,b,h,[0,0,0,0],["red","red","red","red"],[1,1,1,1]);
		}
		
//console.log(childnodelist);		
		//
		for(i=0;i<childnodelist.length;i++){
			cnode=childnodelist[i];
			
			if(cnode.nodeName==="BR"){//umbruch
				zhdiff=0;
				size = ctx.measureText("test");
				if(size.fontBoundingBoxDescent!=undefined)
					zhdiff=size.fontBoundingBoxDescent;
				else{
					zhdiff=0;
					if(size.actualBoundingBoxDescent)zhdiff+=size.actualBoundingBoxDescent;
				}
				
				nodepos=getAbsolutePosition(cnode.parentElement,meinHTML);
				xx=nodepos.x;
				yy+=lineheight+zhdiff;
			}
			
//console.log("%c"+cnode.nodeName,"color:#999");
			
			if(cnode.nodeName!=="#text")
				cstyle=window.getComputedStyle(cnode);
		
			if(cnode.nodeName==="INPUT"){
				cstyle=window.getComputedStyle(cnode);
				
				ctx.fillStyle =cstyle.lightingColor;// "#ffffff";
				if(optionen["alphamap"]===true)ctx.fillStyle = "#ffffff";

				//ctx.strokeStyle = cstyle.borderColor;
				ctx.strokeStyle = cstyle.outlineColor;
				ctx.lineWidth = 1;//parseInt(cstyle.borderWidth);
				//ctx.lineWidth = parseInt(cstyle.strokeWidth);
				ctx.lineJoin = "round";
				if(cnode.type=="radio"){//console.log(cstyle);	
					if(cnode.checked){
						ctx.strokeStyle = inputcolor;
					}else{
						//ctx.strokeStyle = cstyle.borderColor;console.log(cstyle);//.color
						ctx.strokeStyle = cstyle.color;
					}
					ctx.beginPath();
					ctx.arc(
						cnode.offsetLeft+cnode.offsetWidth*0.5, 
						cnode.offsetTop+cnode.offsetHeight*0.5, 
						cnode.offsetWidth*0.5, 
						0, 2 * Math.PI);
					ctx.closePath(); 
					ctx.fill();
					ctx.stroke();
					
					if(cnode.checked){
						ctx.fillStyle = inputcolor;
						if(optionen["alphamap"]===true)ctx.fillStyle = "#ffffff";
						ctx.beginPath();
						ctx.arc(
							cnode.offsetLeft+cnode.offsetWidth*0.5, 
							cnode.offsetTop+cnode.offsetHeight*0.5, 
							cnode.offsetWidth*0.5-2, 
							0, 2 * Math.PI);
						ctx.closePath(); 
						ctx.fill();
					}
					
					redata.schalter.push({
						"node":cnode,
						"x": 1/canvas.width		*cnode.offsetLeft*scaleX,			//*scaleX
						"y": 1/canvas.height	*cnode.offsetTop*scaleY,		//*scaleY
						"width":1/canvas.width	* rb*scaleX,
						"height":1/canvas.height* rh*scaleY
					});
				}
				else
				if(cnode.type=="checkbox"){
					var rx=cnode.offsetLeft+0.5, 
						ry=cnode.offsetTop+0.5,
						rb=cnode.offsetWidth,
						rh=cnode.offsetHeight;
						
					if(cnode.checked){
						ctx.lineWidth = 2;
						ctx.strokeStyle = inputcolor;
						ctx.fillStyle = inputcolor;
						if(optionen["alphamap"]===true)ctx.fillStyle = "#ffffff";
						drawRoundRect(ctx,rx,ry,rb,rh,2);
						ctx.fill();
						ctx.stroke();
						//Häkchen
						ctx.strokeStyle = cstyle.lightingColor;
						ctx.beginPath();
						ctx.moveTo(rx+rb*0.15,ry+rh*0.5);
						ctx.lineTo(rx+rb*0.40,ry+rh*0.8);
						ctx.lineTo(rx+rb*0.85,ry+rh*0.25);
						ctx.stroke();
					}else{
						drawRoundRect(ctx,rx,ry,rb,rh,2);
						ctx.fill();
						ctx.stroke();
					}
					
					redata.schalter.push({
						"node":cnode,
						"x": 1/canvas.width		*cnode.offsetLeft*scaleX,			//*scaleX
						"y": 1/canvas.height	*cnode.offsetTop*scaleY,		//*scaleY
						"width":1/canvas.width	* rb*scaleX,
						"height":1/canvas.height* rh*scaleY
					});
				}
				else{
					ctx.fillRect(cnode.offsetLeft+0.5, 
						cnode.offsetTop+0.5,
						cnode.offsetWidth,
						cnode.offsetHeight);
						
					
					ctx.strokeRect(cnode.offsetLeft+0.5, 
						cnode.offsetTop+0.5,
						cnode.offsetWidth,
						cnode.offsetHeight);
								
				}
				//Text: cnode.value
				var inptextsize=ctx.measureText(cnode.value);
				
				
				//console.log(inptextsize);
				//console.log(">>",cnode.type,cnode.value);
				if(cnode.type=="text"){
					ctx.fillStyle = cstyle.color;
					if(optionen["alphamap"]===true)ctx.fillStyle = "#ffffff";
					
					ctx.font = cstyle.font;
					
					outx =cnode.offsetLeft+parseInt(cstyle.paddingLeft)+1;
					outy =cnode.offsetTop+4
							+inptextsize.actualBoundingBoxAscent
							+inptextsize.actualBoundingBoxDescent
							+parseInt(cstyle.paddingTop);					
					
					if(cstyle.textAlign==="center"
						|| cstyle.justifyContent==="center"
					){
						outx = cnode.offsetLeft+cnode.offsetWidth*0.5 -inptextsize.width*0.5;
					}
					if(cstyle.textAlign==="right"){
						outx = cnode.offsetLeft -inptextsize.width - padding.r;
					}
					
					//vertikal immer mittig
					ctx.textBaseline="middle";//default
					outy=cnode.offsetTop+node.offsetHeight*0.5;
					
					if(cstyle["display"]!="none")
						ctx.fillText(cnode.value,outx,outy);
					//drawcross(ctx,outx,outy,6,styles.color);
				}
				
			}
			else
			if(cnode.nodeName==="IMG"){
				ctx.drawImage(cnode, 
					cnode.offsetLeft, 
					cnode.offsetTop,
					cnode.offsetWidth,
					cnode.offsetHeight);
			}
			else
			if(cnode.nodeName==="#text")
			{
				
				if(cnode.data!=undefined 
					&& cnode.data!="\n\t"
					&& cnode.data!="\n" 
					&& cnode.data!="\n\n"
					&& cnode.data!="\n\n\t"
					){
					
					ctx.fillStyle = styles.color;
					if(optionen["alphamap"]===true)ctx.fillStyle = "#ffffff";
					ctx.font = styles.font;
					
					//einzelne Worte
					preworte=cnode.data;
					preworte=preworte.split('\n').join('');
					preworte=preworte.split('\t').join('');
					preworte=preworte.split(" ");


					
					worte=[];
					for(t=0;t<preworte.length;t++){
						tmp=preworte[t];
						if(tmp.indexOf('-')>-1 && tmp!="-"){//Worttrennungen
							arr=tmp.split(/(?=-)|(?<=-)/);
							for(t2=0;t2<arr.length;t2++){
								if(arr[t2]=="-"){
									worte[worte.length-1]=worte[worte.length-1]+'-';
								}
								else{
									if(arr[t2].length>0){
										worte.push(arr[t2]);
									}
								}
							}
						}
						else{
							if(tmp.length>0){
								worte.push(tmp);
							}
						}
					}					
					
					tmp="";
					out="";
					

					size = ctx.measureText(worte.join(' '));
					if(size.fontBoundingBoxDescent!=undefined)
						zhdiff=size.fontBoundingBoxDescent;
					else{
						zhdiff=0;
						if(size.actualBoundingBoxDescent)zhdiff+=size.actualBoundingBoxDescent;
					}

					
					for(t=0;t<worte.length;t++){
						wort=worte[t];
						spacer=" ";
						if(wort.charAt(wort.length-1)==="-")
							spacer='';
						
						tmp+=wort+spacer;
						size = ctx.measureText(tmp);	//breite der gesammelten Worte + neues Wort
						
						if(( (size.width+xx)>=maxb && iswordwrap) || t==worte.length-1){//Breite überschreitet maximale breite, oder rest
							if(t==worte.length-1)out+=''+wort; //Rest
						
							if(out.length>0){//Zeile ausgeben

								size = ctx.measureText(out);
								
								outx =xx+padding.l;
								outy =yy+lineheight+padding.t;					
								
								ctx.textAlign = "left";
								ctx.textBaseline="alphabetic";//default
								ctx.fillStyle = styles.color;
								if(optionen["alphamap"]===true)ctx.fillStyle = "#ffffff";
					
								if(styles.textAlign==="center"
									|| styles.justifyContent==="center"
								){
									outx = xx + b*0.5 -size.width*0.5;
								}
								if(styles.textAlign==="right"){
									outx = xx + b -size.width - padding.r;
								}
								
								if(styles.alignItems==="center"){
									//vertikal centriert
									outy=yy+node.offsetHeight*0.5;
									ctx.textBaseline="middle";
								}
//if(node.nodeName==="A")console.log(styles.alignItems,lineheight,node.offsetHeight,size,node);								
								//drawcross(ctx,outx,outy,6,styles.color);		

								ctx.fillText(out,outx,outy);//Zeile ausgeben
								
								//nächste Zeile
								if(t<worte.length-1){
									yy+=lineheight+zhdiff;
									xx=startX;
								}
							}
							
							out="";			//neue Zeile
							tmp=wort+spacer;//Messzeile						
						}
						
						out+=wort+spacer;//Zeile Wort hinzufügen & merken
					}
				
				}				
			}
			else
			if(cnode.nodeName==="CANVAS"){
				//nicht wenn Alpha!
				if(!(optionen["alphamap"]===true))
					ctx.drawImage(cnode, 
						cnode.offsetLeft, 
						cnode.offsetTop,
						cnode.offsetWidth,
						cnode.offsetHeight);				
			}
			else
			{
				//console.log(cnode.nodeName,cstyle);
			}
			
			if(cnode.childNodes.length>0){
				reinfo=drawHTMLElement(cnode,{"ctx":ctx});
//console.log(reinfo);
				xx=reinfo.x+reinfo.width;
				//yy=reinfo.y;//-reinfo.height-reinfo.zdiff;//bleibt
			}
			
		}//i
		
		return {"width":b,"height":h,"x":outx,"y":outy}
	}

	drawHTMLElement(meinHTML,{"ctx":ctx});
	
	
	//DOM-Manipulationen (before) rückgängig machen
	var o;
	for(i=0;i<linknodeliste.length;i++){
		o=linknodeliste[i];
		o.node.className+=o.deletetClasses;
		if(o["added"]!=undefined)o.added.remove();
	}
	
	
	ctx.restore();
	//ctx.fillStyle = "#000000";
	//ctx.fillRect(0, 0, canvas.width*0.5,  canvas.height*0.5);
	
	return redata;
}

export{htmltocanvas}
