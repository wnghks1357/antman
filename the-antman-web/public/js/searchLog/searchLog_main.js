var index_title;
var propArr = new Array();			//인덱스 선택 시 전체 field 가져오는 변수
var totalRows;//전체 데이터 개수
var w_size=10; //데이터 개수
var p_size=10;//페이지 개수
var cur_page;//현재 페이지 번호
var pageCount;//페이지 총 개수
var startPage=1;//시작 페이지
var d = new Date();

// 개발환경 설정에 따라서 URL 변경 관리
var pref_url = "https://api.adpt.pe.kr/search";	// 운영
if ($("#node_env").val() == 'development') {
  pref_url = "http://localhost:3001"; // 개발
}

$(document).ready(function() {
	$(window).resize(function(){
		$("#interval_select").change();
	});
	
	//--Bootstrap Date Picker--
	$('.date-picker').datepicker({
		useCurrent: false,
		format: "yyyy-mm-dd",
		language: "ko",
		defaultViewDate: "today"
	});

	//--Bootstrap Time Picker--
	$('.timepicker').timepicker({
		showMeridian: false,	// 24시간으로 표기
		showSeconds: true,		// 초 단위 표기
		minuteStep: 1,			// 분 단위 step 1분
		secondStep: 1,			// 초 단위 step 1초
		timeFormat: 'HH:mm:ss',	// 시간 포맷 (시간 설정 이상 확인 필요)
		showInputs: false		// input 박스에 정보 입력 시 시간이 업데이트 되지 않음 -확인 필요(bug)
	});
	
	$(document).on("click", ".colChk", function(){  
		var idx = jQuery.inArray(this.value, propArr);
		
		if($(".colChk:checked").length == 0){
			alert("field를 한개 이상 선택하세요!");
			return false;
		};
		
        if($(this).is(":checked")){
        	$('th:eq(' + idx + ')').show();
        	$('#searchLogTable tr').each(function() { 
                $('td:eq(' + idx + ')',this).show();
            });
        }else{
        	$('th:eq(' + idx + ')').hide();
        	$('#searchLogTable tr').each(function() { 
                $('td:eq(' + idx + ')',this).hide();
            });
        }
    });
	
	$("#addColumnBtn").on("click", function() {
		if($("#fieldList").css("display") == "none"){
			$("#fieldList").show();
		}else{
			$("#fieldList").hide();
		}
	});
	
	var todayString = fnGetToday();
  
	// 조회시간 기본값 설정 (오늘 날짜)
	$('#datepicker1').val(todayString);
	$('#datepicker2').val(todayString);
	
	// autoclose:true 일자 선택 시 달력 창 닫게 처리
	$('#datepicker1').datepicker().on('changeDate', function(ev){ 
		$('#datepicker1').datepicker('hide');
	});
	$('#datepicker2').datepicker().on('changeDate', function(ev){
		$('#datepicker2').datepicker('hide');
	});

	$('#timepicker1').timepicker('setTime', '00:00:00');
	$('#timepicker2').timepicker('setTime', new Date());	
	
	//테스트용
	$("#indexList").append("<option value=" + "gitlab-access*" + ">" + "gitlab-access*" + "</option>");
	$("#indexList").append("<option value=" + "apigw-*" + ">" + "apigw-*" + "</option>");
	index_title = "gitlab-access*";
	fnGetFields();
	//fnDrawChart($("#indexList").val, null, null, null, "1h");
	
	//index에 대한 click 이벤트 바인딩
	$("#indexList").on("change", function() {
		index_title = $(this).val();
		
		fnGetFields();
		fnDefaultSearchLog();
		//fnGetColumn(index_title, p_size, 1);
	});

//	$.ajax({
//		type: 'GET',
//		url: pref_url + "/v1/getIndex",
//		success: function(result) {
//			console.log("[getIndex] ##RESULT : " + JSON.stringify(result));
//			result = result.replace(/^\s+|\s+$/g, ''); //trim
//			var indexTitleList = result.split("\n");
//			index_title = indexTitleList[0];
//			for (var i = 0; i < indexTitleList.length; i++) {
//				$("#indexList").append("<option value=" + indexTitleList[i] + ">" + indexTitleList[i] + "</option>");
//			}
//			fnGetFields(index_title);
//			fnDefaultSearchLog();
//			
//			// index에 대한 click 이벤트 바인딩
//			$("#indexList").on("change", function() {
//				index_title = $(this).val();
//				fnGetFields(index_title); //get index fields
//				fnDefaultSearchLog();
//			});
//		}
//	});
	
	$("#searchText").on("keydown", function(key) {
		if (key.keyCode == 13) { //키가 13이면 실행 (엔터는 13)
			$("#btnSearchLog").click();
		}
	});

	$("#btnSearchLog").on("click", function() {
		var searchDate=[];
		var startDate = "";
		var endDate = "";
		
		searchDate = fnGetDate();
		
		startDate = searchDate[0];
		endDate = searchDate[1];
		
		startPage=1;
		fnSearchLog(index_title, $("#searchText").val(), startDate, endDate, 1);
		fnDrawChart(index_title, $("#searchText").val(), startDate, endDate, $("#interval_select").val());
	});
	
	function fnGetDate(){
		
		var searchDate=[];
		var startDate="";
		var endDate="";
		
		if ($("#timepicker1").val().length==7 ){
			startDate = $("#datepicker1").val() + " 0" + $("#timepicker1").val();
		} else {
			startDate = $("#datepicker1").val() + " " + $("#timepicker1").val();
		}
		
		if ($("#timepicker2").val().length==7 ){
			endDate = $("#datepicker2").val() + " 0" + $("#timepicker2").val();
		} else {
			endDate = $("#datepicker2").val() + " " + $("#timepicker2").val();
		}
		
		searchDate[0]=startDate;
		searchDate[1]=endDate;
		return searchDate;
	}
	
	//차트 x축 구현 단위 변경 시 이벤트
	$("#interval_select").on("change",function(){
		if($("#searchText").val() != null || $("#searchText").val() != ""){
			//$("#btnSearchLog").click();
			var searchDate =fnGetDate();
			var startDate = searchDate[0];
			var endDate = searchDate[1];
			
			fnDrawChart(index_title, $("#searchText").val(), startDate, endDate, $("#interval_select").val());
		}
	});
});

function selectAll(){
	$("input[type=checkbox]").click();
}

function fnSearchLog(index_title, query_param, startDate, endDate, cur_page) {
	var startData=0;
	if(cur_page != null && cur_page != ""){
		startData = (cur_page * w_size) -w_size;//페이지 시작 데이터 가져오기
	}
	
	$.ajax({
		type: 'POST',
		url: pref_url + "/v1/searchLog",
		headers: {'Content-Type': 'application/json'},
		dataType : "json",
		data: JSON.stringify({
			index: index_title,
			size: w_size,		//가져올 데이터 개수
			from: startData,	//가져올 데이터 시작 번호 (from 부터 size 만큼 가져온다)
			body: (query_param==null)?{}:{
				query: {
					"bool": {
						"must": [
						         { "match": { "message": query_param } },
						         { "range" :{ "@timestamp" : {"gte" : startDate,
						        	 						  "lte" : endDate,
						        	 		  "format" : "yyyy-MM-dd HH:mm:ss"}}}
						         ]
					}
				},
				"sort": [
				         { "@timestamp": "asc" }
				         ],
				highlight: {
					require_field_match: false,
					fields: {
						"*": {
							"pre_tags": ["<mark>"],
							"post_tags": ["</mark>"]
						}
					}
				}
			}
		}),
		
		success: function(result) {
			console.log("[searchLog] ##RESULT : " + JSON.stringify(result));

			$("#searchLogTable thead").empty();
			$("#searchLogTable tbody").empty();
			fnGetFields();

			totalRows = result.total;	//전체 데이터 개수
			// 검색 결과가 0일때
			if(totalRows ==0){
				$("#searchLogTable > tbody").append("<tr></tr>");
				$("#searchLogTable > tbody > tr").append("<td colspan='" + propArr.length +"'>조회결과가 없습니다.</td>");
				return;
			}

			// 페이징 처리
			$("#pageDiv").empty();
			
			//1번 페이지를 눌렀을 때 value가 0이 찍히는 예외 처리
			if(cur_page < 1){
				cur_page =1;
			}

			pageCount = ( (totalRows - 1) / w_size) + 1;	//전체 페이지 개수
			
			//startPage = ( ( cur_page - 1 ) / p_size ) * p_size + 1;	//시작 페이지 번호 
			
			endPage = Math.min( startPage + p_size - 1 , pageCount ); //마지막 페이지 번호

			console.log("startPage + p_size - 1 = "+ (startPage + p_size - 1));
			console.log("pageCount = "+ pageCount);
			console.log("cur_page=" + cur_page);
			console.log("startPage=" + startPage);
			console.log("endPage=" + endPage);

			// 페이지 번호가 1보다 크면 prev 버튼 표시
			if(startPage > 1){
				$("#pageDiv").append($("<li><a href='#none'><<</a></li>").click(function(event){ fnPrevPage(index_title, query_param, startDate, endDate); }));        	
			}
			// 페이징 버튼 생성. 클릭 이벤트 발생시 매개변수를 던지는 중 문제가 있어 아래와 같이 이벤트 핸들러를 사용하여 구현.
			for(var i=startPage; i<= endPage; i++){
				if(cur_page == i) {
					$("#pageDiv").append($("<li class='active'><a href='#none'>"+i+"<span class='sr-only'>(current)</span></a></li>").click(function(event){fnSearchLog(index_title, query_param, startDate, endDate, this.value);}));			
				} else {
					$("#pageDiv").append($("<li value='" + i + "'><a href='#none'>"+i+"</a></li>").click(function(event){fnSearchLog(index_title, query_param, startDate, endDate, this.value);}));	
				}
			}
			// 마지막 페이지보다 전체 페이지 수량이 더 크면 next 표시
			if(endPage < Math.floor(pageCount)){
				$("#pageDiv").append($("<li><a href='#none'>>></a></li>").click(function(event){ fnNextPage(index_title, query_param, startDate, endDate); }));
			}
    
			// 반복문으로 데이터 검색
			console.log("result.total=" + result.total);
			console.log("result.hits.length=" + result.hits.length);
			console.log("endPage=" + endPage);
			console.log("propArr.length=" + propArr.length);
			
			for(var j = 0; j < result.hits.length; j++) {
				if(result.hits[j]._source!= null){
					var table_string = "";
					for(var i = 0; i < propArr.length; i++) {
						target_key = result.hits[j]._source;
						
						var keyArr2 = propArr[i].split(".");
						for(subkey in keyArr2){//for of를 IE에서 지원하지 않는 문제로 인한 소스 변경
							if(keyArr2[subkey] == "message") {
								target_key = (result.hits[0].highlight==null)?target_key[keyArr2[subkey]]:result.hits[j].highlight.message;
							} else {
								target_key = target_key[keyArr2[subkey]];
							}
						}
						table_string += "<td class='" + propArr[i] + "'>" + target_key + "</td>";
						//console.log("[" + i + "]" + table_string);
					}
					$("#searchLogTableBody").append("<tr>" + table_string + "</tr>");
				}
			}
		}
	});
}

//prev 버튼 클릭 이벤트
function fnPrevPage(index_title, query_param, startDate, endDate){
	//시작 페이지가 p_size보다 작을시 처리
	if(startPage < p_size){
		endPage=p_size;
	}else{
		endPage = startPage-1;
	}
	startPage = endPage -9;
	fnSearchLog(index_title, query_param, startDate, endDate, startPage);
}

//next 버튼 클릭 이벤트
function fnNextPage(index_title, query_param, startDate, endDate){
	startPage = endPage +1;
	endPage = startPage+p_size-1;
	fnSearchLog(index_title, query_param, startDate, endDate, startPage);
}

function changePagesize(size) {
	startPage=1;
	w_size = size;
	fnDefaultSearchLog();
}

function fnDefaultSearchLog() {
	var startDate = "";
	var endDate = "";
	if ($("#timepicker1").val().length==7 ){
		startDate = $("#datepicker1").val() + " 0" + $("#timepicker1").val();
	} else {
		startDate = $("#datepicker1").val() + " " + $("#timepicker1").val();
	}
	if ($("#timepicker2").val().length==7 ){
		endDate = $("#datepicker2").val() + " 0" + $("#timepicker2").val();
	} else {
		endDate = $("#datepicker2").val() + " " + $("#timepicker2").val();
	}
	fnSearchLog(index_title, $("#searchText").val(), startDate, endDate, 1);
}

function fnDrawChart(index_title, query_param, startDate, endDate, interval){
	$.ajax({
		type: 'POST',
		url: pref_url + "/v1/drawChart",
		headers: {'Content-Type': 'application/json'},
		dataType : "json",
		data: JSON.stringify({
			index: index_title,
			//index: "gitlab-access-*",	// 추후 수정 예정
			size: 0,
			body: (query_param==null)?{}:{
				query:{
					"bool":{
						"must":[{
							"match": {"message" :query_param}},
							{ "range" :{ "@timestamp" : {
								"gte" : startDate,
  	 						  	"lte" : endDate,
  	 						  	"format" : "yyyy-MM-dd HH:mm:ss"}}}
							]
					}
				},
				aggs:{
					"group_by_timestamp":{
						"date_histogram": {
							"field": "@timestamp",
							"interval": interval
						}
					}
				}
			}
		}),
		success: function(result) {
			console.log("========= chart =========");
			var aggregations = result.aggregations;
			var buckets = aggregations.group_by_timestamp.buckets;

			var labelsArray =[];
			var chartDataArray = [];
			
			labelsArray = labelNames(buckets, interval);
			
			for(var i=0; i< buckets.length; i++){

				chartDataArray[i] = Number(buckets[i].doc_count);
			}

			//이전의 캔버스를 삭제
			$("#canvasDiv").empty();
			$("#canvasDiv").append('<canvas class="my-4 w-100" id="myChart" width="900" height="380"></canvas>');

			//차트 그리는 코드
			var ctx = document.getElementById("myChart");
			var config = {
					type: "Line",	//line, bar, pie..
					data: {
						labels: labelsArray,
						datasets: [{
							data: chartDataArray,
							lineTension: 0,
							backgroundColor: 'transparent',
							borderColor: '#007bff',
							borderWidth: 4,
							pointBackgroundColor: '#007bff'
						}]
					},
					options: {
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero: false
								}
							}]
						},
						legend: {
							display: false,
						},
						scaleoverride: true,
						responsive: true,
						maintainAspectRatio: false
					}
			};
				
			var myChart2 = new Chart.Line(ctx, config);
		},
	});
}

//오늘 날짜 반환 함수
function fnGetToday(){
	
	var year = d.getFullYear();
	var month = '' + (d.getMonth() + 1);
	var day = '' + d.getDate();
	if (month.length < 2) {
		month = '0' + month; 
	}
	if (day.length < 2) {
		day = '0' + day;
	}

	return year + "-" + month + "-" + day;
}



//그래프의 x축에 출력될 라벨 이름 출력
function labelNames(buckets, interval){
	
	var startText =0;
	var labelsArray =[];
	
	if(interval == '1s'){//초단위
		startText = 14;
	}else if(interval =='1m'){//분단위
		startText = 11;
	}else if(interval =='1h'){//시단위
		startText = 8;
	}else if(interval =='1d'){//일단위
		startText = 5;
	}else if(interval =='1M'){//월단위
		startText = 2;
	}
	
	for(var i=0; i< buckets.length; i++){
		labelsArray[i] = buckets[i].key_as_string.substr(startText, 5);//"key_as_string":"2018-07-09T05:00:00.000Z"
	}
	return labelsArray;
}

//field 호출 함수
function fnGetFields() {
	// index_title과 일치하는 1개의 index를 가져옴
	$.ajax({
	    type: 'POST',
	    url: pref_url + "/v1/searchLog",
	    dataType: 'json',
	    async: false,
	    data: {
	      index: index_title,
	      size: 1,
	      body: JSON.stringify({               // 180718 수정
	            "sort": [{"@timestamp" : "desc"}]
	         })
	    },
	    success: function(result) {
	    	
	    	console.log("==field==");
	    	
	    	propArr = [];
	    	
	    	$("#searchLogTable > thead").empty();
	    	$("#fieldList").empty();            // 180718 수정
	    	
	    	var $tabHd = $('<tr></tr>').addClass('tabHd');
	    	var $index = $('<div></div>').addClass('header').append('<span>' + index_title + '</span>');            // 180718 수정

	    	// index내에 있는 _source의 key(field)를 배열 key에 저장
	    	for (var key in result.hits[0]._source) {
	    		
	            var fieldLists = result.hits[0]._source;
	            var subkey = new Array();
	            
	            // subkey를 가지고 있는 field의 subkey를 저장
	            for (var k in fieldLists[key]) {
	            	
	              var ls = fieldLists[key];
	              
	             if (typeof(ls) == "object") {
	            	 subkey = Object.keys(ls);
	              }
	            }
	            
				// subkey의 유무 및 subkey명이 String인 경우에만 key와 subkey를 합쳐
				// key.subkey의 형식으로 만듬
	            if(subkey.length == 0) {	
	            	propArr.push(key);	
	            } else {
	            	for(var q in subkey){
	            		if(Object.keys(subkey) == 0){
	            			propArr.push(key);
	            			break;
	            		} else {
	            			propArr.push(key + '.' + subkey[q]);
	            		}
	            	}
	            }
	    	}
	    	
    	$("#fieldList").append($index);            // 180718 수정
    	var $content = $('.content');         	   // 180718 수정
    	
		// field명을 저장한 propArr를 정렬 후 출력
	    	for(key in propArr.sort()){
	    		$tabHd.append('<th class="' + propArr[key] + '"><span>'+ propArr[key] +'</span></th>');
	    		$content.append('<div><span><input type="checkbox" style="position:static; opacity:1;" class="colChk" value="' + propArr[key] + '"/>' + propArr[key] + '</span></div>');            // 180718 수정
	    	}	
	    	//$(".colChk").trigger("click");
	    	selectAll();
	    	$("#searchLogTable > thead").append($tabHd);
	    }
	});
}

