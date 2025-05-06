import { useGetUserResultsQuery } from "./resultApiSlice";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { format } from "date-fns";
import { ProgressBar } from "primereact/progressbar";
import { he } from "date-fns/locale";
import "./ViewResults.css";

const ViewResults = () => {
  const { data: resultsData } = useGetUserResultsQuery();
  const navigate = useNavigate();

  return (
    <div className="my-tests-container" dir="rtl">
      {resultsData?.data?.map((test) => (
        <div key={test._id} className="test-card-wrapper">
          <Card
            title={`מבחן מיום ${format(new Date(test.createdAt), "dd/MM/yyyy", { locale: he })}`}
            footer={
              <div style={{ textAlign: "left" }}>
                <Button
                  label="צפה בפרטים"
                  // icon="pi pi-eye"
                  iconPos="left"
                  className="p-button-sm p-button-outlined"
                  onClick={() => navigate(`${test._id}`)}
                />
              </div>
            }
          >
            <div>
              {Object.entries(test.result)?.map(([key, value]) => {
                const total = value.work + value.capability + value.interest;
                return (
                  <div key={key} style={{ marginBottom: "10px" }}>
                    <div style={{ marginBottom: "5px", fontWeight: "bold" }}>
                      {key}: {total} נקודות
                    </div>
                    <ProgressBar value={total} showValue={false} />
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

// const translateHollandKey = (key) => {
//   const map = {
//     R: "מציאותי",
//     I: "חוקר",
//     A: "אמנותי",
//     S: "חברתי",
//     E: "יזמי",
//     C: "קונבנציונלי",
//   };
//   return map[key] || key;
// };

export default ViewResults;
