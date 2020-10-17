

export const FileUoload = async ( file ) => {

    const cloudURL = 'https://api.cloudinary.com/v1_1/dcsvpxfw6/upload'

    const formData = new FormData() 
    formData.append('upload_preset', 'App-Journal')
    formData.append('file', file)

    try {
        const res = await fetch( cloudURL, {
            method: 'POST',
            body: formData
        })

        if ( res.ok ) {
            const cloudRes = await res.json()
            return cloudRes.secure_url
        }
        else {
            throw await res.json()
        }

    } catch (error) {
        throw error ;
    }


}