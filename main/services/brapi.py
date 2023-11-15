import requests
from requests.models import PreparedRequest

from main.services.settings import settings
from main.services.brapi_core_models import StudyListResponse, ProgramListResponse, SeasonListResponse
from main.services.brapi_pheno_models import ObservationVariableListResponse

BASE_URL = settings.brapi_base_url

class BrAPI_class():
    def getStudies(self, programDbId: str, token:str= "") -> StudyListResponse:
        req = PreparedRequest()
        url = BASE_URL + "/studies"
        queryParams = {"pageSize" : 100}
        if programDbId:
            queryParams["programDbId"] = programDbId
            
        req.prepare_url(url, queryParams)
        print(req.url)

        headers = {
            "Authorization": token
        }
        
        responseJSON = requests.get(req.url, headers=headers)
        response = StudyListResponse.model_validate(responseJSON.json())
        return response
    
    def getStudySummaries(self, programDbId: str, token:str= ""):
        studies: StudyListResponse = self.getStudies(programDbId, token=token)
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


    def getSeasons(self, token:str= "") -> SeasonListResponse:
        req = PreparedRequest()
        url = BASE_URL + "/seasons"
        queryParams = {
            "pageSize" : 100
            }
        req.prepare_url(url, queryParams)
        print(req.url)

        headers = {
            "Authorization": token
        }
        
        responseJSON = requests.get(req.url, headers=headers)
        response = SeasonListResponse.model_validate(responseJSON.json())
        return response


    def getTraits(self, token:str= "") -> ObservationVariableListResponse:
        req = PreparedRequest()
        url = BASE_URL + "/variables"
        queryParams = {
            "pageSize" : 100
            }
        req.prepare_url(url, queryParams)
        print(req.url)

        headers = {
            "Authorization": token
        }
        
        responseJSON = requests.get(req.url, headers=headers)
        response = ObservationVariableListResponse.model_validate(responseJSON.json())
        return response
    
    def getTraitSummaries(self, token:str= ""):
        traits: ObservationVariableListResponse = self.getTraits(token=token)
        traitSummaries = []
        for trait in traits.result.data:
            traitSummaries.append({
                "name": trait.observationVariableName,
                "id": trait.observationVariableDbId
            })

        return traitSummaries
    

BrAPI = BrAPI_class()