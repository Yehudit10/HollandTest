import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { useAddQuestionMutation, useDeleteQuestionMutation, useGetQuestionsQuery, useUpdateQuestionMutation } from './questionApiSlice';
import { useGetTypesQuery } from '../../types/typeApiSlice';
import { useGetChaptersQuery } from '../chapters/chapterApiSlice';

import { Dropdown } from 'primereact/dropdown';
        
function ViewQuestions() {
    const{data:questionData,isError,isSuccess:questionIsSuccess,isLoading:questionIsLoading}=useGetQuestionsQuery()
    const {data:typesData}=useGetTypesQuery()
    const {data:chaptersData}=useGetChaptersQuery()
    const questions=questionData?.data
    const [addQuestion,{}]=useAddQuestionMutation()
    const [editQuestion,{}]=useUpdateQuestionMutation()
    const [removeQuestion,{}]=useDeleteQuestionMutation()


    const [editingQuestion, setEditingQuestion] = useState(null);
    const [editDialogVisible, setEditDialogVisible] = useState(false);
    const [addDialogVisible, setAddDialogVisible] = useState(false);
    const [newQuestion, setNewQuestion] = useState({ question: '', type: '', category: '' });
const findTypeTitle=(id)=>typesData?.data?.find((t)=>t._id==id).title
const findChapterTitle=(id)=>chaptersData?.data?.find((c)=>c._id===id).title
    const toast = useRef(null);

    const updateQuestion = (question) => {
        setEditingQuestion({_id:question._id,question:question.text,type:findTypeTitle(question.type),category:findChapterTitle(question.chapterID)});
        setEditDialogVisible(true);
    };

    const saveQuestion = () => {
        editQuestion({_id:editingQuestion._id,text:editingQuestion.question,
            type:typesData?.data.find((t)=>t.title===editingQuestion.type)._id,
            chapterID:chaptersData?.data.find((c)=>c.title===editingQuestion.category)._id
        })
        setEditDialogVisible(false);
        toast.current.show({ severity: 'success', summary: 'הצלחה', detail: 'השאלה עודכנה', life: 3000 });
    };

    const deleteQuestion = (question) => {
        removeQuestion(question)
        toast.current.show({ severity: 'success', summary: 'הצלחה', detail: 'השאלה נמחקה', life: 3000 });
    };

    const handleAddQuestion = () => {
        addQuestion({text:newQuestion.question,
            type:typesData?.data.find((t)=>t.title===newQuestion.type)._id,
            chapterID:chaptersData?.data.find((c)=>c.title===newQuestion.category)._id
        })
        //setNewQuestion({ question: '', type: '', category: '' });
        setAddDialogVisible(false);
        toast.current.show({ severity: 'success', summary: 'הצלחה', detail: 'השאלה נוספה', life: 3000 });
    };

    const openAddDialog = () => {
        setAddDialogVisible(true);
        setNewQuestion({ question: '', type: '', category: '' });
    };

    return (
        <div>
            <Toast  ref={toast} />
            <div style={{direction:'rtl', display: 'flex', justifyContent: 'space-between', alignItems: 'center',textAlign:'center' }}>
                <h2 style={{direction:'rtl', textAlign: 'center' }}>שאלות</h2>
                <Button icon="pi pi-plus" rounded text onClick={openAddDialog} tooltip="הוספת שאלה" tooltipOptions={{ position: 'top' }} />
            </div>
            <DataTable  value={questions} paginator rows={10} stripedRows responsiveLayout="scroll">
            <Column
                    body={(question) => (
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                            <Button icon="pi pi-pencil" rounded text onClick={() => updateQuestion(question)} tooltip="עריכה" tooltipOptions={{ position: 'top' }} />
                            <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => deleteQuestion(question)} tooltip="מחיקה" tooltipOptions={{ position: 'top' }} />
                        </div>
                    )}
                />
                <Column body={(question) => {
           return findChapterTitle(question.chapterID)
        }} header="פרק" />
               
                <Column body={(question) => {
            return findTypeTitle(question.type)
        }} header="טיפוס" />
                <Column field="text" header="שאלה" />

            </DataTable>

            <Dialog header="עריכת שאלה" visible={editDialogVisible} onHide={() => setEditDialogVisible(false)}>
                {editingQuestion && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <InputText value={editingQuestion.question} onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })} placeholder="שאלה" style={{ width: '100%' }} />
                        <Dropdown options={typesData?.data.map((t)=>t.title)} value={editingQuestion.type} onChange={(e) => setEditingQuestion({ ...editingQuestion, type: e.target.value })}/>
                         {/* style={{ width: '100%' }} /> */}
                        <Dropdown value={editingQuestion.category} options={chaptersData?.data.map((c)=>c.title)} onChange={(e) => setEditingQuestion({ ...editingQuestion, category: e.target.value })} placeholder="פרק" style={{ width: '100%' }} />
                        <Button label="שמור" onClick={saveQuestion} />
                    </div>
                )}
            </Dialog>

            <Dialog header="הוספת שאלה" visible={addDialogVisible} onHide={() => setAddDialogVisible(false)}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <InputText placeholder="שאלה" value={newQuestion.question} onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })} style={{ width: '100%' }} />
                    <Dropdown placeholder="טיפוס" options={typesData?.data.map((t)=>t.title)} value={newQuestion.type} onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })} />
                    {/* style={{ width: '100%' }} /> */}
                    <Dropdown placeholder="פרק" options={chaptersData?.data.map((c)=>c.title)} value={newQuestion.category} onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })} style={{ width: '100%' }} />
                    <Button label="הוסף" onClick={handleAddQuestion} />
                </div>
            </Dialog>
        </div>
    );
}

export default ViewQuestions;