import { PC, Mobile } from 'utils/MediaQuery'
import React, { useEffect } from 'react'
import styled from '@emotion/styled'

export const MainContainer = styled.div``

const AppLayout = ({ children }) => {
  return (
    <>
      <PC>
        <MainContainer>
          <h1>PC</h1>
          {children}
        </MainContainer>
      </PC>
      <Mobile>
        <MainContainer>
          <h1>MOBILE</h1>
          {children}
        </MainContainer>
      </Mobile>
    </>
  )
}
export default AppLayout
