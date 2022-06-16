import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserList1Example1 } from './examples/AUserList1Example1';
import { UserList1Example2 } from './examples/AUserList1Example2';
import { UserList2Example1 } from './examples/AUserList2Example1';
import { BUserList1Example3 } from './examples/BUserList1Example3';
import { BUserList1Example4 } from './examples/BUserList1Example4';
import { BUserList2Example1 } from './examples/BUserList2Example1';
import { CUserList1Example1 } from './examples/CUserList1Example1';
import { CUserList1Example2 } from './examples/CUserList1Example2';
import { CUserList2Example1 } from './examples/CUserList2Example1';
import { CUserList2Example2 } from './examples/CUserList2Example2';
import { MainContext } from './perfExamples/context-solution/WidgetsContextComponents';
import { MainRedux } from './perfExamples/context-solution/WidgetsReduxComponents';



const queryClient = new QueryClient();
function App() {


  return (

    // <QueryClientProvider client={queryClient}>
    //   <div className="App">

    //     <p style={{ padding: 20 }}>nb. Refresh page between use of each demo, as they all share the same "database"</p>

    //     <UserList1Example1 />

    //     <UserList1Example2 />

    //     <UserList2Example1 />

    //     <BUserList1Example3/>
    //     <BUserList1Example4/>
    //     <BUserList2Example1/>

    //     <CUserList1Example1/>
    //     <CUserList1Example2/>
    //     <CUserList2Example1/>
    //     <CUserList2Example2/>



    //   </div>
    // </QueryClientProvider>

    <>
      <MainContext />
      <MainRedux />
    </>
  );
}

export default App;
