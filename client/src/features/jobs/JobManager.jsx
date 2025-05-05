// import React, { useEffect, useState, useRef } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Dialog } from 'primereact/dialog';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { Toast } from 'primereact/toast';
// import { Dropdown } from 'primereact/dropdown';
// import { InputNumber } from 'primereact/inputnumber';
// import { ProgressSpinner } from 'primereact/progressspinner';
// import { Tag } from 'primereact/tag';
// import { InputTextarea } from 'primereact/inputtextarea'; // עבור תיאור ארוך יותר
// import { useAddJobMutation, useDeleteJobMutation, useGetJobsQuery, useUpdateJobMutation } from './jobApiSlice';
// import Loading from '../../components/Loading';

// const mockJobs = [
//     {
//         _id: '1',
//         jobname: 'מתכנת',
//         description: 'עבודה בפיתוח מערכות',
//         salaryAvg: 15000,
//         workingHoursAvg: 42,
//         educationLevel: 'תואר אקדמאי',
//         relatedTypes: []
//     },
//     {
//         _id: '2',
//         jobname: 'אחראי משמרת',
//         description: 'ניהול עובדים במשמרת',
//         salaryAvg: 9000,
//         workingHoursAvg: 45,
//         educationLevel: 'תעודת בגרות',
//         relatedTypes: []
//     }
// ];

// const educationOptions = [
//     'ללא תעודת בגרות',
//     'תעודת בגרות',
//     'על-תיכוני',
//     'תואר אקדמאי'
// ];

// const JobManager = () => {
//     const {data:jobsData,isLoading:jobsIsLoading}=useGetJobsQuery()
// const [removeJob,{}]=useDeleteJobMutation()
// const [addJob,{}]=useAddJobMutation()
// const [updateJob,{}]=useUpdateJobMutation()
// const jobsList=jobsData?.data
//     //const [jobsList, setJobs] = useState([]);
//     //const [filteredJobs, setFilteredJobs] = useState([]);
//    // const [loading, setLoading] = useState(true);
//     const [dialogVisible, setDialogVisible] = useState(false);
//     const [jobForm, setJobForm] = useState({});
//     const [isEditing, setIsEditing] = useState(false);
//     //const [educationFilter, setEducationFilter] = useState(null);
//     const toast = useRef(null);

    

//     const openDialog = (job = {}) => {
//         setJobForm(job);
//         setIsEditing(!!job._id);
//         setDialogVisible(true);
//     };

//     const closeDialog = () => {
//         setDialogVisible(false);
//         setJobForm({});
//     };

//     const saveJob = () => {
//         if (!jobForm.jobname || !jobForm.description) {
//             toast.current.show({ severity: 'error', summary: 'שגיאה', detail: 'נא למלא את כל השדות החיוניים' });
//             return;
//         }

//         if (isEditing) {
//             const updated = jobsList.map((job) => (job._id === jobForm._id ? jobForm : job));
//             setJobs(updated);
//             setFilteredJobs(updated);
//             toast.current.show({ severity: 'success', summary: 'עודכן', detail: 'העבודה עודכנה בהצלחה' });
//         } else {
//             const newJob = { ...jobForm, _id: Date.now().toString() };
//             const newJobs = [...jobsList, newJob];
//             setJobs(newJobs);
//             setFilteredJobs(newJobs);
//             toast.current.show({ severity: 'success', summary: 'נוספה', detail: 'העבודה נוספה בהצלחה' });
//         }
//         closeDialog();
//     };
//     const deleteJob = (jobId) => {
//         // const updated = jobsList.filter((job) => job._id !== jobId);
//         // setJobs(updated);
//         // setFilteredJobs(updated);
//         removeJob(jobId)
//         toast.current.show({ severity: 'warn', summary: 'נמחקה', detail: 'העבודה נמחקה' });
//     };

//     // const handleEducationFilter = (e) => {
//     //     const val = e.value;
//     //     setEducationFilter(val);
//     //     if (val) {
//     //         setFilteredJobs(jobsList.filter((j) => j.educationLevel === val));
//     //     } else {
//     //         setFilteredJobs(jobsList);
//     //     }
//     // };

//     const actionBodyTemplate = (rowData) => {
//         return (
//             <div className="p-d-flex p-ai-center" style={{ gap: '0.5rem' }}>
//                 <Button
//                     icon="pi pi-pencil"
//                     className="p-button-text p-button-sm p-button-warning"
//                     onClick={() => openDialog(rowData)}
//                     tooltip="עריכה"
//                     tooltipOptions={{ position: 'top' }}
//                 />
//                 <Button
//                     icon="pi pi-trash"
//                     className="p-button-text p-button-sm p-button-danger"
//                     onClick={() => deleteJob(rowData._id)}
//                     tooltip="מחיקה"
//                     tooltipOptions={{ position: 'top' }}
//                 />
//             </div>
//         );
//     };
//     const educationBodyTemplate = (rowData) => {
//         return <Tag value={rowData.educationLevel} severity="info" />;
//     };

//     const dialogFooter = (
//         <div className="p-d-flex p-jc-end">
//             <Button label="ביטול" icon="pi pi-times" className="p-button-text" onClick={closeDialog} />
//             <Button label="שמור" icon="pi pi-check" onClick={saveJob} autoFocus />
//         </div>
//     );

//     return (
//         <div className="card p-fluid" style={{ maxWidth: '1200px', margin: '2rem auto', padding: '2rem' }}>
//             <Toast ref={toast} />
//             <h2 className="p-text-center p-mb-4">ניהול עבודות</h2>

//             <div className="p-d-flex p-jc-between p-ai-center p-mb-4">
//                 {/* <Dropdown
//                     value={educationFilter}
//                     options={[{ label: 'הכל', value: null }, ...educationOptions.map(e => ({ label: e, value: e }))]}
//                     onChange={handleEducationFilter}
//                     placeholder="סנן לפי השכלה"
//                     className="p-mr-2"
//                     style={{ width: '200px' }}
//                 /> */}
//                 <Button
//     icon="pi pi-plus"
//     label="הוסף עבודה"
//     className="p-button-outlined"
//     onClick={() => openDialog()}
// />
//             </div>

//             {jobsIsLoading ? (
//                 <div className="p-d-flex p-jc-center">
//                     <Loading/>
//                 </div>
//             ) : (
//                 <DataTable value={jobsList} paginator rows={10} stripedRows responsiveLayout="scroll">
//                     <Column field="jobname" header="שם עבודה" sortable />
//                     <Column field="description" header="תיאור" sortable />
//                     <Column field="salaryAvg" header="שכר ממוצע" sortable />
//                     <Column field="workingHoursAvg" header="שעות עבודה" sortable />
//                     <Column header="השכלה" body={educationBodyTemplate} sortable />
//                     <Column header="פעולות" body={actionBodyTemplate} style={{ textAlign: 'right' }} />
//                 </DataTable>
//             )}

// <Dialog
//     header={isEditing ? 'עריכת עבודה' : 'הוספת עבודה'}
//     visible={dialogVisible}
//     onHide={closeDialog}
//     footer={dialogFooter}
//     style={{
//         width: '50vw',
//         direction: 'rtl',
//         borderRadius: '10px',
//     }}
//     breakpoints={{ '960px': '75vw', '640px': '100vw' }}
//     contentStyle={{
//         backgroundColor: '#fafafa',
//         padding: '2rem',
//         borderRadius: '0 0 10px 10px',
//     }}
//     headerStyle={{
//         backgroundColor: '#f0f0f0',
//         borderBottom: '1px solid #ddd',
//         borderRadius: '10px 10px 0 0',
//         padding: '1rem 2rem',
//         textAlign: 'right',
//         fontWeight: 'bold',
//         fontSize: '1.25rem',
//     }}
// >
//     <div className="p-fluid p-formgrid p-grid" style={{ textAlign: 'right' }}>
//         <div className="p-field p-col-12 p-md-6">
//             <label htmlFor="jobname">שם עבודה</label>
//             <InputText
//                 id="jobname"
//                 value={jobForm.jobname || ''}
//                 onChange={(e) => setJobForm({ ...jobForm, jobname: e.target.value })}
//                 placeholder="הכנס שם עבודה"
//             />
//         </div>

//         <div className="p-field p-col-12 p-md-6">
//             <label htmlFor="educationLevel">רמת השכלה</label>
//             <Dropdown
//                 id="educationLevel"
//                 value={jobForm.educationLevel || ''}
//                 options={educationOptions.map(e => ({ label: e, value: e }))}
//                 onChange={(e) => setJobForm({ ...jobForm, educationLevel: e.value })}
//                 placeholder="בחר רמת השכלה"
//             />
//         </div>

//         <div className="p-field p-col-12">
//             <label htmlFor="description">תיאור</label>
//             <InputTextarea
//                 id="description"
//                 value={jobForm.description || ''}
//                 onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
//                 rows={3}
//                 placeholder="תאר את התפקיד בקצרה"
//                 autoResize
//             />
//         </div>

//         <div className="p-field p-col-12 p-md-6">
//             <label htmlFor="salaryAvg">שכר ממוצע</label>
//             <InputNumber
//                 id="salaryAvg"
//                 value={jobForm.salaryAvg || 0}
//                 onValueChange={(e) => setJobForm({ ...jobForm, salaryAvg: e.value })}
//                 mode="currency"
//                 currency="ILS"
//                 locale="he-IL"
//                 placeholder="₪"
//             />
//         </div>

//         <div className="p-field p-col-12 p-md-6">
//             <label htmlFor="workingHoursAvg">שעות עבודה</label>
//             <InputNumber
//                 id="workingHoursAvg"
//                 value={jobForm.workingHoursAvg || 0}
//                 onValueChange={(e) => setJobForm({ ...jobForm, workingHoursAvg: e.value })}
//                 placeholder="שעות שבועיות"
//             />
//         </div>
//     </div>
// </Dialog>
//         </div>
//     );
// };

// export default JobManager;
