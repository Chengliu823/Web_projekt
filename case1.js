function vonButtonOnClick(){
	let btn1 =document.getElementById('button1');
	let btn2 =document.getElementById('button2');
	var buttonFlag =true;

	getData(buttonFlag);

	btn1.classList.add('active');
	btn2.classList.remove('active');
}

function nachButtonOnClick(){
	let btn1 =document.getElementById('button1');
	let btn2 =document.getElementById('button2');

	var buttonFlag=false;
	getData(buttonFlag);

	btn1.classList.remove('active');
	btn2.classList.add('active');

}


function getData(buttonFlag){
	startCounter=0;


	$.ajax({
		url:"http://localhost/Fahrt.json",
		type:"GET",
		dataType:"JSON",
		data:JSON.stringify({}),
		success:function(data){
			let box =document.getElementById('list');
			box.innerHTML = '';

			for(var i=0; i<data.length; i++){

				var from =data[i].from;
				var to =data[i].to;
				var starttime =data[i].starttime;
				var endtime=data[i].endtime;

				if(buttonFlag){
					if(from =='Frankfurt(Main) Hbf'){
						creatList(box,startCounter,from,to,starttime,endtime);
						startCounter++;
					}
					if(startCounter>=5){
						break;
					}
				}else{
					if(to =='Frankfurt(Main) Hbf'){
						creatList(box,startCounter,from,to,starttime,endtime);
						startCounter++;
					}
					if(startCounter>=5){
						break;
					}
				}

			}
		}
	})
}

function creatList(box,startCounter,from,to,starttime,endtime){


	let newDiv =document.createElement('div');
	newDiv.id ='a1';

	showTripInfo(box,newDiv,from,to,starttime,endtime);


}

function calculation(starttime,endtime){
	let resultTravelTime;
	let startTimeList =starttime.split(":");
	let startHour =parseInt(startTimeList[0],10);
	let startMin =parseInt(startTimeList[1],10);
	let starttimeInfo=startHour*60 + startMin;

	let endTimeList =endtime.split(":");
	let endHour =parseInt(endTimeList[0],10);
	let endMin =parseInt(endTimeList[1],10);
	let endtimeInfo=  endHour*60 + endMin;

	travelTime=endtimeInfo-starttimeInfo;
	travelTimeHour=Math.floor(travelTime/60);
	travelTimeMin=travelTime % 60;

	if(travelTime>=60){
		resultTravelTime =travelTimeHour+'h '+travelTimeMin+'min';
	} else{
		resultTravelTime =travelTimeMin+'min';
	}

	return resultTravelTime;
}


function showTripInfo(box,newDiv,from,to,starttime,endtime){

	let newp1 = document.createElement('p');
	newp1.id='b1';

	let p1span1 =document.createElement('span');
	p1span1.innerHTML= from;
	p1span1.className='left_span';

	let p1span2 =document.createElement('span');
	p1span2.className='right_span';
	p1span2.innerHTML =to;

	newp1.appendChild(p1span1);
	newp1.appendChild(p1span2);

	// second box
	let newp2 =document.createElement('p');
	newp2.id='b2';

	p2span1 =document.createElement('span');
	p2span1.id='start_point';

	p2span2=document.createElement('span');
	p2span2.className='middle_span';
	p2span2.innerHTML=calculation(starttime,endtime);

	p2span3 =document.createElement('span');
	p2span3.id='line';

	p2span4 =document.createElement('span');
	p2span4.id='end_point'
	newp2.appendChild(p2span1);
	newp2.appendChild(p2span4);
	newp2.appendChild(p2span2);
	newp2.appendChild(p2span3);

	//third box
	let newp3 = document.createElement('p');
	newp3.id='b3';
	let newp3span1 =document.createElement('span');

	newp3span1.className='left_time_span';
	newp3span1.innerText= starttime + " Uhr";

	let newp3span2 =document.createElement('span');
	newp3span2.className ='right_time_span';
	newp3span2.innerText = endtime + " Uhr";

	newp3.appendChild(newp3span1);
	newp3.appendChild(newp3span2);

	newDiv.appendChild(newp1);
	newDiv.appendChild(newp2);
	newDiv.appendChild(newp3);
	box.appendChild(newDiv);
}