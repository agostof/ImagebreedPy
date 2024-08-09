import requests
from requests.models import PreparedRequest

from main.services.app_settings import settings
from main.models.brapi_core_models import StudyListResponse, ProgramListResponse, SeasonListResponse
from main.models.brapi_pheno_models import ObservationVariableListResponse, ObservationUnitListResponse

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

### AUX FUNCTION

# create datasructor similar to what is produced by
# ImageBreeds
# https://imagebreed.gorelab.scienceversa.com/ajax/breeders/trial/169/coords
#
# # check coord_response_example.json
# 
# ObservationUnit record
# {'additionalInfo': {},
#  'germplasmDbId': '41965',
#  'germplasmName': 'PHB47/PHZ51',
#  'locationDbId': '43',
#  'locationName': 'M3 Aurora Musgrave Research Farm',
#  'observationUnitName': 'A22NYH2_107',
#  'observationUnitPUI': 'imagebreed.gorelab.scienceversa.com/stock/43090/view',
#  'observationUnitPosition': ObservationUnitPosition(observationLevelRelationships=[ObservationLevelRelationship(levelCode='1', levelOrder=0, levelName='replicate'), ObservationLevelRelationship(levelCode='11', levelOrder=1, levelName='block'), ObservationLevelRelationship(levelCode='107', levelOrder=2, levelName='plot')], positionCoordinateY=4, geoCoordinates=None, entryType='test', observationLevel=ObservationLevel(levelName='plot', levelOrder=2, levelCode='107'), positionCoordinateX=9, positionCoordinateXType='GRID_COL', positionCoordinateYType='GRID_ROW'),
#  'programDbId': '168',
#  'programName': 'G2F',
#  'seedLotDbId': None,
#  'studyDbId': '169',
#  'studyName': '2022_NYH2',
#  'trialDbId': '169',
#  'trialName': '2022_NYH2',
#  'observationUnitDbId': '43090',
#  'observations': []}
# Mappings 
#  {'plot_id': K.observationUnitDbId, 
 # 'plot_name': K.observationUnitName,
 # 'stock':K.germplasmName}

def create_coord_record(K):
    unit_record = K.observationUnitPosition
    pos_info = {i.levelName.value: i.levelCode for i in unit_record.observationLevelRelationships}
    output = {
         'plot_number': pos_info.get('plot'),
         'plant_names':[],
         'accession_name':K.germplasmName, 
         'plot_id': K.observationUnitDbId, 
         'plot_name': K.observationUnitName,

         'plot_image_ids':None,
         'col_number': unit_record.positionCoordinateX,
         'row_number':unit_record.positionCoordinateY,
    
         'block_number': pos_info.get('block'),
         'rep_number': pos_info.get('rep')
    }
    return output

def create_result_record(coords):
    res_obj = {
        'blkn': coords.get('block_number'),
        'plotn': coords.get('plot_number'),
        'plot_image_ids': coords.get('plot_image_ids'),
        'plot_id': coords.get('plot_id'),
        'col': coords.get('col_number'),
        'rep': coords.get('rep_number'),
        'row': coords.get('row_number'),
        'stock': coords.get('accession_name'),
        'plot_msg': f"{coords.get('plot_name')}\nplot_No:{coords.get('plot_number')}\nblock_No:{coords.get('block_number')}\nrep_No:{coords.get('rep_number')}\nstock:{coords.get('accession_name')}",
        'plotname': coords.get('plot_name')
    }
    return res_obj

def parse_observation_unit_list_response(response):
    #{i.levelName: i.levelCode for i in K.observationUnitPosition.observationLevelRelationships}
    from collections import OrderedDict
    #record.positionCoordinateY
    
    coord_data = OrderedDict()

    cols =[]
    rows = []
    stocks = []
    controls = []
    accessions = []
    coords = []
    result = []
    reps = []
    blocks = []
    for rec_no, K in enumerate(response.result.data):
        record = K.observationUnitPosition
        cols.append( record.positionCoordinateX)
        rows.append( record.positionCoordinateY)
        stocks.append(K.germplasmName)

        coord_obj = create_coord_record(K)
        reps.append( coord_obj['rep_number'])
        blocks.append( coord_obj['block_number'])
        coords.append(coord_obj)
        result.append(create_result_record(coord_obj))
        #if K.germplasmName == "LOCAL_CHECK":
        #    print("BREAKIN")
        #    break
        accessions.append(K.germplasmName)
        #if K.observationUnitPosition.entryType =='check':
        # TODO: change this to the enum
        if  K.observationUnitPosition.entryType.value == 'CHECK':
            #K.germplasmDbId
            controls.append(K.germplasmName)
        # pos_info = {i.levelName: i.levelCode for i in K.observationUnitPosition.observationLevelRelationships}
        #print(rec_no, {i.levelName: i.levelCode for i in K.observationUnitPosition.observationLevelRelationships})
        #print(K.germplasmName, K.germplasmDbId, record.positionCoordinateX, record.positionCoordinateY)

    unique_col = sorted(list(map(int, set(cols))))
    unique_row = sorted(list(map(int, set(rows))))
    unique_reps = sorted(list(map(int, set(reps))))
    unique_blocks = sorted(list(map(int, set(blocks))))

    coord_data['coords'] = coords
    coord_data['unique_col'] = unique_col
    coord_data['stocks'] = stocks[:]
    coord_data['unique_row'] = unique_row
    coord_data['controls'] = list(set(controls))
    coord_data['accessions'] = accessions[:]
    coord_data['result'] = result
    coord_data['max_block'] = max( unique_blocks)

    coord_data['max_rep'] = max( unique_reps)
    coord_data['max_col'] = max( unique_col)
    coord_data['max_row'] = max( unique_row)
    return coord_data

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
