# NOTES

# checkout PYGIS
# https://pygis.io/docs/c_store_features.html

# look at the enhanced vegetation index:
# https://pygis.io/docs/f_rs_band_math.html

# For POSTGIS function support look at the manual here:
#   https://postgis.net/docs/PostGIS_Special_Functions_Index.html#PostGIS_TypeFunctionMatrix
# For information on when to use geography or not:
#   https://postgis.net/workshops/postgis-intro/geography.html#why-not-use-geography

# looking at CTE ideas here:
#  https://github.com/sqlalchemy/sqlalchemy/discussions/6656

# Geoalchemy documentation:
#  https://geoalchemy-2.readthedocs.io/en/latest/orm_tutorial.html

# When queryying coordinates it is important to know what happens when longituted is larger than 180
#   https://gis.stackexchange.com/questions/263095/postgis-st-makeenvelope-size-direction-change-on-geography
#   http://postgis.net/docs/using_postgis_dbmanagement.html#idm1391
#      What is the longest arc you can process?
#          We use great circle arcs as the "interpolation line" between two points. 
#          That means any two points are actually joined up two ways, depending on 
#          which direction you travel along the great circle. All our code assumes 
#          that the points are joined by the shorter of the two paths along the great 
#          circle. As a consequence, shapes that have arcs of more than 180 degrees
#          will not be correctly modelled.


# point_cloud_db.py
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import BYTEA, UUID#, GEOGRAPHY
#from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import declarative_base, load_only
from sqlalchemy.sql import func
#from sqlalchemy import func
from sqlalchemy import create_engine, select
from geoalchemy2 import Geometry, Geography


# and import others

# usage
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker
# from point_cloud_db import PointCloudData, PointCloudMetaData
# engine = create_engine('postgresql://username:xxxxxxxx@xxxxxxxxx:5432/point_cloud')
# Session = sessionmaker(bind=engine)
# session = Session()
# session.query(PointCloudMetaData).first()
# session.query(PointCloudData).first()

from sqlalchemy.types import TypeDecorator, UserDefinedType


Base = declarative_base()


class PCPATCH(TypeDecorator):
    impl = UserDefinedType

    def bind_expression(self, bindvalue):
        return bindvalue
    
class PointCloudData(Base):
    __tablename__ = 'genomestofieldsv2'
    id = Column(Integer, primary_key=True)
    event_id = Column(Integer, ForeignKey('metadata.event_id'))
    column_id = Column(Integer)
    range_id = Column(Integer)
    pa = Column(BYTEA)
    #pa = Column(PCPATCH)


class GeoPoint(Geometry):
    as_binary = 'ST_AsEWKT'

class RawGeometry(Geometry):

    def column_expression(self, col):
        return col


class PointCloudMetaData(Base):
    __tablename__ = 'metadata'

    event_id = Column(Integer, primary_key=True)
    collection_id = Column(UUID)
    field = Column(String(255))
    timestamp = Column(DateTime)
    robot = Column(String(255))
    column_number = Column(Integer)
    range_number = Column(Integer)
    direction = Column(Integer)
    start_uptime_ms = Column(Integer)
    end_uptime_ms = Column(Integer)
    # disabled tremporary 
    start_location = Column(Geography(geometry_type='POINT', srid=4326))
    # disabled tremporary 
    end_location = Column(Geography(geometry_type='POINT', srid=4326))
    #start_location = Column(Geometry(geometry_type='POINT', srid=4326))
    #end_location = Column(Geometry(geometry_type='POINT', srid=4326))
    #start_location = Column(RawGeometry(geometry_type='POINT'))
    #end_location = Column(RawGeometry(geometry_type='POINT'))
   
    height_flag = Column(String(255))
    left_height_mean = Column(Float)
    right_height_mean = Column(Float)
    all_height_mean = Column(Float)
    left_height_median = Column(Float)
    right_height_median = Column(Float)
    all_height_median = Column(Float)
    left_height_std = Column(Float)
    right_height_std = Column(Float)
    left_height_num_detections = Column(Integer)
    right_height_num_detections = Column(Integer)
    left_height_min = Column(Float)
    right_height_min = Column(Float)
    left_height_max = Column(Float)
    right_height_max = Column(Float)
    left_height_threshold = Column(Float)
    right_height_threshold = Column(Float)
    lai_flag = Column(String(255))
    lai_mean = Column(Float)
    lai_median = Column(Float)
    lai_std = Column(Float)
    lai_num_detections = Column(Integer)
    lai_min = Column(Float)
    lai_max = Column(Float)
    count_flag = Column(String(255))
    left_count = Column(Integer)
    right_count = Column(Integer)
    plot_distance = Column(Float)
    def get_start_point(self):
        pass
    class Config:
        orm_mode = True