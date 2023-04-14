
# FamilyMemories

The FamilyMemories Web App is a user-friendly platform designed for families to create and share memories together. With this app, users can easily create an account, create a new family, and add existing users to the family. Once in a family, users can create memories, upload photos, and edit or delete them as needed. All family members can view and access the shared memories, creating a shared experience that brings families closer together.

To ensure privacy, the app allows users to mark memories as private, which means only the creator of the memory can edit or delete them. 

This app is ideal for families who want a secure and private way to preserve their memories online, whether it's documenting a family vacation, special event or just everyday life.

With the FamilyMemories App, it easy to create and share memories with the people who matter most.

## Features

- Sign up/ Log in
- Create new family and add existing users to you family
- Create new memory
- Add private edit permissions to the memory
- Edit memory
- Upload photos
- Delete memory


## Tech Stack

**Client:** React, React Router Dom, Axios, React Query, MUI, Styled Components, React Toastify, Date-fns, Lodash

**Server:** Node.js, Express.js, MongoDB, Mongoose, Bcrypt (for password hashing), JSON Web Tokens (for authentication), Cloudinary (for image storage and manipulation), Multer (for file uploading), Morgan (for HTTP request logging)


## Screenshots

![11111](https://user-images.githubusercontent.com/95726451/232131640-2a26b224-7338-4e0a-a7c0-8a65bbc1aa73.jpeg)

![2222](https://user-images.githubusercontent.com/95726451/232131663-a6b7c06d-f99e-430d-aa48-c7c43e86c0d1.jpeg)

![3333](https://user-images.githubusercontent.com/95726451/232132623-57825148-1c99-43fc-a568-0e9eab2116e7.jpeg)


## API Reference

**Authentication Requirement:** To access these endpoints, authentication is required. The endpoint uses the isAuthenticated middleware to authenticate the user.

#### Create family

```
  POST /api/family
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required**. The title of the family |
| `description` | `string` | A brief description of the family |
| `members` | `string[]` | An array of members' emails |

#### Get families

```
  GET /api/families
```
The response will contain an array of all families that the authenticated user is a member of.

#### Get family

```
  GET /api/families/:familyId
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `familyId`      | `string` | **Required**. Id of family to fetch |

#### Upload images

```
  POST /api/upload
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `gallery`      | `File[]` | **Required**. Array of images to upload |

#### Create memory

```
  POST /api/memory
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. Title of the memory |
| `date`      | `string` | **Required**. Date of the memory in ISO 8601 format |
| `familyId`      | `string` | **Required**. ID of the family to which the memory belongs |
| `publication`      | `string` | Body of the memory |
| `place`      | `string` | Place of the memory |
| `isPrivate`      | `Boolean` | Indicates if the memory is private |
| `tags`      | `string[]` | Tags of the memory |
| `gallery`      | `string[]` | Array of Cloudinary image URLs |


#### Get family's memories

```
  POST /api/memories
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `familyId`      | `string` | **Required**. ID of the family to get memories for |


#### Get memory

```
  GET /api/memory/:memoryId
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `memoryId`      | `string` | **Required**. ID of the memory to fetch |


#### Edit memory

```
  PUT /api/memory/:memoryId
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `memoryId`      | `string` | **Required**. The ID of the memory to edit |
| `title`      | `string` | Title of the memory |
| `date`      | `string` | Date of the memory in ISO 8601 format |
| `familyId`      | `string` | ID of the family to which the memory belongs |
| `publication`      | `string` | Body of the memory |
| `place`      | `string` | Place of the memory |
| `isPrivate`      | `Boolean` | Indicates if the memory is private |
| `tags`      | `string[]` | Tags of the memory |
| `gallery`      | `string[]` | Array of Cloudinary image URLs |


#### Delete memory

```
  DELETE /api/memory/:memoryId
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `memoryId`      | `string` | **Required**. The ID of the memory to delete |


## Installation

If you’d like to view my project in your browser

```bash
git clone https://github.com/artweise/memories-app-client.git
git clone https://github.com/artweise/memories-app-server.git

npm i
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

**Client:**
`REACT_APP_DEV_SERVER_API`
`REACT_APP_DEV_SERVER_AUTH`
`REACT_APP_PROD_SERVER_API`
`REACT_APP_PROD_SERVER_AUTH`

**Server:**
`PORT`
`ORIGIN`
`TOKEN_SECRET`
`REFRESH_TOKEN_SECRET`
`CLOUDINARY_NAME`
`CLOUDINARY_KEY`
`CLOUDINARY_SECRET`
`MONGODB_URI`

