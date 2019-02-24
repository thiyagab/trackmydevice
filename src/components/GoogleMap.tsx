import GoogleMapReact from 'google-map-react';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

const GoogleMap = ({ children, ...props }) => (
  <Wrapper>
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY as string }}
      {...props}
    >
      {children}
    </GoogleMapReact>
  </Wrapper>
);

export default GoogleMap;
