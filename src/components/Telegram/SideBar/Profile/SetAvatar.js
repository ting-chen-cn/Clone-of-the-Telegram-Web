import React, { useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import noAvatarImage from '../../img/woman.jpg'
import { firebaseApp } from '../../../../firebase'

const NoAvatar = () => {
  return (
    <div className="image-container">
      <img style={{ width: '200px' }} alt="profile" src={noAvatarImage} />
    </div>
  )
}

export const SetProfileImage = () => {

  const [imageRef, setImageRef] = useState(null)
  const [avatar, setAvatar] = useState()
  const uploadImageInputRef = useRef(null)

  const setEditorRef = (editor) => setImageRef(editor)
  const forestRef = firebaseApp.storage().ref().child('images/boy.jpg')

  forestRef.getDownloadURL().then((url) => {console.log(url)})


  return (
    <div className="set-profile-image">
      {avatar ? (
        <AvatarEditor
          style={{
            margin: '20px',
            marginTop: '0px',
            width: '250px',
            height: '378px',
          }}
          ref={setEditorRef}
          image={URL.createObjectURL(avatar)}
          border={0}
          width={852}
          height={1280}
          borderRadius={0}
          color={[255, 255, 255, 0.6]}
          scale={1}
        />
      ) : (
        <NoAvatar />
      )}
      <button onClick={() => uploadImageInputRef.current?.click()}>Select photo</button>
      <input
        ref={uploadImageInputRef}
        type="file"
        accept=".jpg, .jpeg"
        onChange={(e) => {
          const { files } = e.target
          console.log(files[0])
          if (files) {
            const file = files[0]
            if (file) {
              setAvatar(file)
            }
          }
        }}
        style={{ display: 'none' }}
      />
      <button
        type="submit"
        disabled={false}
        onClick={() => {
          if (imageRef && avatar) {
            const canvasScaledImage = imageRef.getImageScaledToCanvas()
            canvasScaledImage.toBlob(
              (imageBlob) => {
                firebaseApp.storage().ref().child('images/' + avatar.name).put(imageBlob).then(function() {
                  console.log('Uploaded a blob or file!')
                })
              },
              'image/jpeg',
              0.9,
            )
          }
        }}
      >
        <span>Save</span>
      </button>
    </div>
  )
}
