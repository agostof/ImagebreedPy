from sqlalchemy import create_engine, event
from sqlalchemy.orm import scoped_session, sessionmaker
import click

from main.database.models import Base, Vehicle, DRONE, ROVER
from main.services.settings import settings


engine = create_engine(settings.db_uri)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))

Base.query = db_session.query_property()


# Use the command `python -m main.database.db --drop --init` to initialize a new database 

def init_db():
    print(Base.metadata.tables.values())
    Base.metadata.create_all(bind=engine)

def drop_db():
    print(Base.metadata.tables.values())
    Base.metadata.drop_all(bind=engine)

@event.listens_for(Vehicle.__table__, 'after_create')
def insert_initial_values(target, connection, **kwargs):
    print(f"Initialize vehicle data")
    Session = sessionmaker(engine)
    with Session(bind=connection) as session:
        session.add(Vehicle(name='test drone 1', description= "test drone 1", type=DRONE))
        session.add(Vehicle(name='test rover 1', description= "test rover 1", type=ROVER))
        session.commit()
        session.close()

@click.command()
@click.option('--init', is_flag=True, help='create all tables and insert initial data')
@click.option('--drop', is_flag=True, help='drop all tables')
def init_db_command(init, drop):
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