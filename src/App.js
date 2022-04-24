import './App.css';
import { AccProvider } from './components/AWSactions/AccContext';
import { APIProvider } from './components/AWSactions/APIContext';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './pages/Header';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GroupJoinPre from "./components/pagelayouts/groupjoin/GroupJoinPre";
import GroupStart from './components/pagelayouts/groupstart/GroupStart';
import GroupStartAfter from "./components/pagelayouts/groupstart/GroupStartAfter";
import GroupViewMember from "./pages/GroupViewMember";
import GroupViewAdmin from './pages/GroupViewAdmin';
import ReceiptsTable from "./components/pagelayouts/receipt/ReceiptsTable";
import ReceiptPre from "./components/pagelayouts/receipt/ReceiptPre";
import FinalizeGroupPost from "./components/pagelayouts/groupadmin/FinalizeGroupPost";
import FinalizedGroup from "./components/pagelayouts/groupmember/FinalizedGroup"

Amplify.configure(awsconfig); //

function App() {

  return (
    <React.Fragment>
      <div className="App">
        <AccProvider>
          <APIProvider>
            <Router>
              <Header />
              <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/joingroup" element={<GroupJoinPre />} />
                <Route path="/startgroup" element={<GroupStart />} />
                <Route path="/groupstarted" element={<GroupStartAfter />} />
                <Route path="/viewgroup/member/:groupnr" element={<GroupViewMember />} />
                <Route path="/viewgroup/admin/:groupnr" element={<GroupViewAdmin />} />
                <Route path="/viewgroup/success/:groupnr/:role" element={<ReceiptPre />} />
                <Route path="/receipttable" element={<ReceiptsTable />} />
                <Route path="/viewgroup/admin/final/:groupnr" element={<FinalizeGroupPost />} />
                <Route path="/viewgroup/member/final/:groupnr" element={<FinalizedGroup />} />
              </Routes>
            </Router>
          </APIProvider>
        </AccProvider>
      </div>
    </React.Fragment>
  );
}

export default App;
