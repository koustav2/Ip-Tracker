import React from 'react'
import HashLoader from 'react-spinners/HashLoader'

const loading = () => {
    return (
        <main className="min-h-screen flex justify-center items-center">
  
          <HashLoader
            color="#36d7b7"
            size={100}
          />
        </main>
      )
}

export default loading
