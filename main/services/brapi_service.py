import requests
from requests.models import PreparedRequest

from main.services.app_settings import settings
from main.models.brapi_core_models import StudyListResponse, ProgramListResponse, SeasonListResponse
from main.models.brapi_pheno_models import ObservationVariableListResponse

BASE_URL = settings.brapi_base_url
BRAPI_USER = settings.brapi_user
BRAPI_PASS = settings.brapi_pass

def get_brapi_bearer_token(BASE_URL, username, password):
        
    import requests
    import json
    
    payload={'username': username,
    'password': password}
    
    headers = {
      'Content-Type': 'application/json',
    }

    url = f"{BASE_URL}/token"
    
    response = requests.request("POST", url=url, data=payload)
    if response.ok:
        data = response.json() 
        return data['access_token']

BRAPI_TOKEN = get_brapi_bearer_token(BASE_URL, username=BRAPI_USER, password=BRAPI_PASS)
# TO get the layout for a given study
# get laytout info http://{{ApiHost}}/brapi/v2/observationunits?studyDbId=169
class BrAPIServiceClass():
    def getStudyLayout(self, studyDbId: str, token:str= "", pageSize=1000):
        req = PreparedRequest()

        # import requests
        # import json

        url = f"{BASE_URL}/observationunits?studyDbId={studyDbId}"

        token = BRAPI_TOKEN
        queryParams = {"pageSize" : pageSize}
        if studyDbId:
            queryParams["studyDbId"] = studyDbId
        req.prepare_url(url, queryParams)
        print(req.url)
        # headers = {
        # 'Content-Type': 'application/json',
        # 'Authorization': f'Bearer {token}'
        # }
        
        # response = requests.request("GET", url=url, headers=headers)
        # if response.ok:
        #     data = response.json() 
        #     return data
        #     #return data['access_token']
        
        headers = {
           # "Authorization": token
            "Authorization": f"Bearer {token}"
        }
        
        responseJSON = requests.get(req.url, headers=headers)
        print(responseJSON.json())
        #response = StudyListResponse.model_validate(responseJSON.json())
        return responseJSON
        return response

    def getStudies(self, programDbId: str, token:str= "") -> StudyListResponse:
        req = PreparedRequest()
        url = BASE_URL + "/studies"
        token = BRAPI_TOKEN #get_brapi_bearer_token(BASE_URL, username='fja32_imuser', password='7XqYkXUF9GVhvfj')
        queryParams = {"pageSize" : 100}
        if programDbId:
            queryParams["programDbId"] = programDbId
            
        req.prepare_url(url, queryParams)
        print(req.url)

        headers = {
           # "Authorization": token
            "Authorization": f"Bearer {token}"
        }
        
        responseJSON = requests.get(req.url, headers=headers)
        print(responseJSON.json())
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
        token = BRAPI_TOKEN
        url = BASE_URL + "/programs"
        queryParams = {
            "pageSize" : 100
            }
        req.prepare_url(url, queryParams)
        print(req.url)

        headers = {
#            "Authorization": token
             "Authorization": f"Bearer {token}"
        }
        
        responseJSON = requests.get(req.url, headers=headers)
        print("TEXT", responseJSON)
        response = ProgramListResponse.model_validate(responseJSON.json())
        return response
    
    def getProgramSummaries(self, token:str= ""):
        token = BRAPI_TOKEN
        programs: ProgramListResponse = self.getPrograms(token=token)
        programSummaries = []
        for prog in programs.result.data:
            programSummaries.append({
                "name": prog.programName,
                "id": prog.programDbId
            })

        return programSummaries

#https://imagebreed.gorelab.scienceversa.com/breeders/trial/169/download/layout?format=xls&dataLevel=plot_fieldMap&selected_columns={%22row_number%22:1,%22col_number%22:1,%22accession_name%22:1}
    def getSeasons(self, token:str= "") -> SeasonListResponse:
        token = BRAPI_TOKEN
        req = PreparedRequest()
        url = BASE_URL + "/seasons"
        queryParams = {
            "pageSize" : 100
            }
        req.prepare_url(url, queryParams)
        print(req.url)

        headers = {
            "Authorization": token,
            "Authorization": f"Bearer {token}"
        }
        
        responseJSON = requests.get(req.url, headers=headers)
        print("RESPONSE", responseJSON.json())
        response = SeasonListResponse.model_validate(responseJSON.json())
        return response


    def getTraits(self, token:str= "") -> ObservationVariableListResponse:
        token = BRAPI_TOKEN
        req = PreparedRequest()
        url = BASE_URL + "/variables"
        queryParams = {
            "pageSize" : 100
            }
        req.prepare_url(url, queryParams)
        print(req.url)

        headers = {
#            "Authorization": token,
            "Authorization": f"Bearer {token}"
        }
        
        responseJSON = requests.get(req.url, headers=headers)
        print(responseJSON.json())
        response = ObservationVariableListResponse.model_validate(responseJSON.json())
        return response
    
    def getTraitSummaries(self, token:str= ""):
        token = BRAPI_TOKEN
        traits: ObservationVariableListResponse = self.getTraits(token=token)
        traitSummaries = []
        print(traits.result.data)
        for trait in traits.result.data:
            traitSummaries.append({
                "name": trait.observationVariableName,
                "id": trait.observationVariableDbId
            })

        return traitSummaries
    

BrAPI = BrAPIServiceClass()
