from sqlalchemy import create_engine, event
from sqlalchemy.orm import scoped_session, sessionmaker
import click
from datetime import datetime

from main.database.db_models import *
from main.services.app_settings import settings


engine = create_engine(settings.db_uri)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))

Base.query = db_session.query_property()
insert_dummy_data = False

# Use the command `python -m main.database.db --drop --init` to initialize a new database 

def init_db():
    for table in Base.metadata.tables.values():
        print(f"  Create Table: {table.name}")
    Base.metadata.create_all(bind=engine)

def drop_db():
    for table in Base.metadata.tables.values():
        print(f"  Drop Table: {table.name}")
    Base.metadata.drop_all(bind=engine)

@event.listens_for(Vehicle.__table__, 'after_create')
def insert_initial_values_Vehicle(target, connection, **kwargs):
    if insert_dummy_data:
        print(f"  Initialize data for {Vehicle.__table__}")
        Session = sessionmaker(engine)
        with Session(bind=connection) as session:
            session.add(Vehicle(name='test drone 1', description= "test drone 1", type=DRONE, battery_names="default", private_company_id="program1"))
            session.add(Vehicle(name='test rover 1', description= "test rover 1", type=ROVER, battery_names="default", private_company_id="program1"))
            session.commit()
            session.close()

@event.listens_for(AnalysisModel.__table__, 'after_create')
def insert_initial_values_AnalysisModel(target, connection, **kwargs):
    if insert_dummy_data:
        print(f"  Initialize data for {AnalysisModel.__table__}")
        Session = sessionmaker(engine)
        with Session(bind=connection) as session:
            session.add(AnalysisModel(name='Simple Model', description= "A simple mixed model", url="https://brapi.org"))
            session.add(AnalysisModel(name='Advanced Model', description= "A very advanced model", url="https://brapi.org"))
            session.commit()
            session.close()

@event.listens_for(Sensor.__table__, 'after_create')
def insert_initial_values_Sensor(target, connection, **kwargs):
    if insert_dummy_data:
        print(f"  Initialize data for {Sensor.__table__}")
        Session = sessionmaker(engine)
        with Session(bind=connection) as session:
            session.add(Sensor(name='micasense_5', description= "Micasense 5-Channel Camera"))
            session.add(Sensor(name='micasense_10', description= "Micasense 10-Channel Camera"))
            session.add(Sensor(name='ccd_color', description= "RGB Color Camera"))
            session.add(Sensor(name='interpolated_elevation', description= "Interpolated Elevation Image"))
            session.add(Sensor(name='em38_interpolated_ch1.0m', description= "EM38 Interpolated CH1.0m Image"))
            session.add(Sensor(name='em38_interpolated_ch0.5m', description= "EM38 Interpolated CH0.5m Image"))
            session.add(Sensor(name='em38_interpolated_ih1.0m', description= "EM38 Interpolated IH1.0m Image"))
            session.add(Sensor(name='em38_interpolated_ih0.5m', description= "EM38 Interpolated IH0.5m Image"))
            session.commit()
            session.close()

@event.listens_for(SensorBand.__table__, 'after_create')
def insert_initial_values_Sensor(target, connection, **kwargs):
    if insert_dummy_data:
        print(f"  Initialize data for {Sensor.__table__}")
        Session = sessionmaker(engine)
        with Session(bind=connection) as session:

            session.add(SensorBand(name='Black and White Image',    abbreviation="BW",  description= "Micasense 5-Channel Camera - Black and White Image", image_suffix="_bw", sensor_id="1"))
            session.add(SensorBand(name='RGB Color Image',          abbreviation="RGB", description= "Micasense 5-Channel Camera - RGB Color Image", image_suffix="_rgb", sensor_id="1"))
            session.add(SensorBand(name='Coastal Blue (410-480nm)', abbreviation="CB",  description= "Micasense 5-Channel Camera - Coastal Blue (410-480nm)", image_suffix="_b1", sensor_id="1"))
            session.add(SensorBand(name='Blue (450-520nm)',         abbreviation="B",   description= "Micasense 5-Channel Camera - Blue (450-520nm)", image_suffix="_b2", sensor_id="1"))
            session.add(SensorBand(name='Green (510-550nm)',        abbreviation="G1",  description= "Micasense 5-Channel Camera - Green (510-550nm)", image_suffix="_g1", sensor_id="1"))
            session.add(SensorBand(name='Green (515-600nm)',        abbreviation="G2",  description= "Micasense 5-Channel Camera - Green (515-600nm)", image_suffix="_g2", sensor_id="1"))
            session.add(SensorBand(name='Red (590-670nm)',          abbreviation="R1",  description= "Micasense 5-Channel Camera - Red (590-670nm)", image_suffix="_r1", sensor_id="1"))
            session.add(SensorBand(name='Red (600-690nm)',          abbreviation="R2",  description= "Micasense 5-Channel Camera - Red (600-690nm)", image_suffix="_r2", sensor_id="1"))
            session.add(SensorBand(name='Red Edge (680-720nm)',     abbreviation="RE1", description= "Micasense 5-Channel Camera - Red Edge (680-720nm)", image_suffix="_re1", sensor_id="1"))
            session.add(SensorBand(name='Red Edge (690-750nm)',     abbreviation="RE2", description= "Micasense 5-Channel Camera - Red Edge (690-750nm)", image_suffix="_re2", sensor_id="1"))
            session.add(SensorBand(name='Red Edge (720-760nm)',     abbreviation="RE3", description= "Micasense 5-Channel Camera - Red Edge (720-760nm)", image_suffix="_re3", sensor_id="1"))
            session.add(SensorBand(name='NIR (780-3000nm)',         abbreviation="NIR", description= "Micasense 5-Channel Camera - NIR (780-3000nm)", image_suffix="_nir", sensor_id="1"))
            session.add(SensorBand(name='MIR (3000-50000nm)',       abbreviation="MIR", description= "Micasense 5-Channel Camera - MIR (3000-50000nm)", image_suffix="_mir", sensor_id="1"))
            session.add(SensorBand(name='FIR (50000-1000000nm)',    abbreviation="FIR", description= "Micasense 5-Channel Camera - FIR (50000-1000000nm)", image_suffix="_fir", sensor_id="1"))
            session.add(SensorBand(name='Thermal IR (9000-14000nm)',abbreviation="TIR", description= "Micasense 5-Channel Camera - Thermal IR (9000-14000nm)", image_suffix="_tir", sensor_id="1"))

            session.add(SensorBand(name='Red Band 1',    abbreviation="BW",  description= "Micasense 10-Channel Camera - Red Band", image_suffix="_1_1", sensor_id="2"))
            session.add(SensorBand(name='Red Band 2',    abbreviation="BW",  description= "Micasense 10-Channel Camera - Red Band", image_suffix="_1_2", sensor_id="2"))
            session.add(SensorBand(name='Orange Band 1',    abbreviation="BW",  description= "Micasense 10-Channel Camera - Orange Band", image_suffix="_2_1", sensor_id="2"))
            session.add(SensorBand(name='Orange Band 2',    abbreviation="BW",  description= "Micasense 10-Channel Camera - Orange Band", image_suffix="_2_2", sensor_id="2"))
            session.add(SensorBand(name='Yellow Band 1',    abbreviation="BW",  description= "Micasense 10-Channel Camera - Yellow Band", image_suffix="_3_1", sensor_id="2"))
            session.add(SensorBand(name='Yellow Band 2',    abbreviation="BW",  description= "Micasense 10-Channel Camera - Yellow Band", image_suffix="_3_2", sensor_id="2"))
            session.add(SensorBand(name='Green Band 1',    abbreviation="BW",  description= "Micasense 10-Channel Camera - Green Band", image_suffix="_4_1", sensor_id="2"))
            session.add(SensorBand(name='Green Band 2',    abbreviation="BW",  description= "Micasense 10-Channel Camera - Green Band", image_suffix="_4_2", sensor_id="2"))
            session.add(SensorBand(name='Blue Band 1',    abbreviation="BW",  description= "Micasense 10-Channel Camera - Blue Band", image_suffix="_5_1", sensor_id="2"))
            session.add(SensorBand(name='Blue Band 2',    abbreviation="BW",  description= "Micasense 10-Channel Camera - Blue Band", image_suffix="_5_2", sensor_id="2"))

            session.add(SensorBand(name='Red Band',    abbreviation="BW",  description= "RGB Color Camera - Red Band", image_suffix="_R", sensor_id="3"))
            session.add(SensorBand(name='Green Band',    abbreviation="BW",  description= "RGB Color Camera - Green Band", image_suffix="_G", sensor_id="3"))
            session.add(SensorBand(name='Blue Band',    abbreviation="BW",  description= "RGB Color Camera - Blue Band", image_suffix="_B", sensor_id="3"))

            session.add(SensorBand(name='interpolated_elevation',    abbreviation="BW",  description= "Interpolated Elevation Image", image_suffix="_123", sensor_id="4"))
            session.add(SensorBand(name='em38_interpolated_ch1.0m',    abbreviation="BW",  description= "EM38 Interpolated CH1.0m Image", image_suffix="_123", sensor_id="5"))
            session.add(SensorBand(name='em38_interpolated_ch0.5m',    abbreviation="BW",  description= "EM38 Interpolated CH0.5m Image", image_suffix="_123", sensor_id="6"))
            session.add(SensorBand(name='em38_interpolated_ih1.0m',    abbreviation="BW",  description= "EM38 Interpolated IH1.0m Image", image_suffix="_123", sensor_id="7"))
            session.add(SensorBand(name='em38_interpolated_ih0.5m',    abbreviation="BW",  description= "EM38 Interpolated IH0.5m Image", image_suffix="_123", sensor_id="8"))
            session.commit()
            session.close()

@event.listens_for(ImagingEvent.__table__, 'after_create')
def insert_initial_values_ImagingEvent(target, connection, **kwargs):
    if insert_dummy_data:
        print(f"  Initialize data for {ImagingEvent.__table__}")
        Session = sessionmaker(engine)
        with Session(bind=connection) as session:
            session.add(ImagingEvent(name='Imaging Event 1', description= "High res imaging event with camera and drone", event_type="high-res", timestamp=datetime.now(), sensor_id=1, vehicle_id=1, trial_name="Trial 1 Name", trial_description="This is a trial"))
            session.add(ImagingEvent(name='Imaging Event 2', description= "low res imaging event with IR and rover", event_type="low-res", timestamp=datetime.now(), sensor_id=2, vehicle_id=2, trial_name="Trial 2 Name", trial_description="This is a trial too"))
            session.commit()
            session.close()

@event.listens_for(ImageCollection.__table__, 'after_create')
def insert_initial_values_ImageCollection(target, connection, **kwargs):
    if insert_dummy_data:
        print(f"  Initialize data for {ImageCollection.__table__}")
        Session = sessionmaker(engine)
        with Session(bind=connection) as session:
            session.add(ImageCollection(name='First Collection', description= "the first collection of images", imaging_event_id=1))
            session.add(ImageCollection(name='First Collection', description= "the second collection of images", imaging_event_id=2))
            session.commit()
            session.close()

@event.listens_for(Image.__table__, 'after_create')
def insert_initial_values_ImageCollection(target, connection, **kwargs):
    if insert_dummy_data:
        print(f"  Initialize data for {Image.__table__}")
        Session = sessionmaker(engine)
        with Session(bind=connection) as session:
            image1 = Image(name='First image', description= "the first image", image_collection_id=1, sensor_id=1, sensor_band_id=1)
            image1.height = 200
            image1.width = 200
            image1.local_path = "/img/USDANIFAlogo.png"
            session.add(image1)

            image2 = Image(name='second image', description= "the second image", image_collection_id=2, sensor_id=2, sensor_band_id=2)
            image2.height = 200
            image2.width = 200
            image2.local_path = "/img/imagebreed/imagebreedlogo_noBackground.png"
            session.add(image2)
            
            session.commit()
            session.close()

@click.command()
@click.option('--init', is_flag=True, help='create all tables')
@click.option('--data', is_flag=True, help='insert initial dummy data')
@click.option('--drop', is_flag=True, help='drop all tables')
def init_db_command(init, data, drop):
    global insert_dummy_data
    if data:
        insert_dummy_data = True
    if drop:
        click.echo("Dropping all Imagebreed tables")
        drop_db()
        click.echo("Drop tables complete")

    if init:
        click.echo("Creating all Imagebreed tables")
        init_db()
        click.echo("Create tables complete")



if __name__ == '__main__':
    init_db_command()