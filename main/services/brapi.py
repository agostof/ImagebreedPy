import requests
from requests.models import PreparedRequest

from main.services.settings import settings
from main.services.brapi_models import StudyListResponse, ProgramListResponse

BASE_URL = settings.brapi_base_url

class BrAPI_class:
    def getStudies(self, token:str= "") -> StudyListResponse:
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
    
    def getStudySummaries(self, token:str= ""):
        studies: StudyListResponse = self.getStudies(token=token)
        studySummaries = []
        for study in studies.result.data:
            studySummaries.append({
                "name": study.studyName,
                "id": study.studyDbId
            })

        return studySummaries
    

    def getPrograms(self, token:str= "") -> ProgramListResponse:
        req = PreparedRequest()
        url = BASE_URL + "/programs"
        queryParams = {
            "pageSize" : 100
            }
        req.prepare_url(url, queryParams)
        print(req.url)

        headers = {
            "Authorization": token
        }
        
        responseJSON = requests.get(req.url, headers=headers)
        response = ProgramListResponse.model_validate(responseJSON.json())
        return response
    
    def getProgramSummaries(self, token:str= ""):
        programs: ProgramListResponse = self.getPrograms(token=token)
        programSummaries = []
        for prog in programs.result.data:
            programSummaries.append({
                "name": prog.programName,
                "id": prog.programDbId
            })

        return programSummaries


BrAPI = BrAPI_class()