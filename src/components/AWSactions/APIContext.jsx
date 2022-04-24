import React, { useState, useContext, createContext } from 'react';
import { AccContext } from "../AWSactions/AccContext"
import axios from '@aws-amplify/storage/node_modules/axios';
import fetch from "node-fetch";
const APIContext = createContext();

const APIProvider = (props) => {
  const APIroot = "https://h2genw4y7b.execute-api.eu-central-1.amazonaws.com/dev";
  const accContext = useContext(AccContext);
  const [refGroupID, setRefGroupID] = useState("");
  const email = accContext.email;
  const setGroupsMembered = accContext.setGroupsMembered;
  const setGroupsAdmined = accContext.setGroupsAdmined;
  const [memberReceipts, setMemberReceipts] = useState();
  const [finishedAdminTable, setFinishedAdminTable] = useState();

  const startGroup = (grID, memberName) => {
    axios.post(`${APIroot}/group/start`, {
      "groupID": grID,
      "groupAdmin": email,
      memberName,
      "groupMembers": [
        email
      ]
    })
      .then(function (response) {
        console.log("Successfully created table.", grID); //merely started the group
        usersTableUpdate(email, "admin", grID); // updating the user at plexi-users table, adding the group.
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const joinGroup = (groupID, memberID, memberName, isNonAdmin) => {
    axios.post(`${APIroot}/group/join`, {
      groupID,
      memberID,
      memberName,
      isNonAdmin
    })
  };

  const userToUsersTable = (email, userName) => {
    axios.post(APIroot + "/user", {
      email,
      name: userName,
      groupsadmined: [""],
      groupsmembered: [""]
    });
  }

  const usersTableUpdate = (userID, groupRole, groupID) => {
    axios.post(APIroot + "/user/update", {
      userID,
      groupRole,
      groupID
    })
  }

  const getUserGroups = async () => {
    try {
      const response = await fetch(`${APIroot}/user?userID=${email}`, {
        method: 'GET',
        headers: {
          "accept": 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      setGroupsAdmined(result.Item.userGroupsAdmined);
      setGroupsMembered(result.Item.userGroupsMembered);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  const getMemberReceipts = async (groupnr, email) => {
    try {
      const response = await fetch(`${APIroot}/receipt?groupID=${groupnr}&userID=${email}`, {
        method: 'GET',
        headers: {
          "accept": 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json()
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  const addReceipt = async (groupID, note, date, amount) => {
    axios.post(`${APIroot}/receipt/add`, {
      groupID,
      memberID: email,
      note,
      date,
      amount
    })
      .then(function (response) {
        return response.data.body;
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const deleteReceipt = (groupID, memberID, listNum) => {
    axios.post(`${APIroot}/receipt/delete`, {
      groupID, memberID, listNum
    })
      .then(function (response) {
        return (response);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const isFinishedToggle = (groupID, memberID, toFinish) => {
    axios.post(`${APIroot}/user/member`, {
      groupID, memberID, toFinish
    })
      .then(function (response) {
        return (response);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const finishReceipt = (groupID, memberID, memberReceipts, action) => {
    var total = 0;
    if (action === "finish") {
      memberReceipts.map(receipt => {
        total += receipt[2];
        return total;
      });
    }
    axios.post(`${APIroot}/receipt/finish`, {
      groupID,
      memberID,
      totalNum: total.toString(),
      action
    })
      .then(function (response) {
        return (response);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const getGroupMembersInfo = async (groupID) => {
    try {
      const response = await fetch(`${APIroot}/group?groupID=${groupID}`, {
        method: 'GET',
        headers: {
          "accept": 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  const groupFinalizer = async (groupID, membersArr) => {
    await axios.post(`${APIroot}/group/finalize`, {
      groupID, membersArr
    })
      .then(response => {
        var responseBody = response.data.body.toString()
        responseBody = JSON.parse(responseBody);
        setFinishedAdminTable(responseBody);
        return (responseBody);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const checkGroupFinalized = async (groupID) => {
    try {
      const response = await fetch(`${APIroot}/group/finalize?groupID=${groupID}`, {
        method: 'GET',
        headers: {
          "accept": 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  const providerArray = {
    startGroup, joinGroup,
    userToUsersTable, getUserGroups,
    refGroupID, setRefGroupID,
    memberReceipts, setMemberReceipts,
    getMemberReceipts, addReceipt, deleteReceipt,
    isFinishedToggle, finishReceipt,
    getGroupMembersInfo, groupFinalizer,
    finishedAdminTable, setFinishedAdminTable,
    checkGroupFinalized
  }


  return (
    <APIContext.Provider value={providerArray}>
      {props.children}
    </APIContext.Provider>
  )
}

export { APIContext, APIProvider };