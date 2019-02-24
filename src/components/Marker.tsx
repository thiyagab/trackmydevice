import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import { IPlace } from '../screens/Main';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  background-color: #000;
  border: 2px solid #fff;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    z-index: 1;
  }
`;

const Marker = (props: { detail: IPlace; onClick?: SyntheticEvent }) => (
  // @ts-ignore
  <Wrapper
    alt={props.detail.name}
    {...(props.onClick ? { onClick: props.onClick } : null)}
  />
);

export default Marker;
