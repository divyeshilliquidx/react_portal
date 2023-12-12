// components/HelpDeskList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setHelpDeskData } from '../actions/helpDeskActions';

const HelpDeskList = () => {
  const dispatch = useDispatch();
  const helpDeskState = useSelector((state) => state.helpDesk);

  const { helpDeskData, currentPage, totalPages } = helpDeskState;

  const fetchHelpDeskData = async (page = 1) => {
    try {
      // Perform your API fetch here...
      const response = await fetch(`http://localhost:3000/fetchHelpDeskData?page=${page}`);
      const data = await response.json();

      // Dispatch the action to update the Redux state
      dispatch(
        setHelpDeskData({
          data: data.result,
          currentPage: page,
          totalPages: 64, // Assuming totalPages is fixed in your case
        })
      );
    } catch (error) {
      console.error('Error fetching help desk data', error);
    }
  };

  useEffect(() => {
    fetchHelpDeskData();
  }, []); // Fetch data on component mount

  const handlePageChange = (newPage) => {
    fetchHelpDeskData(newPage);
  };

  return (
    <div>
      {/* Render your help desk data and pagination here */}
    </div>
  );
};

export default HelpDeskList;
