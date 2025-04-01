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

function ViewQuestions() {
    const{data:questionData,isError,isSuccess,isLoading}=useGetQuestionsQuery()
    const {data:typesData}=useGetTypesQuery()
    const questions=questionData?.data
    const [addQuestion,{}]=useAddQuestionMutation()
    const [editQuestion,{}]=useUpdateQuestionMutation()
    const [removeQuestion,{}]=useDeleteQuestionMutation()


    const [editingQuestion, setEditingQuestion] = useState(null);
    const [editDialogVisible, setEditDialogVisible] = useState(false);
    const [addDialogVisible, setAddDialogVisible] = useState(false);
    const [newQuestion, setNewQuestion] = useState({ question: '', answers: '', category: '' });

    const toast = useRef(null);

    const updateQuestion = (question) => {
        setEditingQuestion(question);
        setEditDialogVisible(true);
    };

    const saveQuestion = () => {
        editQuestion(editingQuestion)
        setEditDialogVisible(false);
        toast.current.show({ severity: 'success', summary: 'הצלחה', detail: 'השאלה עודכנה', life: 3000 });
    };

    const deleteQuestion = (question) => {
        removeQuestion(question)
        toast.current.show({ severity: 'success', summary: 'הצלחה', detail: 'השאלה נמחקה', life: 3000 });
    };

    const handleAddQuestion = () => {
        addQuestion(newQuestion)
        setNewQuestion({ question: '', answers: '', category: '' });
        setAddDialogVisible(false);
        toast.current.show({ severity: 'success', summary: 'הצלחה', detail: 'השאלה נוספה', life: 3000 });
    };

    const openAddDialog = () => {
        setAddDialogVisible(true);
        setNewQuestion({ question: '', answers: '', category: '' });
    };

    return (
        <div>
            <Toast  ref={toast} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 >שאלות</h2>
                <Button icon="pi pi-plus" rounded text onClick={openAddDialog} tooltip="הוספת שאלה" tooltipOptions={{ position: 'top' }} />
            </div>
            <DataTable dir={"rtl"} value={questions}>
                <Column field="text" header="שאלה" />
                <Column field="type" header="טיפוס" />
                <Column field="chapter" header="פרק" />
                <Column
                    body={(question) => (
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                            <Button icon="pi pi-pencil" rounded text onClick={() => updateQuestion(question)} tooltip="עריכה" tooltipOptions={{ position: 'top' }} />
                            <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => deleteQuestion(question)} tooltip="מחיקה" tooltipOptions={{ position: 'top' }} />
                        </div>
                    )}
                />
            </DataTable>

            <Dialog header="עריכת שאלה" visible={editDialogVisible} onHide={() => setEditDialogVisible(false)}>
                {editingQuestion && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <InputText value={editingQuestion.question} onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })} placeholder="שאלה" style={{ width: '100%' }} />
                        <InputText value={editingQuestion.answers} onChange={(e) => setEditingQuestion({ ...editingQuestion, answers: e.target.value })} placeholder="טיפוס" style={{ width: '100%' }} />
                        <InputText value={editingQuestion.category} onChange={(e) => setEditingQuestion({ ...editingQuestion, category: e.target.value })} placeholder="פרק" style={{ width: '100%' }} />
                        <Button label="שמור" onClick={saveQuestion} />
                    </div>
                )}
            </Dialog>

            <Dialog header="הוספת שאלה" visible={addDialogVisible} onHide={() => setAddDialogVisible(false)}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <InputText placeholder="שאלה" value={newQuestion.question} onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })} style={{ width: '100%' }} />
                    <InputTextarea placeholder="טיפוס" value={newQuestion.answers} onChange={(e) => setNewQuestion({ ...newQuestion, answers: e.target.value })} rows={3} cols={30} style={{ width: '100%' }} />
                    <InputText placeholder="פרק" value={newQuestion.category} onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })} style={{ width: '100%' }} />
                    <Button label="הוסף" onClick={handleAddQuestion} />
                </div>
            </Dialog>
        </div>
    );
}

export default ViewQuestions;