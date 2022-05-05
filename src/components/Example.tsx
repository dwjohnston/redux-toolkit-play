/*
 * COPYRIGHT NOTICE
 * All source code contained within the Cydarm cybersecurity software provided by Cydarm
 * Technologies Pty Ltd ABN 17 622 236 113 (Company) is the copyright of the Company and
 * protected by copyright laws. Redistribution or reproduction of this material is strictly prohibited
 * without prior written permission of the Company. All rights reserved.
 */
import React from 'react';

export type ExampleProps = {
  title: string;
};



export const Example = (props: React.PropsWithChildren<ExampleProps>) => {
  const { children, title } = props;



  return (
    <div style={{
      margin: 10,
      padding: 10,
      border: "solid 1px black"
    }}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};
