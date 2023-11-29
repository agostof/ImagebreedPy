from pydantic import BaseModel
from sqlalchemy import select, or_

from main.database.db import db_session
from main.database.db_models import AnalysisModel

class AnalyticsServiceClass():
    def getAnalysisModels(self):
        sqlStatement = select(AnalysisModel)

        analysisModels = db_session.scalars(sqlStatement)

        return analysisModels
    
    def getAnalysisModelSummaries(self):
        analysisModels = self.getAnalysisModels()

        analysisModelSummaries = []
        for analysisModel in analysisModels:
            analysisModelSummaries.append({
                "name": analysisModel.name,
                "id": str(analysisModel.id)
            })

        return analysisModelSummaries

AnalyticsService = AnalyticsServiceClass()
        

