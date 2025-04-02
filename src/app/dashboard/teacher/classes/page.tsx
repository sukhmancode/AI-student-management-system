"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useState, useEffect } from 'react';

interface Class {
    id: number;
    Cname: string;
}

interface Assignment {
    title: string;
    grade: number;
    url: string | null;
    Submitted_At: string | null;
}

interface Student {
    id: number;
    Sname: string;
    college_id: number;
    assignments: Assignment[];
}

export default function Classes() {
    const [classes, setClasses] = useState<Class[]>([]);
    const [teacherID, setTeacherID] = useState<string | null>(null);
    const [students, setStudents] = useState<Student[] | null>(null);
    const [selectedClass, setSelectedClass] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const storedTeacherID = sessionStorage.getItem("teacherId");
        setTeacherID(storedTeacherID);
    }, []);

    useEffect(() => {
        if (!teacherID) return;

        axios.get(`https://ai-teacher-api-xnd1.onrender.com/teacher/${teacherID}/classes`)
            .then(response => setClasses(response.data))
            .catch(error => console.error("Error fetching classes"));
    }, [teacherID]);

    const handleViewStudents = (classId: number) => {
        setSelectedClass(classId);
        setLoading(true);
        axios.get(`https://ai-teacher-api-xnd1.onrender.com/teacher/viewstudents/${classId}`)
            .then(response => setStudents(response.data))
            .catch(error => console.error("Error fetching students"))
            .finally(() => setLoading(false));
    };

    return (
        <div className='p-4 grid grid-cols-1 md:grid-cols-2  gap-4'>
            <div className='grid grid-cols-1 w-full h-fit p-2'>
                {classes.length > 0 ? (
                    classes.map((cls) => (
                        <Card key={cls.id} className='shadow-lg border border-gray-200'>
                            <CardHeader>
                                <CardTitle>Class Id: {cls.id}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg font-semibold">{cls.Cname}</p>
                                <Button onClick={() => handleViewStudents(cls.id)} className='mt-2'>View Students</Button>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <h1>No classes available</h1>
                )}
            </div>

            {selectedClass && (
                <div className='mt-6'>
                    <h2 className='text-xl font-bold'>Students in Class {selectedClass}</h2>
                    <div className='mt-4'>
                        {loading ? (
                            <Button type="button" className="bg-indigo-500 flex items-center" disabled>
                                <svg className="mr-3 w-5 h-5 animate-spin" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                                </svg>
                                Loading...
                            </Button>
                        ) : students && students.length > 0 ? (
                            students.map(student => (
                                <Card key={student.id} className='shadow-md border border-gray-200 my-2'>
                                    <CardHeader>
                                        <CardTitle>{student.Sname} (ID: {student.college_id})</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <h3 className='font-semibold'>Assignments:</h3>
                                        <ul className='list-disc list-inside'>
                                            {student.assignments.map((assignment, index) => (
                                                <li key={index} className='mt-1 list-none'>
                                                    {assignment.title}: Grade {assignment.grade}
                                                    {assignment.url ? (
                                    <a href={assignment.url} target='_blank' rel='noopener noreferrer'>
                                        <Button className='ml-2 cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700  right-0' >View</Button>
                                    </a>
                                ) : <h2 className='font-semibold text-red-500'>Not submitted yet</h2>}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p>No students found.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}