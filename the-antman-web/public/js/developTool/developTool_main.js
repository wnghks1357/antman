// 개발환경 설정에 따라서 URL 변경 관리
var pref_url = "/api";                // 운영
if ($("#node_env").val() == 'development') {
  pref_url = "http://localhost:3001"; // 개발
}

$(document).ready(function(){
	;
});
