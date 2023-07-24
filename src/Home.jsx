import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Container from './component/Container'


const Home = () => {
  return (
    <div className='m-10'>
        <div>
            <ConnectButton />
            <Container />
        </div>
    </div>
  )
}

export default Home

