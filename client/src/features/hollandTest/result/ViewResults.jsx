import { useGetUserResultsQuery } from "./resultApiSlice"
import React, { useState, useRef } from 'react';
import {useNavigate} from 'react-router-dom'
import { Card } from "primereact/card";

import { Button } from "primereact/button";
import { format } from "date-fns";
import { ProgressBar } from "primereact/progressbar";
import "./ViewResults.css";

const ViewResults=()=>{
    const {data:resultsData}=useGetUserResultsQuery()
//     const tests=[{test_id:"aaa",createdAt:"02-03-2020",summary:"kkkkkk",scores:{"A":50,"R":50}},
//     {test_id:"bbb",createdAt:"02-03-2020",summary:"kkkkkk",scores:{"A":50,"R":50}},
//     {test_id:"ccc",createdAt:"02-03-2020",summary:"kkkkkk",scores:{"A":50,"R":50}},
//     {test_id:"ddd",createdAt:"02-03-2020",summary:"kkkkkk",scores:{"A":50,"R":50}},
//     {test_id:"hh",createdAt:"02-03-2020",summary:"kkkkkk",scores:{"A":50,"R":50}},
//     {test_id:"kk",createdAt:"02-03-2020",summary:"kkkkkk",scores:{"A":50,"R":50}},
// ,

// ]
const navigate=useNavigate()
return(
    <div className="my-tests-container">
      {resultsData?.data?.map((test) => (
        <div key={test._id} className="test-card-wrapper">
          <Card
            title={`Test on ${format(new Date(test.createdAt), "PPP")}`}
            //subTitle={test.summary ? `Summary: ${test.summary}` : "No summary"}
            footer={
              <div style={{ textAlign: "right" }}>
                <Button label="View Details" onClick={() => navigate(`${test._id}`)} />
              </div>
            }
          >
            <div>
              {Object.entries(test.result)?.map(([key, value]) => (
                <div key={key} style={{ marginBottom: "10px" }}>
                  <small><strong>{key.toUpperCase()}</strong></small>
                  <ProgressBar value={value.work+value.capability+value.interest} showValue={true} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      ))}
    </div>
)
}
export default ViewResults