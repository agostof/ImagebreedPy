
# Developer Notes Image Services

First of all, welcome to the team! We're excited to have you on board and look forward to working with you. Here are some notes to help you get started with the imaging service codebase.

We use FastAPI to build the application, which is a modern web framework for building APIs with Python. FastAPI is easy to use and provides automatic validation, serialization, and documentation of request and response data. The app serialization is done using Pydantic, which is a data validation and parsing library for Python.

We encourage you to experiment with the codebase, cut out a new branch, and try out new features or improvements. e.g. `git checkout -b feature/my_expriment`.

If you have any questions or need help, feel free to reach out to the team for assistance.

## Code organization

The codebase for the imaging services is organized into several modules, each containing related functionality. Here's an overview of the main modules and their contents:

- `services/images_service.py`: Defines and exports a class `ImageServiceClass` that provides methods for interacting with the images metadata using the `Image` and `ImageCollection` data models. This is used for storing things such as, when it was taken (*and where soon*), by which sensor, and which processing steps it has gone through. 
- `services/image_file_util.py`: Contains utility functions for handling image files, including archiving uploaded images, extracting images from zip files, sorting and stitching images, and renaming output files. 
<!-- - `image_processing.py`: Contains functions for processing images, including generating thumbnails, stitching images, and applying image processing algorithms. -->
- `routers/images.py`: Defines FastAPI routes for uploading images, processing images, and retrieving image data.
- `database/db_models.py`: Defines data models for Image, `ImageCollection`, and other related entities.
<!-- - `schemas.py`: Defines Pydantic schemas for request and response data structures. -->
<!-- - `database.py`: Contains database configuration and connection setup code. -->


---

### Image Service

The `images_service.py` file defines a class `ImageServiceClass` that provides methods for interacting with Image and `ImageCollection` data models. Here's a breakdown of its methods:

- `getImage`: Retrieves a single `Image` record from the database based on the provided parameters (image_id, image_collection_id, process_step_name, local_path).

- `getImages`: Retrieves multiple `Image` records from the database based on the provided parameters (image_id, image_collection_id, process_step_name).

- `getImageCollection`: Retrieves a single `ImageCollection` record from the database based on the provided `image_collection_id`.

- `getOrthoImage`: Retrieves a single orthomosaic `Image` record from the database based on the provided `image_collection_id`.

- `saveImageCollection`: Saves an `ImageCollection` record to the database.

- `saveImage`: Saves an `Image` record to the database. If an image with the same local_path already exists, it updates the existing record.

- `saveImages`: Saves multiple `Image` records to the database. It creates an `Image` record for each image path in the provided list, and associates them with the provided `ImageCollection`.

- `saveOrthoImage`: Saves an orthomosaic `Image` record to the database. It creates an `Image` record for the provided orthomosaic image path, and associates it with the provided `ImageCollection`.

- `saveModifiedImage`: Saves a modified `Image` record to the database. It creates a new `Image` record based on the provided original image, but with a new local_path, process_step_name, height, and width.

At the end of the file, an instance of `ImageServiceClass` is created and assigned to `ImageService`. This instance can be imported and used in other parts of the application to interact with Image and `ImageCollection` records.

---

### Image File Utility

The `image_file_util.py` module contains utility functions for handling image files. Here's a brief description of each function:

- `archiveUploads(request: ImagingEventRequest) -> dict`: Archives uploaded image files and returns a dictionary with the paths to the archived files. The keys in the dictionary are "zip", "panel_zip", and "orthos", corresponding to regular images, panel images, and orthomosaic images, respectively.

- `archiveZipFile(zip_file:UploadFile) -> Path`: Archives a zip file containing image files and returns the path to the archived zip file.

- `archiveOrthos(ortho_files: list[ImagingEventRequestOrthoImage]) -> list[Path]`: Archives orthomosaic image files and returns a list of paths to the archived files.

- `extractZipFile(zip_file_path: str | os.PathLike, output_dir: str | os.PathLike) -> list[Path]`: Extracts a zip file to a specified output directory and returns a list of paths to the extracted files.

- `sortAndStitchImages(imaging_event: ImagingEvent, sensor: Sensor, zip_path: str)`: Extracts images from a zip file, sorts them by sensor band, stitches images of the same band together, and saves the stitched images and their metadata to the database.

- `sortOrthos(imaging_event: ImagingEvent, sensor: Sensor, ortho_paths: list[str], ortho_details: list[ImagingEventRequestOrthoImage])`: Sorts orthomosaic images by sensor band, generates thumbnails for them, and saves the images and their metadata to the database.

- `renameOutfile(outfile: str, process_step_name: str) -> Path`: Renames an output file by appending a process step name to the file stem and returns the new file path.

These functions provide a variety of utilities for handling image files, including archiving uploaded images, extracting images from zip files, sorting and stitching images, and renaming output files.

## Functionality notes

The functions in the `image_file_util.py` module can be broadly categorized into two categories: Storage functionality and Business logic.

### Storage functionality

These functions are primarily concerned with reading and writing files, and managing the file system.

- `archiveUploads(request: ImagingEventRequest) -> dict`: Archives uploaded image files and returns a dictionary with the paths to the archived files.
- `archiveZipFile(zip_file:UploadFile) -> Path`: Archives a zip file containing image files and returns the path to the archived zip file.
- `archiveOrthos(ortho_files: list[ImagingEventRequestOrthoImage]) -> list[Path]`: Archives orthomosaic image files and returns a list of paths to the archived files.
- `extractZipFile(zip_file_path: str | os.PathLike, output_dir: str | os.PathLike) -> list[Path]`: Extracts a zip file to a specified output directory and returns a list of paths to the extracted files.
- `renameOutfile(outfile: str, process_step_name: str) -> Path`: Renames an output file by appending a process step name to the file stem and returns the new file path.

### Business logic

These functions implement the core logic of the application, such as sorting and stitching images, and saving images and their metadata to the database.

- `sortAndStitchImages(imaging_event: ImagingEvent, sensor: Sensor, zip_path: str)`: Extracts images from a zip file, sorts them by sensor band, stitches images of the same band together, and saves the stitched images and their metadata to the database.

- `sortOrthos(imaging_event: ImagingEvent, sensor: Sensor, ortho_paths: list[str], ortho_details: list[ImagingEventRequestOrthoImage])`: Sorts orthomosaic images by sensor band, generates thumbnails for them, and saves the images and their metadata to the database.









