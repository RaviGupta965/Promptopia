import React from 'react'
import '../styles/global.css';
import Nav from '@Components/Nav'
import Provider from '@Components/Provider'

export const metadata = {
    title:"Promptopia",
    description: "Discover and share AI Prompt"
}
const  Rootlayout = ({children}) => {
  return (
    <html lang='en'>
        
        <body>
            <Provider>
                <div className='main'>
                    <div className='gradient'/>
                </div>
                <main className='app'>
                    <Nav/>
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default Rootlayout;
