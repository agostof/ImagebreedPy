
Image Storage Architecture

```
[ImageFileService] ---> [StorageBackend] <---|--- [LocalStorageBackend]
                                             |
                                             |--- [CloudStorageBackend]

          |                     |                      |
          v                     v                      v
   (Business Logic)     (Abstract Storage)       (Concrete Storage)

[ImageFileService] ---|--- [sort_and_stitch_images()]
                      |
                      |--- [sort_orthos()]
                      |
                      |--- [archive_uploads()]
                      |
                      |--- [extract_zip_file()]
                      |
                      `--- [rename_outfile()]

         |
         v
  (Other Components)
   - Domain Models
   - Image Processing Utilities
   - etc.
```

ImageServiceClass diagram

```
[Application Logic] -- Uses --> [ImageServiceClass]

      |             |
      | Interacts   |
      v             v

[ImageServiceClass] Methods:
  - getImage()
  - getImages()
  - getImageCollection()
  - getOrthoImage()
  - saveImageCollection()
  - saveImage()
  - saveImages()
  - saveOrthoImage()
  - saveModifiedImage()

      |                  |
      | Utilizes         |
      v                  v

[Database Operations]
  - Select
  - Insert
  - Update
  - Commit

      |                  |
      | Manipulates      |
      v                  v

[Database Models]
  - Image
  - ImageCollection

      |                  |
      | Stored In        |
      v                  v

[Database]
```

