"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import { useState, useEffect } from 'react';

interface Teacher {
    id: number;
    Cname: string;
}

export default function Classes() {
    const [classes, setClasses] = useState<Teacher[]>([]);
    const [teacherID, setTeacherID] = useState<string | null>(null);

    useEffect(() => {
        const storedTeacherID = sessionStorage.getItem("teacherId");
        setTeacherID(storedTeacherID);
    }, []);

    useEffect(() => {
        if (!teacherID) return;

        axios.get(`https://ai-teacher-api-xnd1.onrender.com/teacher/${teacherID}/classes`)
            .then(response => setClasses(response.data))
            .catch(error => console.error("Error fetching"));
    }, [teacherID]);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
            {classes.length > 0 ? (
                classes.map((cls) => (
                    <Card key={cls.id} className='shadow-lg border border-gray-200'>
                        <CardHeader>
                            <CardTitle>Class Id: {cls.id}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg font-semibold">{cls.Cname}</p>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <div>
                    <h1>No classes available</h1>
                </div>
            )}
        </div>
    );
}
