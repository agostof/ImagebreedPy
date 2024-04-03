from pydantic import BaseModel, Field
from typing import List
from datetime import datetime
import uuid

class PointCloudMetadataModel(BaseModel):
    event_id: int 
    collection_id: uuid.UUID
    field: str
    timestamp: datetime
    robot: str
    column_number: int
    range_number: int
    direction: int
    start_uptime_ms: int
    end_uptime_ms: int
    start_location: str  # The location info could be further parsed if needed with another pydantic object
    end_location: str  # 

# we need to create a PointCloudMetadataResponse that looks as follows
#  {
#    "data":[pointcloud_metadata_1, pointcloud_metadata_2, ...]  
#  }
# where pointcloud_metadata_1 is of type PointCloudMetadataModel
# data	
# 0	
# event_id	6272
# collection_id	"35267eca-e824-4c59-85a8-01e1ad9a2ba2"
# field	"NYH3"
# timestamp	"2021-07-01 14:12:45"
# robot	"2020TS013"
# column_number	78
# range_number	9
# direction	1
# start_uptime_ms	136282
# end_uptime_ms	143482
# start_location	"POINT (-76.6551338333 42.7334156667)"
# end_location	"POINT (-76.655135 42.7334673333)"
class PointCloudMetadataResponse(BaseModel):
    data: List[PointCloudMetadataModel]


