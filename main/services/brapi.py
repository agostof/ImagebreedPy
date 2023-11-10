import requests
from requests.models import PreparedRequest

from main.services.settings import settings
from main.services.brapi_models import StudyListResponse

BASE_URL = settings().brapi_base_url

def getStudySummaries(token:str= ""):
    studies: StudyListResponse = getStudies(token=token)
    studySummaries = []
    for study in studies.result.data:
        studySummaries.append({
            "name": study.studyName,
            "id": study.studyDbId
        })

    return studySummaries

def getStudies(token:str= ""):
    req = PreparedRequest()
    url = BASE_URL + "/studies"
    queryParams = {
        "pageSize" : 100
        }
    req.prepare_url(url, queryParams)
    print(req.url)

    headers = {
        "Authorization": token
    }
    
    responseJSON = requests.get(req.url, headers=headers)
    response = StudyListResponse.model_validate(responseJSON.json())
    return response