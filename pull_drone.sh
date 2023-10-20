
  wget https://imagebreed.org/breeders/drone_rover \
  --header='Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
  --header='Cookie: _ga=GA1.1.890069034.1686584540; user_prefs=None; sgn_session_id=tkzsxojbrlmuppiapshdtwfgdemcsdjhydjvmtcjvvrctbzktkojqvmeijapdjbgiargvgg; _ga_EHE4JHN9L4=GS1.1.1686598230.2.1.1686599154.23.0.0' \
  --header='Pragma: no-cache' \
  --header='Referer: http://localhost:8000/breeders/drone_rover' \
  --page-requisites -P drone_rover.static/

  wget https://imagebreed.org/breeders/drone_imagery \
  --header='Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
  --header='Cookie: _ga=GA1.1.890069034.1686584540; user_prefs=None; sgn_session_id=tkzsxojbrlmuppiapshdtwfgdemcsdjhydjvmtcjvvrctbzktkojqvmeijapdjbgiargvgg; _ga_EHE4JHN9L4=GS1.1.1686598230.2.1.1686599154.23.0.0' \
  --header='Pragma: no-cache' \
  --page-requisites -P drone_imagery.static/


wget https://imagebreed.org/tools/fieldmap?trial_id=3125 \
  --header='Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
  --header='Cookie: _ga=GA1.1.890069034.1686584540; user_prefs=None; sgn_session_id=lhdyihlycbiqrglianthjjiospaxriqgxxzmphnyyknepxemzwfxlfkovqmpszrbcnzowps; _ga_EHE4JHN9L4=GS1.1.1686598230.2.1.1686599154.23.0.0' \
  --header='Pragma: no-cache' \
  --page-requisites -P tools_fieldmap.static/

# curl 'https://imagebreed.org/tools/fieldmap?trial_id=3125' \
#   -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
#   -H 'Accept-Language: en-US,en;q=0.9' \
#   -H 'Cache-Control: no-cache' \
#   -H 'Connection: keep-alive' \
#   -H 'Cookie: _ga=GA1.1.727665958.1686584604; user_prefs=; sgn_session_id=lhdyihlycbiqrglianthjjiospaxriqgxxzmphnyyknepxemzwfxlfkovqmpszrbcnzowps; _ga_EHE4JHN9L4=GS1.1.1686602904.2.1.1686603615.60.0.0' \
#   -H 'Pragma: no-cache' \
#   -H 'Sec-Fetch-Dest: document' \
#   -H 'Sec-Fetch-Mode: navigate' \
#   -H 'Sec-Fetch-Site: none' \
#   -H 'Sec-Fetch-User: ?1' \
#   -H 'Upgrade-Insecure-Requests: 1' \
#   -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36' \
#   -H 'sec-ch-ua: "Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"' \
#   -H 'sec-ch-ua-mobile: ?0' \
#   -H 'sec-ch-ua-platform: "macOS"' \
#   --compressed

#   wget 'http://localhost:8000/breeders/drone_rover' \
#   --header='Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
#   --header='Accept-Language: en-US,en;q=0.9' \
#   --header='Cache-Control: no-cache' \
#   --header='Connection: keep-alive' \
#   --header='Cookie: _ga=GA1.1.890069034.1686584540; user_prefs=None; sgn_session_id=tkzsxojbrlmuppiapshdtwfgdemcsdjhydjvmtcjvvrctbzktkojqvmeijapdjbgiargvgg; _ga_EHE4JHN9L4=GS1.1.1686598230.2.1.1686599154.23.0.0' \
#   --header='Pragma: no-cache' \
#   --header='Referer: http://localhost:8000/breeders/drone_rover' \
#   --header='Sec-Fetch-Dest: document' \
#   --header='Sec-Fetch-Mode: navigate' \
#   --header='Sec-Fetch-Site: same-origin' \
#   --header='Sec-Fetch-User: ?1' \
#   --header='Upgrade-Insecure-Requests: 1' \
#   --header='User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36' \
#   --header='sec-ch-ua: "Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"' \
#   --header='sec-ch-ua-mobile: ?0' \
#   --header='sec-ch-ua-platform: "macOS"' \
#   --compression=auto