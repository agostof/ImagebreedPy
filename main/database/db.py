from sqlalchemy import create_engine, event
from sqlalchemy.orm import scoped_session, sessionmaker
import click
from datetime import datetime

from main.database.models import *
from main.services.settings import settings


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
            session.add(Sensor(name='Camera RGB', description= "A standard rgb camera"))
            session.add(Sensor(name='IR camera', description= "Advanced infrared camera"))
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
            session.add(Image(name='First image', description= "the first image", image_collection_id=1))
            session.add(Image(name='second image', description= "the second image", image_collection_id=2))
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