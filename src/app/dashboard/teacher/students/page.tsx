"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import { useState, useEffect } from 'react';

interface Assignment {
    title: string;
    grade: number;
}

interface Student {
    id: number;
    Sname: string;
    college_id: number;
    assignments: Assignment[];
}

export default function StudentAssignments() {
    const [students, setStudents] = useState<Student[]>([]);
    
    useEffect(() => {
        axios.get(`https://ai-teacher-api-xnd1.onrender.com/teacher/viewstudents/1`)
            .then(response => setStudents(response.data))
            .catch(error => console.error("Error fetching student data", error));
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {students.length > 0 ? (
                students.map(student => (
                    <Card key={student.id} className="shadow-lg border border-gray-200">
                        <CardHeader>
                            <CardTitle>{student.Sname} (ID: {student.id})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500">College ID: {student.college_id}</p>
                            <div className="mt-2">
                                <h3 className="font-semibold">Assignments:</h3>
                                <ul className="mt-1 space-y-1">
                                    {student.assignments.map((assignment, index) => (
                                        <li key={index} className="flex justify-between text-sm bg-gray-100 p-2 rounded">
                                            <span>{assignment.title}</span>
                                            <span className="font-bold">{assignment.grade}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <div>
                    <h1>No Students Available</h1>
                </div>
            )}
        </div>
    );
}
